import type { Dictionary } from "../dictionary";

export const es: Dictionary = {
  meta: {
    siteName: "Mannà",
    titleSuffix: "Restaurante en Barcelona",
    defaultDescription:
      "Mannà, restaurante de tapas, platos combinados y cocina mediterránea en el corazón de Barcelona. Carta diaria, terraza y ambiente de barrio con alma.",
  },
  nav: {
    home: "Inicio",
    about: "Nosotros",
    menu: "Carta",
    reservation: "Reservas",
    gallery: "Galería",
    contact: "Contacto",
    reserveCta: "Reservar",
    toggleMenu: "Abrir menú de navegación",
    mainNavLabel: "Navegación principal",
  },
  home: {
    heroEyebrow: "Mannà — Restaurante · Barcelona",
    heroTitle: "De la montaña\nal mar, cada día",
    heroSubtitle:
      "Tapas, platos combinados y carta cambiante en el corazón de Barcelona.",
    heroCtaPrimary: "Ver la carta",
    heroCtaSecondary: "Reservar mesa",
    scroll: "Descubre",
    infoBar: {
      address: "Calle Llull 74, 08005 Barcelona",
      hours: "Abierto todos los días",
      phone: "+34 633 83 20 57",
      cuisine: "Cocina mediterránea",
    },
    about: {
      eyebrow: "Nuestra casa",
      title: "Un rincón de barrio\ncon alma mediterránea.",
      paragraph1:
        "En Mannà cocinamos como en casa: tapas de siempre, embutidos ibéricos, plancha de pescado y una carta que cambia con el día, pensada para compartir sin prisa.",
      paragraph2:
        "Desde nuestra terraza en Calle Llull, servimos desayunos, menú del día y sobremesas largas, con el mismo cariño desde el primer café hasta la última copa de cava.",
      cta: "Conoce Mannà",
      stats: [
        { value: "100+", label: "platos en carta" },
        { value: "7", label: "días a la semana" },
        { value: "15h", label: "de servicio diario" },
        { value: "100%", label: "sabor de barrio" },
      ],
    },
    featured: {
      eyebrow: "Lo más pedido",
      title: "Algunos favoritos\nde la casa.",
      cta: "Ver la carta completa",
    },
    reservationBand: {
      eyebrow: "Reservas",
      title: "Guárdanos tu mesa.",
      subtitle:
        "Cuéntanos cuándo venís y nos ocupamos del resto. Confirmación por teléfono o email.",
      cta: "Reservar ahora",
    },
    galleryTeaser: {
      eyebrow: "Galería",
      title: "Un vistazo\na Mannà.",
      cta: "Ver toda la galería",
    },
  },
  about: {
    eyebrow: "Nuestra historia",
    title: "No somos un restaurante\nde postal. Somos vuestro\nrestaurante de barrio.",
    intro:
      "Mannà nació en el barrio de Poblenou con una idea sencilla: comida honesta, raciones generosas y un trato cercano, todos los días de la semana.",
    paragraphs: [
      "Abrimos temprano para los desayunos y cerramos tarde para las sobremesas. Entre medias, una carta que combina tapas de siempre, platos combinados, bocadillos y arroces, pensada para todo tipo de apetito y de ocasión.",
      "Trabajamos con proveedores de proximidad para el jamón, los embutidos y el pescado de plancha, y mantenemos una cocina abierta a lo que cada temporada nos ofrece — por eso el menú del día cambia a diario.",
      "Ya seas del barrio o estés de paso por Barcelona, en Mannà siempre hay sitio en la mesa.",
    ],
    values: {
      eyebrow: "Cómo trabajamos",
      title: "Los valores\ndetrás de cada mesa.",
      subtitle:
        "Cuatro ideas simples guían todo lo que servimos en Mannà, desde el primer café de la mañana hasta la última tapa de la noche.",
      items: [
        {
          title: "Carta viva",
          description:
            "El menú del día cambia cada jornada según el mercado, para que siempre haya algo nuevo que probar.",
        },
        {
          title: "Producto de confianza",
          description:
            "Jamón ibérico, embutidos y pescado fresco de plancha, elegidos por proveedores de siempre.",
        },
        {
          title: "Para compartir",
          description:
            "Tapas y raciones pensadas para el centro de la mesa, ideales para grupos y sobremesas largas.",
        },
        {
          title: "Horario de barrio",
          description:
            "Abrimos desde el desayuno hasta la cena, siete días a la semana, con el mismo trato cercano.",
        },
      ],
    },
    quote: {
      text: "“La mejor mesa no es la más elegante, es la que siempre tiene sitio para uno más.”",
      cite: "— Equipo Mannà, Barcelona",
    },
  },
  menu: {
    eyebrow: "La carta",
    title: "Nuestra carta,\ndía a día.",
    subtitle:
      "Organizada por categorías, con alérgenos indicados en cada plato. El menú del día cambia cada jornada.",
    downloadPdf: "Descargar carta de comida (PDF)",
    downloadPdfDrinks: "Descargar carta de bebidas (PDF)",
    jumpTo: "Ir a categoría",
    allergenLegendTitle: "Leyenda de alérgenos",
    allergenNote:
      "Si padece alguna alergia o intolerancia alimentaria, consulte a nuestro personal antes de pedir.",
    priceHiddenNote: "Precios indicados en euros. Pueden variar según el mercado.",
    favoriteLabel: "Favorito",
    breakfastOffer: {
      label: "Oferta desayuno",
      hours: "7:00–12:00",
      options: [
        { label: "Café + pasta", price: 2.5 },
        { label: "Café + mini bocata", price: 3.2 },
        { label: "Café + 1/2 bocata", price: 3.9 },
        { label: "Café + bikini", price: 4.2 },
        { label: "Bebida + 1/2 bocata", price: 4.4 },
        { label: "Bebida + bikini", price: 4.9 },
        { label: "Zumo natural + 1/2 bocata o bikini", price: 5.7 },
        { label: "Bocata caliente o frío + bebida", price: 5.9 },
      ],
      supplementsLabel: "Suplementos",
      supplements: [
        { label: "1/2 bocata con queso", price: 0.5 },
        { label: "Bocata entero con queso", price: 1.0 },
      ],
    },
    menuDelDia: {
      label: "Menú del día",
      hours: "13:00–16:00",
      note: "Pan, bebida y postre o café incluidos. La carta cambia a diario.",
      primerosLabel: "Primeros",
      segundosLabel: "Segundos",
      postresLabel: "Postres",
      halfMenuLabel: "Medio menú",
      primeros: [
        "Paella de bogavante (20 minutos)",
        "Ensalada con queso fresco y atún",
        "Gambas al ajillo",
        "Croquetas de jamón ibérico",
        "Gazpacho andaluz casero",
      ],
      segundos: [
        "Chuletón de ternera a la brasa",
        "Michanas de cordero a la brasa",
        "Secreto de cerdo a la brasa con salsa chimichurri",
        "Atún fresco a la plancha con salsa ajo y perejil",
      ],
      postres: [
        "Tarta de queso con arándano casera",
        "Bizcocho de almendra casera",
        "Pudín casero",
        "Flan de huevo casero",
        "Arroz con leche",
        "Natilla de chocolate",
        "Yogur natural",
        "Banana",
        "Sandía",
        "Helado",
      ],
      tiers: [
        { label: "Lunes a viernes", price: 14.5 },
        { label: "Sábados y festivos", price: 20.5, halfPrice: 15.5 },
        { label: "Domingos", price: 16.0 },
      ],
    },
    supplementsTitle: "Suplementos",
    categories: {
      tapas: "Tapas, ensaladas y embutidos",
      platosCombinados: "Platos combinados",
      bocadillosFrios: "Bocadillos fríos",
      bocadillosCalientes: "Bocadillos calientes y hamburguesas",
      paella: "Arroces",
      postres: "Postres",
      cafes: "Cafés",
      refrescos: "Refrescos y zumos",
      cervezas: "Cervezas",
      vinosSangrias: "Vinos, cava y sangrías",
      combinadosLargos: "Combinados largos",
    },
    groupLabels: {
      food: "Para comer",
      drinks: "Para beber",
    },
  },
  reservation: {
    eyebrow: "Reservas",
    title: "Reserva tu mesa\nen Mannà.",
    subtitle:
      "Completa el formulario y te confirmaremos la reserva por teléfono o email.",
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      date: "Fecha",
      time: "Hora",
      guests: "Número de personas",
      requests: "Peticiones especiales",
      requestsPlaceholder: "Alergias, ocasión especial, silla para bebé…",
      timeSelectDateFirst: "Selecciona primero la fecha",
      timeChoose: "Selecciona una hora",
      nameError: "Introduce tu nombre (mínimo 3 letras).",
      emailError: "Introduce un correo electrónico válido.",
      phoneError: "Introduce un teléfono válido (solo números).",
      guestsError: "Introduce un número de personas entre 1 y 40.",
      dateError: "Selecciona una fecha válida.",
      timeError: "Selecciona una hora.",
      submit: "Solicitar reserva",
      submitting: "Enviando…",
      disclaimer: "Recibirás la confirmación de tu reserva por teléfono o email.",
      successTitle: "¡Solicitud recibida!",
      successMessage: "Gracias, hemos recibido tu solicitud de reserva. Te confirmaremos por teléfono o email lo antes posible.",
      successSpamNote: "Te hemos enviado un email de confirmación — si no lo ves, revisa también la carpeta de spam.",
      errorMessage: "No hemos podido enviar tu solicitud. Por favor, inténtalo de nuevo o llámanos al +34 633 83 20 57.",
      unavailableMessage: "Lo sentimos, no quedan mesas disponibles para esa fecha y hora. Prueba otro horario o llámanos al +34 633 83 20 57.",
    },
  },
  gallery: {
    eyebrow: "Galería",
    title: "Mannà\nen imágenes.",
    subtitle:
      "Un adelanto de nuestros platos, la sala y la terraza — muy pronto con fotografía profesional.",
    categories: {
      all: "Todo",
      dishes: "Platos",
      interior: "Sala",
      exterior: "Terraza",
    },
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos.",
    subtitle:
      "Para reservas grandes, eventos privados o cualquier consulta, escríbenos o pasa a vernos.",
    infoTitle: "Información",
    address: "Calle Llull 74, 08005 Barcelona",
    phone: "+34 633 83 20 57",
    email: "mannarestaurantebcn@gmail.com",
    hoursTitle: "Horario",
    hours: [
      { days: "Lunes a viernes", hours: "7:00 – 22:00" },
      { days: "Sábados y festivos", hours: "9:30 – 22:00" },
      { days: "Domingos", hours: "12:00 – 17:00" },
    ],
    mapPlaceholder: "Mapa de Mannà",
    form: {
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      nameError: "Introduce tu nombre (mínimo 3 letras).",
      emailError: "Introduce un correo electrónico válido.",
      messageError: "Escribe un mensaje de al menos 10 caracteres (máximo 2000).",
      successTitle: "¡Mensaje enviado!",
      successMessage: "Gracias por escribirnos. Te responderemos lo antes posible.",
      errorMessage: "No hemos podido enviar tu mensaje. Por favor, inténtalo de nuevo o llámanos al +34 633 83 20 57.",
    },
  },
  footer: {
    tagline: "Restaurante de barrio en Barcelona.\nDe la montaña al mar, cada día.",
    navTitle: "Navegar",
    contactTitle: "Contacto",
    hoursTitle: "Horario",
    socialTitle: "Redes",
    socialSoon: "Próximamente",
    rights: "Todos los derechos reservados.",
    credit: "Desarrollado por",
  },
  common: {
    languageSwitcherLabel: "Cambiar idioma",
    placeholderPhotoLabel: "Foto próximamente",
  },
  cookieBanner: {
    message:
      "Usamos únicamente cookies técnicas necesarias para el funcionamiento del sitio. El mapa de la página de contacto usa Google Maps, que puede establecer sus propias cookies si decides cargarlo. Más información en nuestra",
    policyLinkLabel: "política de cookies",
    accept: "Aceptar",
    reject: "Rechazar",
    mapBlocked: "Este mapa usa cookies de Google. Acepta las cookies para poder verlo.",
    mapLoad: "Cargar mapa",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "Esta página\nno existe.",
    message: "Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio para seguir explorando Mannà.",
    cta: "Volver al inicio",
  },
};
