'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { shippingMethods } from '@/data/shipping.config';
import { createCheckoutSessionAction } from '@/lib/actions/checkout.actions';
import { formatPrice } from '@/lib/currency';
import formStyles from '@/components/checkout/checkoutForm.module.css';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, hydrated: cartHydrated } = useCart();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [requestsInvoice, setRequestsInvoice] = useState(false);
  const [buyerNif, setBuyerNif] = useState('');
  const [buyerLegalName, setBuyerLegalName] = useState('');

  const [country, setCountry] = useState('España');
  const [city, setCity] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [shippingMethodId, setShippingMethodId] = useState('express');
  const [deliveryDate, setDeliveryDate] = useState('');

  const [agreeShipping, setAgreeShipping] = useState(false);
  const [agreePayment, setAgreePayment] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!cartHydrated) return;
    if (items.length === 0) router.replace('/cart');
  }, [cartHydrated, items.length, router]);

  if (!cartHydrated || items.length === 0) return null;

  const selectedShippingMethod =
    shippingMethods.find((method) => method.id === shippingMethodId) ?? shippingMethods[0];
  const total = subtotal + selectedShippingMethod.price;

  const expressMethod = shippingMethods.find((m) => m.id === 'express') ?? shippingMethods[0];
  const standardMethod = shippingMethods.find((m) => m.id === 'standard') ?? shippingMethods[0];

  const deliveryOptions = [
    {
      method: expressMethod,
      displayLabel: 'Entrega en menos de 48h',
      displayEta: 'Recibirás tu pedido en menos de 48 horas',
    },
    {
      method: standardMethod,
      displayLabel: 'Elegir fecha de envío',
      displayEta: 'Tú decides el día de entrega',
    },
  ];

  const minDeliveryDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  })();

  const maxDeliveryDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  })();

  function handleApplyPromo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPromoMessage(promoCode.trim() ? 'Este código no es válido.' : null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setIsRedirecting(true);

    try {
      const { url } = await createCheckoutSessionAction({
        email,
        shippingAddress: {
          fullName: `${firstName} ${lastName}`.trim(),
          addressLine1,
          addressLine2: addressLine2 || undefined,
          city,
          postalCode,
          country,
          phone: phone || undefined,
        },
        shippingMethodId: selectedShippingMethod.id,
        buyerNif: requestsInvoice ? buyerNif : undefined,
        buyerLegalName: requestsInvoice ? buyerLegalName : undefined,
      });
      window.location.href = url;
    } catch (error) {
      console.error('No se pudo iniciar el pago:', error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'No se ha podido iniciar el pago. Inténtalo de nuevo.';
      setSubmitError(message);
      setIsRedirecting(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <div className={styles.grid}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle}>Información</h2>
            <Link href="/?authRequired=1" className={styles.loginLink}>
              ¿Ya tienes cuenta? <span>Inicia sesión</span>
            </Link>
          </div>

          <div className={formStyles.section}>
            <h3 className={formStyles.sectionTitle}>Datos personales</h3>

            <div className={formStyles.row}>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Nombre</span>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={formStyles.input}
                />
              </label>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Apellidos</span>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={formStyles.input}
                />
              </label>
            </div>

            <div className={formStyles.row}>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Teléfono</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={formStyles.input}
                />
              </label>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formStyles.input}
                />
              </label>
            </div>

            <label className={formStyles.checkboxRow}>
              <input
                type="checkbox"
                checked={requestsInvoice}
                onChange={(e) => setRequestsInvoice(e.target.checked)}
              />
              <span>Necesito factura con NIF/CIF (autónomo o empresa)</span>
            </label>

            {requestsInvoice && (
              <div className={formStyles.row}>
                <label className={formStyles.field}>
                  <span className={formStyles.label}>NIF / CIF</span>
                  <input
                    type="text"
                    required
                    value={buyerNif}
                    onChange={(e) => setBuyerNif(e.target.value)}
                    className={formStyles.input}
                  />
                </label>
                <label className={formStyles.field}>
                  <span className={formStyles.label}>Nombre o razón social</span>
                  <input
                    type="text"
                    required
                    value={buyerLegalName}
                    onChange={(e) => setBuyerLegalName(e.target.value)}
                    className={formStyles.input}
                  />
                </label>
              </div>
            )}
          </div>

          <div className={formStyles.section}>
            <h3 className={formStyles.sectionTitle}>Dirección de envío</h3>

            <div className={formStyles.row}>
              <label className={formStyles.field}>
                <span className={formStyles.label}>País / Región</span>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={formStyles.input}
                />
              </label>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Ciudad</span>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={formStyles.input}
                />
              </label>
            </div>

            <div className={formStyles.row}>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Dirección</span>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className={formStyles.input}
                />
              </label>
              <label className={formStyles.field}>
                <span className={formStyles.label}>Código postal</span>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={formStyles.input}
                />
              </label>
            </div>

            <label className={formStyles.field}>
              <span className={formStyles.label}>Piso, puerta... (opcional)</span>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className={formStyles.input}
              />
            </label>

            <label className={formStyles.checkboxRow}>
              <input
                type="checkbox"
                required
                checked={agreeShipping}
                onChange={(e) => setAgreeShipping(e.target.checked)}
              />
              <span>
                Acepto el <Link href="/privacy">tratamiento de datos</Link> para la gestión del envío
              </span>
            </label>
          </div>

          <div className={formStyles.section}>
            <h3 className={formStyles.sectionTitle}>Entrega</h3>
            <div className={formStyles.optionsList}>
              {deliveryOptions.map(({ method, displayLabel, displayEta }) => (
                <div key={method.id}>
                  <label
                    className={`${formStyles.optionCard} ${
                      shippingMethodId === method.id ? formStyles.optionCardSelected : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={shippingMethodId === method.id}
                      onChange={() => setShippingMethodId(method.id)}
                      style={{ display: 'none' }}
                    />
                    <div className={formStyles.optionInfo}>
                      <span className={formStyles.optionLabel}>{displayLabel}</span>
                      <span className={formStyles.optionEta}>{displayEta}</span>
                    </div>
                    <span className={formStyles.optionPrice}>{method.priceFormatted}</span>
                  </label>

                  {method.id === 'standard' && shippingMethodId === 'standard' && (
                    <label className={`${formStyles.field} ${formStyles.dateField}`}>
                      <span className={formStyles.label}>Fecha de envío</span>
                      <input
                        type="date"
                        required
                        min={minDeliveryDate}
                        max={maxDeliveryDate}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className={formStyles.input}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={formStyles.section}>
            <h3 className={formStyles.sectionTitle}>Pago</h3>

            <div className={styles.paymentOptions}>
              <label className={`${styles.paymentOption} ${styles.paymentOptionSelected}`}>
                <input type="radio" name="paymentMethod" checked readOnly />
                <span className={styles.paymentLabel}>Tarjeta de crédito o débito</span>
                <span className={styles.paymentIcons}>VISA · Mastercard</span>
              </label>
              <label className={`${styles.paymentOption} ${styles.paymentOptionDisabled}`}>
                <input type="radio" name="paymentMethod" disabled />
                <span className={styles.paymentLabel}>PayPal</span>
                <span className={styles.paymentUnavailable}>Próximamente</span>
              </label>
              <label className={`${styles.paymentOption} ${styles.paymentOptionDisabled}`}>
                <input type="radio" name="paymentMethod" disabled />
                <span className={styles.paymentLabel}>Apple Pay</span>
                <span className={styles.paymentUnavailable}>Próximamente</span>
              </label>
            </div>

            <p className={styles.paymentNote}>
              Introducirás los datos de tu tarjeta de forma segura en la página de pago de Stripe.
            </p>

            <label className={formStyles.checkboxRow}>
              <input
                type="checkbox"
                required
                checked={agreePayment}
                onChange={(e) => setAgreePayment(e.target.checked)}
              />
              <span>
                Acepto el <Link href="/privacy">tratamiento de datos</Link> para el pago
              </span>
            </label>
          </div>

          {submitError && <p className={styles.error}>{submitError}</p>}

          <button type="submit" className={styles.payButton} disabled={isRedirecting}>
            {isRedirecting ? 'Redirigiendo a Stripe...' : 'Pagar y realizar pedido'}
          </button>
        </form>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>
            Tu cesta <span className={styles.summaryCount}>({items.length})</span>
          </h2>

          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemImageWrapper}>
                  <Image src={item.image} alt={item.name} fill sizes="72px" className={styles.itemImage} />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemTopRow}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                  {item.selectedVariants &&
                    Object.entries(item.selectedVariants).map(([group, option]) => (
                      <div key={group} className={styles.itemDetail}>
                        <span className={styles.itemDetailLabel}>{group}:</span>
                        <span>{option}</span>
                      </div>
                    ))}
                  <div className={styles.itemDetail}>
                    <span className={styles.itemDetailLabel}>Cantidad:</span>
                    <span>{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.promoRow} onSubmit={handleApplyPromo}>
            <input
              type="text"
              placeholder="Código promocional"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className={styles.promoInput}
            />
            <button type="submit" className={styles.promoButton}>
              Aplicar
            </button>
          </form>
          {promoMessage && <p className={styles.promoMessage}>{promoMessage}</p>}

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Envío</span>
              <span>{selectedShippingMethod.priceFormatted}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Descuento</span>
              <span>{formatPrice(0)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}