import type { Dictionary } from "../dictionary";

export const en: Dictionary = {
  meta: {
    siteName: "Mannà",
    titleSuffix: "Restaurant in Barcelona",
    defaultDescription:
      "Mannà, a tapas, mixed-plate and Mediterranean restaurant in the heart of Barcelona. Daily menu, terrace and neighbourhood soul.",
  },
  nav: {
    home: "Home",
    about: "About",
    menu: "Menu",
    reservation: "Reservations",
    gallery: "Gallery",
    contact: "Contact",
    reserveCta: "Book a table",
    toggleMenu: "Open navigation menu",
    mainNavLabel: "Main navigation",
  },
  home: {
    heroEyebrow: "Mannà — Restaurant · Barcelona",
    heroTitle: "From the mountains\nto the sea, daily",
    heroSubtitle:
      "Tapas, mixed plates and a menu that changes every day, in the heart of Barcelona.",
    heroCtaPrimary: "See the menu",
    heroCtaSecondary: "Book a table",
    scroll: "Discover",
    infoBar: {
      address: "Carrer de Llull 74, 08005 Barcelona",
      hours: "Mon–Fri 7am–10pm",
      phone: "+34 633 83 20 57",
      cuisine: "Mediterranean cuisine",
    },
    about: {
      eyebrow: "Our house",
      title: "A neighbourhood spot\nwith Mediterranean soul.",
      paragraph1:
        "At Mannà we cook like at home: classic tapas, Iberian cured meats, grilled fish and a menu that changes with the day, made for unhurried sharing.",
      paragraph2:
        "From our terrace on Carrer de Llull, we serve breakfast, a daily set menu and long afternoons at the table, with the same care from the first coffee to the last glass of cava.",
      cta: "Discover Mannà",
      stats: [
        { value: "100+", label: "dishes on the menu" },
        { value: "7", label: "days a week" },
        { value: "15h", label: "of daily service" },
        { value: "100%", label: "neighbourhood flavour" },
      ],
    },
    featured: {
      eyebrow: "Most loved",
      title: "A few\nhouse favourites.",
      cta: "See the full menu",
    },
    reservationBand: {
      eyebrow: "Reservations",
      title: "Save your table.",
      subtitle:
        "Tell us when you're coming and we'll take care of the rest. Confirmation by phone or email.",
      cta: "Book now",
    },
    galleryTeaser: {
      eyebrow: "Gallery",
      title: "A look\ninside Mannà.",
      cta: "View the full gallery",
    },
  },
  about: {
    eyebrow: "Our story",
    title: "Not a postcard\nrestaurant. Your\nneighbourhood restaurant.",
    intro:
      "Mannà was born in the Poblenou neighbourhood with a simple idea: honest food, generous portions and a warm welcome, every day of the week.",
    paragraphs: [
      "We open early for breakfast and close late for long afternoons at the table. In between, a menu that combines classic tapas, mixed plates, sandwiches and rice dishes, made for every appetite and every occasion.",
      "We work with local suppliers for our ham, cured meats and grilled fish, and keep an open kitchen that follows the seasons — which is why the daily set menu changes every day.",
      "Whether you're a regular or just passing through Barcelona, there's always room at the table at Mannà.",
    ],
    values: {
      eyebrow: "How we work",
      title: "The values\nbehind every table.",
      subtitle:
        "Four simple ideas guide everything we serve at Mannà, from the first morning coffee to the last tapa of the night.",
      items: [
        {
          title: "A living menu",
          description:
            "Our daily set menu changes with the market, so there's always something new to try.",
        },
        {
          title: "Trusted produce",
          description:
            "Iberian ham, cured meats and fresh grilled fish, chosen from suppliers we've worked with for years.",
        },
        {
          title: "Made to share",
          description:
            "Tapas and shared plates built for the middle of the table — perfect for groups and long lunches.",
        },
        {
          title: "Neighbourhood hours",
          description:
            "Open from breakfast to dinner, seven days a week, with the same warm welcome.",
        },
      ],
    },
    quote: {
      text: "“The best table isn't the fanciest one — it's the one that always has room for one more.”",
      cite: "— Team Mannà, Barcelona",
    },
  },
  menu: {
    eyebrow: "The menu",
    title: "Our menu,\nday by day.",
    subtitle:
      "Organised by category, with allergens noted on every dish. The daily set menu changes every day.",
    downloadPdf: "Download food menu (PDF)",
    downloadPdfDrinks: "Download drinks menu (PDF)",
    jumpTo: "Jump to category",
    allergenLegendTitle: "Allergen legend",
    allergenNote:
      "If you have a food allergy or intolerance, please ask a member of staff before ordering.",
    priceHiddenNote: "Prices shown in euros. May vary with the market.",
    favoriteLabel: "Favourite",
    breakfastOffer: {
      label: "Breakfast offer",
      hours: "7am to 12 noon",
      options: [
        { label: "Coffee + pastry", price: 2.5 },
        { label: "Coffee + mini sandwich", price: 3.2 },
        { label: "Coffee + half sandwich", price: 3.9 },
        { label: "Coffee + toasted ham & cheese (bikini)", price: 4.2 },
        { label: "Drink + half sandwich", price: 4.4 },
        { label: "Drink + toasted ham & cheese (bikini)", price: 4.9 },
        { label: "Fresh juice + half sandwich or bikini", price: 5.7 },
        { label: "Hot or cold sandwich + drink", price: 5.9 },
      ],
      supplementsLabel: "Add-ons",
      supplements: [
        { label: "Half sandwich with cheese", price: 0.5 },
        { label: "Whole sandwich with cheese", price: 1.0 },
      ],
    },
    menuDelDia: {
      label: "Daily set menu",
      note: "Bread, drink and dessert or coffee included. The menu changes daily.",
      primerosLabel: "Starters",
      segundosLabel: "Mains",
      postresLabel: "Desserts",
      halfMenuLabel: "Half menu",
      primeros: [
        "Lobster paella (20 min)",
        "Salad with fresh cheese and tuna",
        "Garlic shrimp",
        "Iberian ham croquettes",
        "Homemade Andalusian gazpacho",
      ],
      segundos: [
        "Grilled veal T-bone",
        "Grilled lamb \"michanas\"",
        "Grilled pork secreto with chimichurri sauce",
        "Grilled fresh tuna with garlic & parsley sauce",
      ],
      postres: [
        "Homemade blueberry cheesecake",
        "Homemade almond cake",
        "Homemade pudding",
        "Homemade egg flan",
        "Rice pudding",
        "Chocolate custard",
        "Natural yogurt",
        "Banana",
        "Watermelon",
        "Ice cream",
      ],
      tiers: [
        { label: "Monday to Friday", price: 14.5 },
        { label: "Saturdays & holidays", price: 20.5, halfPrice: 15.5 },
        { label: "Sundays", price: 16.0 },
      ],
    },
    supplementsTitle: "Add-ons",
    categories: {
      tapas: "Tapas, salads & cured meats",
      platosCombinados: "Mixed plates",
      bocadillosFrios: "Cold sandwiches",
      bocadillosCalientes: "Hot sandwiches & burgers",
      paella: "Rice dishes",
      postres: "Desserts",
      cafes: "Coffee",
      refrescos: "Soft drinks & juices",
      cervezas: "Beers",
      vinosSangrias: "Wine, cava & sangria",
      combinadosLargos: "Long drinks",
    },
    groupLabels: {
      food: "To eat",
      drinks: "To drink",
    },
  },
  reservation: {
    eyebrow: "Reservations",
    title: "Book your table\nat Mannà.",
    subtitle:
      "Fill in the form and we'll confirm your booking by phone or email.",
    form: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      date: "Date",
      time: "Time",
      guests: "Number of guests",
      requests: "Special requests",
      requestsPlaceholder: "Allergies, special occasion, high chair…",
      timeSelectDateFirst: "Select a date first",
      timeChoose: "Select a time",
      nameError: "Enter your name (at least 3 letters).",
      emailError: "Enter a valid email address.",
      phoneError: "Enter a valid phone number (digits only).",
      guestsError: "Enter a number of guests between 1 and 20.",
      dateError: "Select a valid date.",
      timeError: "Select a time.",
      submit: "Request booking",
      submitting: "Sending…",
      disclaimer: "You'll receive confirmation of your booking by phone or email.",
      successTitle: "Request received!",
      successMessage: "Thank you, we've received your booking request. We'll confirm by phone or email as soon as possible.",
      successSpamNote: "We've sent you a confirmation email — if you don't see it, please check your spam folder too.",
      errorMessage: "We couldn't send your request. Please try again, or call us at +34 633 83 20 57.",
      unavailableMessage: "Sorry, there are no tables available for that date and time. Please try another time, or call us at +34 633 83 20 57.",
    },
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Mannà\nin pictures.",
    subtitle:
      "A preview of our dishes, dining room and terrace — professional photography coming soon.",
    categories: {
      all: "All",
      dishes: "Dishes",
      interior: "Dining room",
      exterior: "Terrace",
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk.",
    subtitle:
      "For large bookings, private events or any question, write to us or come by.",
    infoTitle: "Information",
    address: "Carrer de Llull 74, 08005 Barcelona",
    phone: "+34 633 83 20 57",
    email: "mannarestaurantebcn@gmail.com",
    hoursTitle: "Opening hours",
    hours: [
      { days: "Monday to Friday", hours: "7:00 – 22:00" },
      { days: "Saturdays & holidays", hours: "9:30 – 21:00" },
      { days: "Sundays", hours: "12:00 – 17:00" },
    ],
    mapPlaceholder: "Mannà map",
    form: {
      name: "Name",
      email: "Email address",
      message: "Message",
      submit: "Send message",
    },
  },
  footer: {
    tagline: "A neighbourhood restaurant in Barcelona.\nFrom the mountains to the sea, daily.",
    navTitle: "Navigate",
    contactTitle: "Contact",
    hoursTitle: "Hours",
    socialTitle: "Social",
    socialSoon: "Coming soon",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms of use",
    cookies: "Cookies",
  },
  common: {
    languageSwitcherLabel: "Switch language",
    placeholderPhotoLabel: "Photo coming soon",
  },
};
