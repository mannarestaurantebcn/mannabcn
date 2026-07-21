import nodemailer from "nodemailer";
import type { Locale } from "@/i18n/config";
import type { ReservationInput } from "./google-calendar";

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: getEnv("GMAIL_USER"),
      pass: getEnv("GMAIL_APP_PASSWORD"),
    },
  });
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Madrid",
  }).format(new Date(`${date}T12:00:00Z`));
}

const COPY = {
  es: {
    subject: "Confirmación de tu solicitud de reserva en Mannà Restaurante",
    greeting: (name: string) => `Hola ${name},`,
    intro: "Hemos recibido tu solicitud de reserva en Mannà Restaurante con los siguientes datos:",
    date: "Fecha",
    time: "Hora",
    guests: "Personas",
    note: "Te confirmaremos la reserva por teléfono o email lo antes posible. Si necesitas modificarla o cancelarla, llámanos al +34 633 83 20 57.",
    thanks: "¡Gracias por elegir Mannà Restaurante!",
    address: "Carrer de Llull 74, 08005 Barcelona",
  },
  en: {
    subject: "Your Mannà Restaurante reservation request",
    greeting: (name: string) => `Hi ${name},`,
    intro: "We've received your reservation request at Mannà Restaurante with the following details:",
    date: "Date",
    time: "Time",
    guests: "Guests",
    note: "We'll confirm your booking by phone or email as soon as possible. If you need to change or cancel it, call us at +34 633 83 20 57.",
    thanks: "Thank you for choosing Mannà Restaurante!",
    address: "Carrer de Llull 74, 08005 Barcelona",
  },
} as const;

export async function sendReservationConfirmationEmail(reservation: ReservationInput, locale: Locale) {
  const copy = COPY[locale] ?? COPY.es;
  const transporter = getTransporter();

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2a1006; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #430C05;">Mannà Restaurante</h2>
      <p>${copy.greeting(reservation.name)}</p>
      <p>${copy.intro}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #666;">${copy.date}</td><td style="padding: 6px 0; font-weight: bold;">${formatDate(reservation.date, locale)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">${copy.time}</td><td style="padding: 6px 0; font-weight: bold;">${reservation.time}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">${copy.guests}</td><td style="padding: 6px 0; font-weight: bold;">${reservation.guests}</td></tr>
      </table>
      <p>${copy.note}</p>
      <p>${copy.thanks}</p>
      <p style="color: #999; font-size: 0.85em;">Mannà Restaurante — ${copy.address}</p>
    </div>
  `;

  const text = [
    `${copy.greeting(reservation.name)}`,
    "",
    copy.intro,
    "",
    `${copy.date}: ${formatDate(reservation.date, locale)}`,
    `${copy.time}: ${reservation.time}`,
    `${copy.guests}: ${reservation.guests}`,
    "",
    copy.note,
    "",
    copy.thanks,
    "",
    `Mannà Restaurante — ${copy.address}`,
  ].join("\n");

  await transporter.sendMail({
    from: `Mannà Restaurante <${getEnv("GMAIL_USER")}>`,
    to: reservation.email,
    subject: copy.subject,
    text,
    html,
  });
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Notifies the restaurant's own inbox whenever a customer books through the site. */
export async function sendReservationNotificationEmail(reservation: ReservationInput, locale: Locale) {
  const transporter = getTransporter();
  const restaurantEmail = getEnv("GMAIL_USER");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2a1006; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #430C05;">Nueva reserva desde la web</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #666;">Nombre</td><td style="padding: 6px 0; font-weight: bold;">${escapeHtml(reservation.name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Teléfono</td><td style="padding: 6px 0; font-weight: bold;">${escapeHtml(reservation.phone)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0; font-weight: bold;">${escapeHtml(reservation.email)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Fecha</td><td style="padding: 6px 0; font-weight: bold;">${formatDate(reservation.date, locale)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Hora</td><td style="padding: 6px 0; font-weight: bold;">${reservation.time}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Personas</td><td style="padding: 6px 0; font-weight: bold;">${reservation.guests}</td></tr>
        ${reservation.requests ? `<tr><td style="padding: 6px 0; color: #666;">Peticiones especiales</td><td style="padding: 6px 0; font-weight: bold;">${escapeHtml(reservation.requests)}</td></tr>` : ""}
      </table>
      <p style="color: #999; font-size: 0.85em;">Reserva ya registrada en el calendario — este email es solo un aviso.</p>
    </div>
  `;

  const text = [
    "Nueva reserva desde la web",
    "",
    `Nombre: ${reservation.name}`,
    `Teléfono: ${reservation.phone}`,
    `Email: ${reservation.email}`,
    `Fecha: ${formatDate(reservation.date, locale)}`,
    `Hora: ${reservation.time}`,
    `Personas: ${reservation.guests}`,
    ...(reservation.requests ? [`Peticiones especiales: ${reservation.requests}`] : []),
  ].join("\n");

  await transporter.sendMail({
    from: `Mannà Restaurante <${restaurantEmail}>`,
    to: restaurantEmail,
    replyTo: reservation.email,
    subject: `Nueva reserva: ${reservation.name} — ${formatDate(reservation.date, locale)} ${reservation.time}`,
    text,
    html,
  });
}

type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

/** Forwards a contact form submission to the restaurant's own inbox, with the visitor set as reply-to. */
export async function sendContactMessage(input: ContactMessageInput) {
  const transporter = getTransporter();
  const restaurantEmail = getEnv("GMAIL_USER");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2a1006; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #430C05;">Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(input.message)}</p>
    </div>
  `;

  const text = ["Nuevo mensaje de contacto", "", `Nombre: ${input.name}`, `Email: ${input.email}`, "", "Mensaje:", input.message].join(
    "\n",
  );

  await transporter.sendMail({
    from: `Mannà Restaurante <${restaurantEmail}>`,
    to: restaurantEmail,
    replyTo: input.email,
    subject: `Nuevo mensaje de contacto de ${input.name}`,
    text,
    html,
  });
}
