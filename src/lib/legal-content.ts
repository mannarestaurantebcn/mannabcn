import type { Locale } from "@/i18n/config";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

const BUSINESS_NAME = "Mannà Restaurant";
const ADDRESS = "Carrer de Llull 74, 08005 Barcelona";
const PHONE = "+34 633 83 20 57";
const EMAIL = "mannarestaurantebcn@gmail.com";

export const legalNotice: Record<Locale, LegalPageContent> = {
  es: {
    title: "Aviso legal",
    description: "Aviso legal del sitio web de Mannà Restaurant, Barcelona.",
    updated: "Última actualización: [FECHA]",
    sections: [
      {
        heading: "1. Datos identificativos",
        paragraphs: [
          `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos: el presente sitio web es titularidad de ${BUSINESS_NAME} (nombre comercial), con NIF/CIF [NIF/CIF DEL TITULAR], domicilio en ${ADDRESS}, correo electrónico de contacto ${EMAIL} y teléfono ${PHONE}.`,
          "[Si el titular está inscrito en el Registro Mercantil u otro registro público, indicar aquí los datos de inscripción.]",
        ],
      },
      {
        heading: "2. Objeto",
        paragraphs: [
          `El presente sitio web (en adelante, "el sitio web"), accesible en [DOMINIO DEL SITIO WEB], tiene como finalidad informar sobre la actividad y los servicios de ${BUSINESS_NAME}, mostrar la carta del restaurante, y permitir a los usuarios solicitar reservas de mesa y ponerse en contacto con el restaurante.`,
        ],
      },
      {
        heading: "3. Condiciones de acceso y uso",
        paragraphs: [
          "El acceso al sitio web es gratuito y no requiere registro previo. El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la legislación aplicable, la buena fe y el orden público.",
          "Queda prohibido el uso del sitio web con fines fraudulentos, ilícitos o lesivos de los derechos e intereses de terceros, así como cualquier actuación que pueda dañar, inutilizar o sobrecargar el sitio web o impedir su normal utilización.",
        ],
      },
      {
        heading: "4. Propiedad intelectual e industrial",
        paragraphs: [
          `Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño, código fuente, y demás elementos) son propiedad de ${BUSINESS_NAME} o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o comunicación pública total o parcial sin la autorización expresa del titular.`,
        ],
      },
      {
        heading: "5. Reservas a través del sitio web",
        paragraphs: [
          "El formulario de reservas es una solicitud de reserva, no una confirmación automática de mesa. El restaurante se pondrá en contacto con el usuario, por teléfono o correo electrónico, para confirmar la disponibilidad. El restaurante se reserva el derecho a rechazar o modificar una solicitud de reserva por causas justificadas (por ejemplo, falta de disponibilidad).",
        ],
      },
      {
        heading: "6. Exclusión de responsabilidad",
        paragraphs: [
          `${BUSINESS_NAME} no garantiza la disponibilidad y continuidad permanente del sitio web, ni se responsabiliza de los daños que pudieran derivarse de interrupciones, errores de conexión, o de la presencia de virus u otros elementos lesivos en el sitio web, sin perjuicio de las medidas de seguridad razonables que se adoptan.`,
        ],
      },
      {
        heading: "7. Legislación aplicable y jurisdicción",
        paragraphs: [
          "Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del sitio web, las partes se someten a los juzgados y tribunales de [CIUDAD, PROVINCIA], salvo que la normativa aplicable en materia de consumidores y usuarios establezca otro fuero.",
        ],
      },
    ],
  },
  en: {
    title: "Legal notice",
    description: "Legal notice for the Mannà Restaurant website, Barcelona.",
    updated: "Last updated: [DATE]",
    sections: [
      {
        heading: "1. Identifying information",
        paragraphs: [
          `In compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), this website is owned by ${BUSINESS_NAME} (trade name), with tax ID [OWNER'S TAX ID], registered address at ${ADDRESS}, contact email ${EMAIL}, and phone ${PHONE}.`,
          "[If the owner is registered with the Spanish Commercial Registry or another public register, add those details here.]",
        ],
      },
      {
        heading: "2. Purpose",
        paragraphs: [
          `This website (the "website"), available at [WEBSITE DOMAIN], provides information about ${BUSINESS_NAME}'s activity and services, displays the restaurant's menu, and allows users to request table reservations and get in touch with the restaurant.`,
        ],
      },
      {
        heading: "3. Access and use conditions",
        paragraphs: [
          "Access to the website is free and does not require prior registration. Users agree to make appropriate and lawful use of the website, in accordance with applicable law, good faith, and public order.",
          "Any fraudulent, unlawful use of the website, or use that infringes on the rights of third parties, or that could damage, disable, or overload the website, is prohibited.",
        ],
      },
      {
        heading: "4. Intellectual and industrial property",
        paragraphs: [
          `All content on the website (text, images, logos, design, source code, and other elements) is the property of ${BUSINESS_NAME} or of third parties who have authorised its use, and is protected by intellectual and industrial property law. Reproduction, distribution, or public communication, in whole or in part, without express authorisation from the owner is prohibited.`,
        ],
      },
      {
        heading: "5. Reservations through the website",
        paragraphs: [
          "The reservation form is a booking request, not an automatic table confirmation. The restaurant will contact the user by phone or email to confirm availability. The restaurant reserves the right to decline or modify a reservation request for justified reasons (for example, lack of availability).",
        ],
      },
      {
        heading: "6. Disclaimer",
        paragraphs: [
          `${BUSINESS_NAME} does not guarantee permanent availability or continuity of the website, and is not liable for damages arising from interruptions, connection errors, or the presence of viruses or other harmful elements on the website, without prejudice to the reasonable security measures in place.`,
        ],
      },
      {
        heading: "7. Applicable law and jurisdiction",
        paragraphs: [
          "These terms are governed by Spanish law. Any dispute arising from access to or use of the website shall be submitted to the courts of [CITY, PROVINCE], unless applicable consumer protection law establishes a different venue.",
        ],
      },
    ],
  },
};

export const privacyPolicy: Record<Locale, LegalPageContent> = {
  es: {
    title: "Política de privacidad",
    description:
      "Política de privacidad de Mannà Restaurant: cómo tratamos tus datos personales al reservar mesa o contactar con nosotros.",
    updated: "Última actualización: [FECHA]",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          `El responsable del tratamiento de los datos personales recabados a través de este sitio web es ${BUSINESS_NAME}, con NIF/CIF [NIF/CIF], domicilio en ${ADDRESS} y correo electrónico ${EMAIL}.`,
        ],
      },
      {
        heading: "2. Datos que recabamos",
        paragraphs: [
          "A través del formulario de reservas: nombre, correo electrónico, teléfono, fecha y hora deseadas, número de comensales y, en su caso, peticiones especiales.",
          "A través del formulario de contacto: nombre, correo electrónico y el contenido del mensaje.",
        ],
      },
      {
        heading: "3. Finalidad del tratamiento",
        paragraphs: [
          "Los datos se utilizan exclusivamente para gestionar las solicitudes de reserva de mesa, responder a las consultas enviadas a través del formulario de contacto, y enviar la correspondiente confirmación por correo electrónico. No se utilizan con fines de marketing ni se ceden a terceros para fines comerciales.",
        ],
      },
      {
        heading: "4. Legitimación",
        paragraphs: [
          "La base legal para el tratamiento de los datos es la ejecución de medidas precontractuales solicitadas por el interesado (gestión de la reserva) y el consentimiento del usuario, prestado al enviar voluntariamente el formulario correspondiente.",
        ],
      },
      {
        heading: "5. Destinatarios y encargados del tratamiento",
        paragraphs: [
          "Para el funcionamiento del sitio web se utilizan los siguientes proveedores, que actúan como encargados del tratamiento: Google LLC / Google Ireland Limited (Google Calendar, para la gestión interna de reservas, y Gmail, para el envío de correos electrónicos de confirmación), y Vercel Inc. (alojamiento del sitio web). Estos proveedores pueden almacenar datos en servidores fuera del Espacio Económico Europeo, acogidos a las garantías correspondientes (cláusulas contractuales tipo u otro mecanismo de transferencia internacional válido).",
          "No se ceden datos a terceros para fines distintos de los descritos, salvo obligación legal.",
        ],
      },
      {
        heading: "6. Plazo de conservación",
        paragraphs: [
          "Los datos se conservarán durante el tiempo necesario para gestionar la reserva o consulta, y posteriormente durante los plazos legalmente exigibles para atender eventuales responsabilidades.",
        ],
      },
      {
        heading: "7. Derechos de las personas interesadas",
        paragraphs: [
          `El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos, enviando una solicitud por correo electrónico a ${EMAIL}, adjuntando copia de un documento que acredite su identidad.`,
          "Asimismo, el usuario tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento de sus datos no se ajusta a la normativa vigente.",
        ],
      },
      {
        heading: "8. Medidas de seguridad",
        paragraphs: [
          "Se han adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    description:
      "Mannà Restaurant's privacy policy: how we handle your personal data when booking a table or contacting us.",
    updated: "Last updated: [DATE]",
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          `The controller responsible for the personal data collected through this website is ${BUSINESS_NAME}, tax ID [TAX ID], registered address at ${ADDRESS}, and contact email ${EMAIL}.`,
        ],
      },
      {
        heading: "2. Data we collect",
        paragraphs: [
          "Through the reservation form: name, email address, phone number, requested date and time, number of guests, and any special requests.",
          "Through the contact form: name, email address, and the content of the message.",
        ],
      },
      {
        heading: "3. Purpose of processing",
        paragraphs: [
          "Data is used exclusively to manage table reservation requests, respond to enquiries sent through the contact form, and send the corresponding confirmation by email. Data is not used for marketing purposes and is not shared with third parties for commercial purposes.",
        ],
      },
      {
        heading: "4. Legal basis",
        paragraphs: [
          "The legal basis for processing is the performance of pre-contractual measures requested by the data subject (managing the reservation) and the user's consent, given by voluntarily submitting the relevant form.",
        ],
      },
      {
        heading: "5. Recipients and data processors",
        paragraphs: [
          "The following providers, acting as data processors, are used to operate the website: Google LLC / Google Ireland Limited (Google Calendar, for internal reservation management, and Gmail, for sending confirmation emails), and Vercel Inc. (website hosting). These providers may store data on servers outside the European Economic Area, under appropriate safeguards (standard contractual clauses or another valid international transfer mechanism).",
          "Data is not shared with third parties for purposes other than those described, except where legally required.",
        ],
      },
      {
        heading: "6. Retention period",
        paragraphs: [
          "Data is retained for as long as necessary to manage the reservation or enquiry, and afterwards for the periods legally required to address potential liabilities.",
        ],
      },
      {
        heading: "7. Data subject rights",
        paragraphs: [
          `Users may exercise their rights of access, rectification, erasure, objection, restriction of processing, and data portability by emailing ${EMAIL}, attaching a copy of an identifying document.`,
          "Users also have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es) if they believe their data has not been processed in accordance with applicable law.",
        ],
      },
      {
        heading: "8. Security measures",
        paragraphs: [
          "Appropriate technical and organisational measures have been implemented to ensure the security of personal data and to prevent unauthorised alteration, loss, processing, or access.",
        ],
      },
    ],
  },
};

export const cookiesPolicy: Record<Locale, LegalPageContent> = {
  es: {
    title: "Política de cookies",
    description: "Política de cookies de Mannà Restaurant: qué cookies usamos en nuestro sitio web y cómo gestionarlas.",
    updated: "Última actualización: [FECHA]",
    sections: [
      {
        heading: "1. ¿Qué son las cookies?",
        paragraphs: [
          "Las cookies son pequeños archivos de texto que un sitio web almacena en el navegador del usuario, con el fin de recordar información sobre la visita.",
        ],
      },
      {
        heading: "2. Cookies utilizadas en este sitio web",
        paragraphs: [
          "Este sitio web no utiliza cookies de analítica, publicidad ni redes sociales. Únicamente pueden generarse cookies técnicas necesarias para el funcionamiento del sitio, y las que pueda establecer el mapa de Google Maps incrustado en la página de contacto cuando el usuario interactúa con él, cuyo uso está sujeto a la política de privacidad de Google.",
          "[Si en el futuro se añaden herramientas de analítica (por ejemplo, Google Analytics) o de publicidad, esta política deberá actualizarse para reflejarlo, junto con un banner de consentimiento de cookies.]",
        ],
      },
      {
        heading: "3. Cómo gestionar o desactivar las cookies",
        paragraphs: [
          "El usuario puede permitir, bloquear o eliminar las cookies instaladas en su navegador configurando las opciones de privacidad del mismo. A continuación, algunos enlaces de ayuda de los navegadores más comunes: Chrome, Firefox, Safari y Edge (buscar \"gestión de cookies\" en la configuración de cada navegador).",
        ],
      },
      {
        heading: "4. Actualizaciones de esta política",
        paragraphs: [
          "Esta política de cookies puede actualizarse en función de cambios legislativos o de las herramientas utilizadas en el sitio web. Se recomienda revisarla periódicamente.",
        ],
      },
    ],
  },
  en: {
    title: "Cookie policy",
    description: "Mannà Restaurant's cookie policy: which cookies we use on our website and how to manage them.",
    updated: "Last updated: [DATE]",
    sections: [
      {
        heading: "1. What are cookies?",
        paragraphs: [
          "Cookies are small text files that a website stores on the user's browser to remember information about the visit.",
        ],
      },
      {
        heading: "2. Cookies used on this website",
        paragraphs: [
          "This website does not use analytics, advertising, or social media cookies. Only technical cookies necessary for the website to function may be set, along with any cookies set by the Google Maps embed on the contact page when the user interacts with it, which is subject to Google's own privacy policy.",
          "[If analytics tools (e.g. Google Analytics) or advertising tools are added in the future, this policy must be updated accordingly, along with a cookie consent banner.]",
        ],
      },
      {
        heading: "3. Managing or disabling cookies",
        paragraphs: [
          "Users can allow, block, or delete cookies stored in their browser by adjusting its privacy settings. Help is available for most common browsers — Chrome, Firefox, Safari, and Edge (search \"manage cookies\" in each browser's settings).",
        ],
      },
      {
        heading: "4. Updates to this policy",
        paragraphs: [
          "This cookie policy may be updated to reflect changes in legislation or in the tools used on the website. We recommend reviewing it periodically.",
        ],
      },
    ],
  },
};

export const termsOfUse: Record<Locale, LegalPageContent> = {
  es: {
    title: "Términos y condiciones de uso",
    description: "Términos y condiciones de uso del sitio web de Mannà Restaurant, Barcelona.",
    updated: "Última actualización: [FECHA]",
    sections: [
      {
        heading: "1. Objeto y aceptación",
        paragraphs: [
          `El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de los presentes términos y condiciones. Si no está de acuerdo con ellos, debe abstenerse de utilizar el sitio web de ${BUSINESS_NAME}.`,
        ],
      },
      {
        heading: "2. Uso del sitio web",
        paragraphs: [
          "El sitio web ofrece información sobre el restaurante, su carta, horarios de apertura, y permite solicitar reservas de mesa y ponerse en contacto con el restaurante. El usuario se compromete a facilitar información veraz en los formularios disponibles.",
        ],
      },
      {
        heading: "3. Reservas",
        paragraphs: [
          "Toda solicitud de reserva realizada a través del sitio web está sujeta a confirmación por parte del restaurante, por teléfono o correo electrónico. El envío del formulario no garantiza la disponibilidad de mesa.",
        ],
      },
      {
        heading: "4. Propiedad intelectual",
        paragraphs: [
          "Todos los contenidos del sitio web están protegidos por derechos de propiedad intelectual e industrial. Queda prohibida su reproducción o distribución sin autorización expresa.",
        ],
      },
      {
        heading: "5. Responsabilidad",
        paragraphs: [
          `${BUSINESS_NAME} no se responsabiliza del uso indebido que los usuarios puedan hacer del sitio web, ni de la exactitud de la información mostrada en caso de errores tipográficos o de actualización no imputables al restaurante (por ejemplo, cambios en precios o disponibilidad de platos).`,
        ],
      },
      {
        heading: "6. Modificaciones",
        paragraphs: [
          `${BUSINESS_NAME} se reserva el derecho a modificar estos términos y condiciones en cualquier momento. Se recomienda al usuario revisarlos periódicamente.`,
        ],
      },
      {
        heading: "7. Legislación aplicable",
        paragraphs: [
          "Estos términos se rigen por la legislación española, sometiéndose las partes a los juzgados y tribunales de [CIUDAD, PROVINCIA], salvo que la normativa de consumidores establezca otro fuero.",
        ],
      },
    ],
  },
  en: {
    title: "Terms and conditions of use",
    description: "Terms and conditions of use for the Mannà Restaurant website, Barcelona.",
    updated: "Last updated: [DATE]",
    sections: [
      {
        heading: "1. Purpose and acceptance",
        paragraphs: [
          `Accessing and using this website grants the status of user and implies acceptance of these terms and conditions. If you do not agree with them, please refrain from using ${BUSINESS_NAME}'s website.`,
        ],
      },
      {
        heading: "2. Use of the website",
        paragraphs: [
          "The website provides information about the restaurant, its menu, and opening hours, and allows users to request table reservations and contact the restaurant. Users agree to provide accurate information in the forms available.",
        ],
      },
      {
        heading: "3. Reservations",
        paragraphs: [
          "Every reservation request made through the website is subject to confirmation by the restaurant, by phone or email. Submitting the form does not guarantee table availability.",
        ],
      },
      {
        heading: "4. Intellectual property",
        paragraphs: [
          "All content on the website is protected by intellectual and industrial property rights. Reproduction or distribution without express authorisation is prohibited.",
        ],
      },
      {
        heading: "5. Liability",
        paragraphs: [
          `${BUSINESS_NAME} is not liable for any misuse of the website by users, nor for the accuracy of the information shown in the event of typographical errors or updates beyond the restaurant's control (for example, changes to prices or dish availability).`,
        ],
      },
      {
        heading: "6. Changes",
        paragraphs: [
          `${BUSINESS_NAME} reserves the right to modify these terms and conditions at any time. Users are advised to review them periodically.`,
        ],
      },
      {
        heading: "7. Applicable law",
        paragraphs: [
          "These terms are governed by Spanish law, and the parties submit to the courts of [CITY, PROVINCE], unless applicable consumer protection law establishes a different venue.",
        ],
      },
    ],
  },
};
