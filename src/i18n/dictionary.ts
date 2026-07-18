export type Dictionary = {
  meta: {
    siteName: string;
    titleSuffix: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    about: string;
    menu: string;
    reservation: string;
    gallery: string;
    contact: string;
    reserveCta: string;
    toggleMenu: string;
    mainNavLabel: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    scroll: string;
    infoBar: {
      address: string;
      hours: string;
      phone: string;
      cuisine: string;
    };
    about: {
      eyebrow: string;
      title: string;
      paragraph1: string;
      paragraph2: string;
      cta: string;
      stats: { value: string; label: string }[];
    };
    featured: {
      eyebrow: string;
      title: string;
      cta: string;
    };
    reservationBand: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cta: string;
    };
    galleryTeaser: {
      eyebrow: string;
      title: string;
      cta: string;
    };
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    paragraphs: string[];
    values: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
    };
    quote: { text: string; cite: string };
  };
  menu: {
    eyebrow: string;
    title: string;
    subtitle: string;
    downloadPdf: string;
    downloadPdfDrinks: string;
    jumpTo: string;
    allergenLegendTitle: string;
    allergenNote: string;
    priceHiddenNote: string;
    favoriteLabel: string;
    breakfastOffer: {
      label: string;
      hours: string;
      options: { label: string; price: number }[];
      supplementsLabel: string;
      supplements: { label: string; price: number }[];
    };
    menuDelDia: {
      label: string;
      note: string;
      primerosLabel: string;
      segundosLabel: string;
      postresLabel: string;
      halfMenuLabel: string;
      /** Variable length on purpose — some days have 4 options, some have 5. */
      primeros: string[];
      segundos: string[];
      postres: string[];
      /** `halfPrice` only set where the client has confirmed a "medio menú" rate for that tier. */
      tiers: { label: string; price: number; halfPrice?: number }[];
    };
    supplementsTitle: string;
    categories: Record<string, string>;
    groupLabels: {
      food: string;
      drinks: string;
    };
  };
  reservation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      date: string;
      time: string;
      guests: string;
      requests: string;
      requestsPlaceholder: string;
      timeSelectDateFirst: string;
      timeChoose: string;
      submit: string;
      submitting: string;
      disclaimer: string;
      successTitle: string;
      successMessage: string;
      successSpamNote: string;
      errorMessage: string;
      unavailableMessage: string;
    };
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: { all: string; dishes: string; interior: string; exterior: string };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    infoTitle: string;
    address: string;
    phone: string;
    email: string;
    hoursTitle: string;
    hours: { days: string; hours: string }[];
    mapPlaceholder: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    hoursTitle: string;
    socialTitle: string;
    socialSoon: string;
    rights: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
  common: {
    languageSwitcherLabel: string;
    placeholderPhotoLabel: string;
  };
};
