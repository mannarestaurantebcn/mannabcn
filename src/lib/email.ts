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
