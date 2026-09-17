import type { ContactPageData, ContentPageData, FaqPageData } from '@/types/content.types';

/**
 * Contenido de las páginas estáticas (about, legales
 * (privacidad/términos/devoluciones/envíos/cookies), FAQ y contacto).
 *
 * Igual que `landing.config.ts` para la home, este es el fichero a
 * editar para personalizar los textos de una tienda nueva: cambia
 * títulos, párrafos y datos de contacto sin tocar los componentes
 * que lo pintan.
 *
 * ──────────────────────────────────────────────────────────────────
 * AVISO IMPORTANTE — LEER ANTES DE PUBLICAR
 * ──────────────────────────────────────────────────────────────────
 * El texto de privacyContent, termsContent, returnsContent,
 * shippingPolicyContent y cookiesContent es un BORRADOR PROFESIONAL
 * DE PLANTILLA, redactado siguiendo el marco general del RGPD
 * (Reglamento UE 2016/679), la LOPDGDD (LO 3/2018), la LSSI-CE y el
 * régimen de consumidores del Real Decreto Legislativo 1/2007.
 *
 * NO sustituye el asesoramiento de una abogada o abogado. Antes de
 * publicarlo, hay que:
 *
 *   1. Rellenar todos los campos marcados como [COMPLETAR: ...] con
 *      los datos reales de la empresa (razón social, NIF, domicilio,
 *      email de contacto, zonas de envío, plazos de devolución de
 *      gastos, etc.).
 *   2. Confirmar con la abogada si el negocio necesita cláusulas
 *      adicionales según el sector (ej. productos regulados,
 *      venta a menores, venta fuera de la UE, marketplace, etc.).
 *   3. Si se venden productos o servicios distintos a un catálogo
 *      físico genérico (digitales, suscripciones, personalizados,
 *      perecederos...), revisar las excepciones al derecho de
 *      desistimiento del art. 103 del RDL 1/2007 caso por caso.
 *   4. Revisar si aplica el Delegado de Protección de Datos (DPO):
 *      obligatorio solo en determinados supuestos del art. 34 LOPDGDD.
 *   5. Si se contratan proveedores nuevos que traten datos personales
 *      (pasarela de pago, email transaccional, analítica, CRM...),
 *      añadirlos a la lista de encargados de tratamiento de la
 *      Política de privacidad.
 *
 * NOTA TÉCNICA PARA EL EQUIPO DE DESARROLLO:
 * `CookieConsentContext.tsx` inicializa `DEFAULT_PREFERENCES` con
 * `{ analytics: true, marketing: true }` ANTES de que la persona
 * usuaria elija nada. Hoy no tiene efecto real porque no hay scripts
 * de analítica/marketing cargados todavía (ver TODO en ese fichero),
 * pero en cuanto se active Google Analytics, Meta Pixel o similar,
 * el valor por defecto debe ser `false` para ambas categorías: el
 * RGPD exige consentimiento previo y activo (opt-in), no un
 * "activado salvo que la persona lo desactive". Corregirlo antes de
 * conectar cualquier script de analítica o marketing real.
 * ──────────────────────────────────────────────────────────────────
 */

export const aboutContent: ContentPageData = {
  title: 'Sobre nosotros',
  intro:
    'Contamos aqui quienes somos, que nos mueve y por que existe esta marca. Sustituye este texto por la historia real del cliente.',
  sections: [
    {
      heading: 'Nuestra historia',
      body: [
        'Texto de ejemplo sobre como nacio la marca: el problema que queria resolver, el momento en el que empezo y los primeros pasos.',
        'Puedes anadir uno o varios parrafos por seccion; cada elemento del array "body" se pinta como un parrafo independiente.',
      ],
    },
    {
      heading: 'Lo que nos importa',
      body: ['Describe aqui los valores o compromisos de la marca (calidad, sostenibilidad, origen de los materiales, etc.).'],
      list: ['Ejemplo de valor o compromiso 1', 'Ejemplo de valor o compromiso 2', 'Ejemplo de valor o compromiso 3'],
    },
    {
      heading: 'El equipo',
      body: ['Un par de lineas sobre quien esta detras de la marca, o sobre el equipo si aplica.'],
    },
  ],
};

export const privacyContent: ContentPageData = {
  title: 'Política de privacidad',
  updatedAt: '[COMPLETAR: fecha de publicación de esta versión, ej. 16 de septiembre de 2026]',
  intro:
    'En esta página explicamos qué datos personales recopilamos cuando usas esta web, con qué finalidad los tratamos, con quién los compartimos y qué derechos puedes ejercer sobre ellos, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).',
  sections: [
    {
      heading: '1. Responsable del tratamiento',
      body: [
        'El responsable del tratamiento de tus datos personales es [COMPLETAR: razón social de la empresa], con NIF [COMPLETAR: NIF/CIF] y domicilio en [COMPLETAR: dirección fiscal completa] (en adelante, «nosotros» o «la empresa»). Puedes contactar con nosotros para cualquier cuestión relacionada con la protección de tus datos escribiendo a [COMPLETAR: email de contacto para privacidad, ej. privacidad@tumarca.com].',
        '[COMPLETAR SI APLICA: si la empresa ha designado un Delegado de Protección de Datos (DPO) conforme al art. 34 LOPDGDD, indica aquí su identidad y datos de contacto. Si no es obligatorio ni se ha designado, elimina esta frase.]',
      ],
    },
    {
      heading: '2. Qué datos recopilamos',
      body: ['Recopilamos los datos que nos facilitas directamente y los que se generan automáticamente al usar la web:'],
      list: [
        'Datos de identificación y contacto: nombre, apellidos, email, teléfono y direcciones de envío y facturación, que nos facilitas al crear una cuenta, hacer un pedido o escribirnos.',
        'Datos de la cuenta: contraseña (almacenada siempre cifrada, nunca en texto plano), historial de pedidos, direcciones guardadas y lista de deseos.',
        'Datos de pago: no almacenamos en ningún momento los datos completos de tu tarjeta. El pago se procesa directamente por Stripe, Inc., que actúa como encargado del tratamiento independiente y aplica su propia política de privacidad.',
        'Datos de navegación: dirección IP, tipo de dispositivo y navegador, páginas visitadas y cookies, según lo descrito en nuestra Política de cookies.',
        'Datos que nos facilitas voluntariamente: los que incluyas en el formulario de contacto o, si existe, al suscribirte a nuestras comunicaciones.',
      ],
    },
    {
      heading: '3. Con qué finalidad y con qué base legal tratamos tus datos',
      body: ['Tratamos tus datos personales para las siguientes finalidades y con las siguientes bases legales:'],
      list: [
        'Gestionar tu cuenta y tramitar tus pedidos (pago, envío, garantías y devoluciones). Base legal: ejecución de un contrato (art. 6.1.b RGPD).',
        'Emitir las facturas correspondientes y cumplir con nuestras obligaciones fiscales y contables. Base legal: cumplimiento de una obligación legal (art. 6.1.c RGPD).',
        'Responder a tus consultas enviadas a través del formulario de contacto. Base legal: interés legítimo en atender tu solicitud (art. 6.1.f RGPD).',
        '[COMPLETAR SI APLICA: enviarte comunicaciones comerciales sobre nuestros productos, si te has suscrito voluntariamente. Base legal: consentimiento (art. 6.1.a RGPD), que puedes retirar en cualquier momento sin que ello afecte a la licitud del tratamiento previo.]',
        'Analizar el uso de la web con fines estadísticos y de mejora del servicio, y mostrarte publicidad relevante, únicamente si has dado tu consentimiento expreso a las cookies analíticas o de marketing. Base legal: consentimiento (art. 6.1.a RGPD).',
        'Prevenir el fraude y garantizar la seguridad de la plataforma. Base legal: interés legítimo (art. 6.1.f RGPD).',
      ],
    },
    {
      heading: '4. Durante cuánto tiempo conservamos tus datos',
      body: [
        'Conservamos los datos de tu cuenta mientras la mantengas activa. Si la cierras, o si no la utilizas durante [COMPLETAR: periodo, ej. 3 años], eliminaremos o anonimizaremos tus datos, salvo que debamos conservarlos por obligación legal.',
        'Los datos de las facturas se conservan durante el plazo exigido por la normativa mercantil y fiscal española (con carácter general, 6 años desde el último asiento contable conforme al Código de Comercio, sin perjuicio de los plazos fiscales que correspondan).',
        'Si retiras tu consentimiento para comunicaciones comerciales o para cookies no esenciales, dejamos de tratar tus datos para esas finalidades de forma inmediata.',
      ],
    },
    {
      heading: '5. Con quién compartimos tus datos',
      body: [
        'No vendemos tus datos personales a terceros. Los compartimos únicamente con los proveedores necesarios para prestar el servicio, que actúan como encargados del tratamiento bajo contrato y siguiendo nuestras instrucciones:',
      ],
      list: [
        'Stripe, Inc. — procesamiento seguro de pagos.',
        'Resend — envío de emails transaccionales (confirmación de pedido, facturas, recuperación de contraseña).',
        '[COMPLETAR SI APLICA: proveedor de almacenamiento de imágenes de producto — alojamiento de archivos multimedia.]',
        '[COMPLETAR SI APLICA: empresa(s) de transporte y mensajería utilizadas para las entregas.]',
        'Nuestro proveedor de alojamiento (hosting), donde se ejecutan la web y la base de datos.',
        'La Agencia Tributaria y otros organismos públicos, cuando exista obligación legal de facilitarles información.',
      ],
    },
    {
      heading: '6. Transferencias internacionales de datos',
      body: [
        'Como norma general, nuestros proveedores procesan los datos dentro del Espacio Económico Europeo (EEE). [COMPLETAR: si algún proveedor transfiere datos fuera del EEE (por ejemplo, determinados datos de pago a través de Stripe pueden procesarse en EE. UU.), indícalo aquí junto con la garantía aplicada: cláusulas contractuales tipo de la Comisión Europea, decisión de adecuación u otro mecanismo vigente en cada momento.]',
      ],
    },
    {
      heading: '7. Tus derechos',
      body: [
        'En relación con tus datos personales, tienes derecho a:',
      ],
      list: [
        'Acceder a tus datos y saber si los estamos tratando.',
        'Rectificar los datos inexactos o incompletos.',
        'Solicitar la supresión de tus datos cuando ya no sean necesarios para los fines para los que se recogieron.',
        'Solicitar la limitación del tratamiento en los supuestos previstos por la ley.',
        'Oponerte al tratamiento de tus datos, incluida la elaboración de perfiles.',
        'Solicitar la portabilidad de tus datos a otro responsable, cuando sea técnicamente posible.',
        'Retirar tu consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento previo a su retirada.',
      ],
    },
    {
      body: [
        'Puedes ejercer estos derechos escribiéndonos a [COMPLETAR: email de contacto para privacidad], indicando el derecho que quieres ejercer y adjuntando una copia de tu documento de identidad. Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
      ],
    },
    {
      heading: '8. Personas menores de edad',
      body: [
        'Esta web está dirigida a personas mayores de edad. No recopilamos conscientemente datos de menores de 14 años sin el consentimiento de sus padres, madres o tutores legales, conforme al art. 7 LOPDGDD.',
      ],
    },
    {
      heading: '9. Seguridad de los datos',
      body: [
        'Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o alteración: cifrado de contraseñas, conexiones seguras (HTTPS) y control de acceso a nuestros sistemas. Ningún sistema es completamente infalible; te recomendamos usar una contraseña robusta y no compartirla con terceros.',
      ],
    },
    {
      heading: '10. Cambios en esta política',
      body: [
        'Podemos actualizar esta política para adaptarla a novedades legislativas o a cambios en nuestros servicios. Publicaremos cualquier cambio relevante en esta misma página, indicando la fecha de la última actualización.',
      ],
    },
  ],
};

export const termsContent: ContentPageData = {
  title: 'Términos y condiciones',
  updatedAt: '[COMPLETAR: fecha de publicación de esta versión]',
  sections: [
    {
      heading: '1. Identificación del vendedor',
      body: [
        'Este sitio web es operado por [COMPLETAR: razón social], con NIF [COMPLETAR: NIF/CIF], domicilio social en [COMPLETAR: dirección fiscal completa], [COMPLETAR SI APLICA: inscrita en el Registro Mercantil de ...], y dirección de contacto [COMPLETAR: email de contacto]. Estos términos y condiciones (las «Condiciones») regulan el uso de la web y la compra de productos a través de ella.',
      ],
    },
    {
      heading: '2. Aceptación de las condiciones',
      body: [
        'Al navegar por esta web, crear una cuenta o realizar un pedido, aceptas quedar vinculado por estas Condiciones, así como por nuestra Política de privacidad y nuestra Política de cookies. Si no estás de acuerdo con alguna de ellas, te pedimos que no utilices la web.',
      ],
    },
    {
      heading: '3. Registro de cuenta',
      body: [
        'No es obligatorio crear una cuenta para comprar; puedes hacerlo como invitado. Si te registras, eres responsable de mantener la confidencialidad de tu contraseña y de toda actividad realizada desde tu cuenta, y debes facilitarnos información veraz y mantenerla actualizada.',
      ],
    },
    {
      heading: '4. Proceso de compra y formación del contrato',
      body: [
        'Los productos se presentan en la web con su descripción, imágenes y precio. Procuramos que la información sea precisa, aunque pueden producirse errores tipográficos ocasionales.',
        'El contrato de compraventa se entiende celebrado cuando confirmamos tu pedido por email tras haberse completado correctamente el pago. Antes de ese momento, puedes revisar y modificar el contenido de tu cesta en cualquier paso del proceso de compra.',
        'Nos reservamos el derecho a rechazar o cancelar un pedido en caso de error evidente en el precio o la disponibilidad del producto, error en los datos de envío, o sospecha razonable de fraude, informándote lo antes posible y reembolsando cualquier cantidad ya cobrada.',
      ],
    },
    {
      heading: '5. Precios e impuestos',
      body: [
        'Todos los precios mostrados en la web incluyen el Impuesto sobre el Valor Añadido (IVA) aplicable, salvo que se indique expresamente lo contrario. Los gastos de envío, si los hubiera, se muestran desglosados antes de confirmar el pedido, conforme a nuestra Política de envíos.',
      ],
    },
    {
      heading: '6. Métodos de pago',
      body: [
        'El pago se procesa de forma segura a través de Stripe. Aceptamos [COMPLETAR: métodos de pago habilitados, ej. tarjeta de crédito/débito y cualquier otro que se active en la cuenta de Stripe]. No tenemos acceso ni almacenamos en ningún momento los datos completos de tu tarjeta.',
      ],
    },
    {
      heading: '7. Derecho de desistimiento',
      body: [
        'Si eres consumidor y contratas desde la Unión Europea, tienes derecho a desistir de tu compra en un plazo de 14 días naturales desde que recibes el producto, sin necesidad de justificar tu decisión, conforme al Real Decreto Legislativo 1/2007, de 16 de noviembre.',
        'Para más información sobre cómo ejercer este derecho, sus condiciones y excepciones, consulta nuestra página de Devoluciones.',
      ],
    },
    {
      heading: '8. Entrega',
      body: [
        'Los plazos y zonas de entrega se detallan en nuestra Política de envíos. El riesgo de pérdida o daño de los productos se transmite en el momento en que tú, o un tercero indicado por ti distinto del transportista, adquieres su posesión material.',
      ],
    },
    {
      heading: '9. Conformidad y garantía legal',
      body: [
        'Como consumidor, tienes derecho a que los productos que compres sean conformes con el contrato en el momento de la entrega, conforme al régimen de garantías del Real Decreto Legislativo 1/2007. Si recibes un producto defectuoso o no conforme, escríbenos a [COMPLETAR: email de contacto] indicando tu número de pedido; tramitaremos la reparación, sustitución, rebaja del precio o resolución del contrato según corresponda.',
      ],
    },
    {
      heading: '10. Propiedad intelectual e industrial',
      body: [
        'Todos los contenidos de esta web (textos, imágenes, logotipos, diseño y código fuente) son titularidad de [COMPLETAR: razón social] o de terceros que nos han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción o uso sin autorización previa por escrito.',
      ],
    },
    {
      heading: '11. Limitación de responsabilidad',
      body: [
        'Nos esforzamos por que la web funcione correctamente, pero no garantizamos que esté libre de interrupciones o errores. No seremos responsables de daños derivados de un uso indebido de la web, de causas de fuerza mayor, ni de decisiones de compra basadas en información publicada por error, sin perjuicio de la responsabilidad que nos corresponda conforme a la normativa de consumidores aplicable.',
      ],
    },
    {
      heading: '12. Resolución de conflictos',
      body: [
        'Si tienes cualquier reclamación, contacta primero con nosotros en [COMPLETAR: email de contacto]; intentaremos resolverla de forma amistosa.',
        'Si eres consumidor residente en la Unión Europea, también puedes acceder a la plataforma europea de resolución de litigios en línea en https://ec.europa.eu/consumers/odr.',
        'Estas Condiciones se rigen por la legislación española. Para cualquier controversia que no pueda resolverse de forma amistosa, y sin perjuicio del fuero que te corresponda como consumidor conforme a la ley, serán competentes los juzgados y tribunales de [COMPLETAR: localidad].',
      ],
    },
    {
      heading: '13. Modificación de estas condiciones',
      body: [
        'Podemos modificar estas Condiciones en cualquier momento. Los pedidos ya confirmados se rigen por las condiciones vigentes en el momento de la compra. Te recomendamos revisar esta página periódicamente.',
      ],
    },
  ],
};

export const returnsContent: ContentPageData = {
  title: 'Devoluciones y cambios',
  intro:
    'Queremos que tu compra te convenza por completo. Aquí explicamos cómo ejercer tu derecho de desistimiento y cómo gestionamos las devoluciones por defecto o error.',
  sections: [
    {
      heading: 'Derecho de desistimiento: 14 días naturales',
      body: [
        'Si eres consumidor y compras desde la Unión Europea, dispones de 14 días naturales desde la recepción del pedido para desistir de la compra sin necesidad de justificar el motivo, conforme al Real Decreto Legislativo 1/2007.',
        'Si el pedido incluye varios productos entregados por separado, el plazo se cuenta desde la recepción del último de ellos.',
      ],
    },
    {
      heading: 'Condiciones del producto',
      body: ['Para aceptar la devolución, el producto debe estar en las mismas condiciones en que lo recibiste:'],
      list: [
        'Sin usar, lavar ni alterar.',
        'Con las etiquetas originales puestas.',
        'En su embalaje original, siempre que sea posible.',
        'Acompañado del ticket de compra o número de pedido.',
      ],
    },
    {
      heading: 'Excepciones al derecho de desistimiento',
      body: [
        'Conforme al artículo 103 del Real Decreto Legislativo 1/2007, el derecho de desistimiento no se aplica, entre otros, a:',
      ],
      list: [
        'Productos personalizados o confeccionados según tus especificaciones.',
        'Productos que, por razones de higiene o protección de la salud, hayan sido desprecintados tras la entrega, salvo defecto de fabricación.',
        '[COMPLETAR: cualquier otra categoría de producto que la tienda venda y esté legalmente exenta, si aplica; si no aplica ninguna, puedes eliminar este punto.]',
      ],
    },
    {
      heading: 'Cómo iniciar una devolución',
      body: [
        'Escríbenos a [COMPLETAR: email de contacto] indicando tu número de pedido y si deseas un reembolso o un cambio.',
        'Te confirmaremos la aceptación de la devolución y te indicaremos la dirección a la que debes enviar el producto, o gestionaremos la recogida si procede.',
      ],
    },
    {
      heading: 'Gastos de devolución',
      body: [
        '[COMPLETAR: indica quién asume los gastos de devolución. Por defecto legal, al ejercer el derecho de desistimiento los gastos de la devolución corren a cargo del consumidor, salvo que la empresa decida asumirlos como política comercial; en ese caso, indícalo aquí expresamente.]',
      ],
    },
    {
      heading: 'Reembolsos',
      body: [
        'Una vez recibido y verificado el producto, procesaremos el reembolso en un plazo máximo de 14 días naturales desde que ejerciste tu derecho de desistimiento, utilizando el mismo método de pago empleado en la compra, salvo que acuerdes expresamente otro medio.',
        'Podemos retener el reembolso hasta haber recibido el producto de vuelta, o hasta que nos facilites una prueba de su envío, lo que ocurra primero.',
        'Si el valor del producto se ha visto disminuido como consecuencia de una manipulación distinta a la necesaria para comprobar su naturaleza o funcionamiento, podremos descontar dicha disminución del importe a reembolsar.',
      ],
    },
    {
      heading: 'Productos defectuosos o dañados en el transporte',
      body: [
        'Si tu pedido llega defectuoso, incompleto o dañado, contacta con nosotros en [COMPLETAR: email de contacto] en un plazo máximo de [COMPLETAR: ej. 48 horas] desde la entrega, adjuntando fotos del producto y del embalaje. En estos casos, los gastos de devolución corren siempre a nuestro cargo.',
      ],
    },
  ],
};

export const shippingPolicyContent: ContentPageData = {
  title: 'Envíos',
  intro: 'Resumen de plazos, zonas y costes de envío.',
  sections: [
    {
      heading: 'Procesamiento del pedido',
      body: [
        'Preparamos los pedidos en un plazo de [COMPLETAR: ej. 24-48 horas laborables] desde la confirmación del pago. Recibirás un email de confirmación en cuanto tu pedido salga de nuestro almacén.',
      ],
    },
    {
      heading: 'Métodos y plazos de entrega',
      body: [
        'Al finalizar la compra puedes elegir entre las siguientes opciones de envío; el plazo indicado se cuenta desde que el pedido sale de nuestras instalaciones:',
      ],
      list: [
        'Envío estándar (4,95 €): 3-5 días laborables.',
        'Envío exprés (9,95 €): 1-2 días laborables.',
        'Recogida en tienda (gratis): disponible en 24 horas en [COMPLETAR: dirección del punto de recogida].',
      ],
    },
    {
      body: [
        'Estos plazos son orientativos y pueden variar por causas ajenas a nosotros, como incidencias del transportista o circunstancias excepcionales.',
      ],
    },
    {
      heading: 'Zonas de envío',
      body: [
        'Actualmente enviamos a [COMPLETAR: zonas cubiertas, ej. Península y Baleares]. [COMPLETAR SI APLICA: condiciones especiales para Canarias, Ceuta, Melilla o envíos internacionales, incluyendo posibles aranceles o trámites aduaneros que pudieran correr a cargo del comprador.]',
      ],
    },
    {
      heading: 'Costes de envío',
      body: [
        'El coste de envío se calcula y muestra de forma desglosada antes de confirmar el pedido, en función del método elegido. [COMPLETAR SI APLICA: condiciones de envío gratuito a partir de un importe mínimo de compra.]',
      ],
    },
    {
      heading: 'Seguimiento del pedido',
      body: [
        'En cuanto tu pedido sea entregado al transportista, recibirás un email con el número de seguimiento para consultar su estado en todo momento.',
      ],
    },
    {
      heading: 'Incidencias en la entrega',
      body: [
        'Si tu pedido no llega en el plazo estimado, o llega dañado, contacta con nosotros en [COMPLETAR: email de contacto] indicando tu número de pedido; te ayudaremos a resolverlo lo antes posible con el transportista.',
      ],
    },
  ],
};

export const faqContent: FaqPageData = {
  title: 'Preguntas frecuentes',
  intro: 'Resolvemos aquí las dudas más habituales. Si no encuentras la respuesta que buscas, escríbenos desde la página de Contacto.',
  items: [
    {
      question: '¿Cuánto tarda en llegar mi pedido?',
      answer:
        'Depende del método de envío elegido: 3-5 días laborables con el envío estándar, o 1-2 días laborables con el envío exprés, una vez el pedido sale de nuestro almacén. Consulta la página de Envíos para más detalle.',
    },
    {
      question: '¿Puedo devolver un producto?',
      answer:
        'Sí. Dispones de 14 días naturales desde la recepción del pedido para desistir de la compra, sin necesidad de justificar el motivo. Consulta la página de Devoluciones para conocer el proceso completo y las excepciones que aplican por ley.',
    },
    {
      question: '¿Qué métodos de pago aceptáis?',
      answer:
        'Aceptamos pago con tarjeta de crédito y débito a través de Stripe, una pasarela de pago segura. Nunca almacenamos los datos completos de tu tarjeta en nuestros servidores.',
    },
    {
      question: '¿Puedo modificar o cancelar mi pedido después de confirmarlo?',
      answer:
        'Si el pedido todavía no ha salido de nuestro almacén, escríbenos cuanto antes a nuestro email de contacto y haremos lo posible por modificarlo o cancelarlo. Una vez enviado, tendrás que gestionarlo como una devolución.',
    },
    {
      question: '¿Qué hago si mi pedido llega dañado o incompleto?',
      answer:
        'Contacta con nosotros indicando tu número de pedido y adjuntando fotos del producto y del embalaje. Nos encargamos de la solución (reposición, reparación o reembolso) sin coste para ti.',
    },
    {
      question: '¿Cómo puedo contactar con vosotros?',
      answer: 'Puedes escribirnos desde la página de Contacto o directamente a nuestro email de contacto.',
    },
    {
      question: '¿Hacéis envíos internacionales?',
      answer:
        'Consulta la página de Envíos para ver las zonas a las que enviamos actualmente. Si tu país no aparece, escríbenos: estamos ampliando la cobertura progresivamente.',
    },
  ],
};

export const contactContent: ContactPageData = {
  title: 'Contacto',
  intro: 'Tienes alguna duda? Escribenos y te responderemos lo antes posible.',
  formTitle: 'Escribenos',
  infoItems: [
    { label: 'Email', value: 'hola@tumarca.com', href: 'mailto:hola@tumarca.com' },
    { label: 'Telefono', value: '+34 900 000 000', href: 'tel:+34900000000' },
    { label: 'Horario', value: 'Lunes a viernes, 9:00-18:00' },
  ],
};

export const cookiesContent: ContentPageData = {
  title: 'Política de cookies',
  updatedAt: '[COMPLETAR: fecha de publicación de esta versión]',
  intro:
    'Esta página explica qué son las cookies, cuáles usamos en esta web y cómo puedes aceptarlas, rechazarlas o cambiar tu elección en cualquier momento.',
  sections: [
    {
      heading: '1. Qué es una cookie',
      body: [
        'Una cookie es un pequeño archivo que se guarda en tu navegador cuando visitas una web. Sirve para recordar información sobre tu visita, como tus preferencias o si has iniciado sesión.',
      ],
    },
    {
      heading: '2. Qué tipos de cookies usamos',
      body: [
        'Clasificamos las cookies de esta web en tres categorías. Puedes elegir cuáles aceptar desde el botón «Configurar cookies» del pie de página.',
      ],
      list: [
        'Necesarias: imprescindibles para navegar por la web, mantener la cesta y la sesión iniciada, y garantizar la seguridad del sitio. No requieren consentimiento y no se pueden desactivar, conforme al art. 22.2 LSSI-CE.',
        'Analíticas: nos ayudarían a entender cómo se usa la web (páginas visitadas, errores) de forma agregada. Solo se instalarían si las aceptas expresamente.',
        'Marketing: se usarían para mostrarte publicidad relevante en esta web y en otras, según tu navegación. Solo se instalarían si las aceptas expresamente.',
      ],
    },
    {
      body: [
        'A fecha de esta actualización no tenemos activa ninguna cookie analítica ni de marketing de terceros. Si en el futuro las incorporamos, actualizaremos esta política y, conforme al RGPD, solo se instalarán después de que des tu consentimiento expreso: nunca antes.',
      ],
    },
    {
      heading: '3. Cookies propias que utilizamos',
      body: ['Estas son las cookies técnicas (necesarias) que instala actualmente esta web:'],
      list: [
        'guest_id — identifica tu cesta y tus pedidos como comprador invitado, sin necesidad de crear una cuenta. Duración: 1 año.',
        'cookie_consent — recuerda tu elección sobre esta política de cookies. Duración: 1 año.',
        'Cookie de sesión de autenticación — mantiene tu sesión iniciada cuando accedes con tu cuenta. Duración: mientras dura la sesión.',
        'sidebar_state — recuerda si el menú lateral del panel de administración está expandido o contraído (solo visible para el equipo de la tienda). Duración: 7 días.',
      ],
    },
    {
      heading: '4. Cookies de terceros',
      body: [
        'Durante el proceso de pago, Stripe puede instalar sus propias cookies necesarias para procesar la transacción de forma segura, fuera de nuestro dominio y bajo su propia política de cookies y privacidad.',
      ],
    },
    {
      heading: '5. Cómo gestionar tus preferencias',
      body: [
        'Puedes aceptar, rechazar o configurar el detalle de las cookies la primera vez que visitas la web, y volver a cambiar tu elección cuando quieras desde el enlace «Configurar cookies» del pie de página. Tu elección se recuerda durante 12 meses; pasado ese tiempo, volveremos a pedirte tu consentimiento.',
        'También puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que bloquear las cookies necesarias puede impedir el funcionamiento correcto de la cesta o del inicio de sesión.',
      ],
    },
    {
      heading: '6. Más información',
      body: [
        'Para cualquier duda sobre esta política puedes escribirnos desde la página de Contacto. Consulta también nuestra Política de privacidad para saber cómo tratamos tus datos personales.',
      ],
    },
  ],
};