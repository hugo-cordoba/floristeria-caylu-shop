'use client';

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from '@/components/checkout/checkoutForm.module.css';
import pageStyles from './AccountProfile.module.css';

export default function AccountProfilePage() {
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFeedback(null);

    const result = await updateProfile({ firstName, lastName, phone, email });
    if (!result.ok) {
      setError(result.error ?? 'No se han podido guardar los cambios.');
      return;
    }
    setFeedback('Datos actualizados.');
  }

  return (
    <div className={pageStyles.page}>
      <h1 className={pageStyles.title}>Mi perfil</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Nombre</span>
            <input
              type="text"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Apellido</span>
            <input
              type="text"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={styles.input}
            />
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Teléfono</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={styles.input}
          />
        </label>

        {error && <p style={{ color: '#c0392b', fontSize: '0.85rem' }}>{error}</p>}
        {feedback && <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }}>{feedback}</p>}

        <button type="submit" className={styles.submit}>
          Guardar cambios
        </button>
      </form>
      {/* TODO: cambio de contraseña (requiere validar la contraseña actual) */}
    </div>
  );
}