/**
 * Restaurant opening hours by day of week. Public holidays ("festivos") use
 * the same hours as Saturday, per the client's own "Sábados y festivos"
 * pricing tier. If a holiday falls on a Sunday, Sunday's hours still apply.
 */
export type DaySchedule = { open: string; close: string };

const WEEKDAY: DaySchedule = { open: "07:00", close: "22:00" };
const SATURDAY: DaySchedule = { open: "09:30", close: "21:00" };
const SUNDAY: DaySchedule = { open: "12:00", close: "17:00" };

/**
 * Official Barcelona public holidays (national + Catalonia + local), from
 * https://ajuntament.barcelona.cat/calendarifestius/es/. Only 2026-2027 are
 * published so far — add future years here once the city council publishes
 * them (usually a few months into the preceding year).
 */
const HOLIDAYS_BARCELONA = new Set<string>([
  // 2026
  "2026-01-01", // Año Nuevo
  "2026-01-06", // Reyes
  "2026-04-03", // Viernes Santo
  "2026-04-06", // Lunes de Pascua Florida
  "2026-05-01", // Fiesta del Trabajo
  "2026-05-25", // Lunes de Pascua Granada (local)
  "2026-06-24", // San Juan
  "2026-08-15", // La Asunción
  "2026-09-11", // Diada Nacional de Cataluña
  "2026-09-24", // Mare de Déu de la Mercè (local)
  "2026-10-12", // Día Nacional de España
  "2026-12-08", // La Inmaculada
  "2026-12-25", // Navidad
  "2026-12-26", // San Esteban
  // 2027
  "2027-01-01", // Año Nuevo
  "2027-01-06", // Reyes
  "2027-03-26", // Viernes Santo
  "2027-03-29", // Lunes de Pascua Florida
  "2027-05-01", // Fiesta del Trabajo
  "2027-05-17", // Lunes de Pascua Granada (local)
  "2027-06-24", // San Juan
  "2027-09-11", // Diada Nacional de Cataluña
  "2027-09-24", // Virgen de la Merced (local)
  "2027-10-12", // Día Nacional de España
  "2027-11-01", // Todos los Santos
  "2027-12-06", // Día de la Constitución
  "2027-12-08", // La Inmaculada
  "2027-12-25", // Navidad
]);

const SLOT_STEP_MINUTES = 30;
/** Leave at least this long before closing so a 2h sitting can be honoured. */
const LAST_SLOT_BUFFER_MINUTES = 60;

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** `date` in YYYY-MM-DD. Parsed as a calendar date (day-of-week is timezone-independent). */
export function getDaySchedule(date: string): DaySchedule {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay(); // 0 = Sunday ... 6 = Saturday
  if (day === 0) return SUNDAY;
  if (day === 6 || HOLIDAYS_BARCELONA.has(date)) return SATURDAY;
  return WEEKDAY;
}

/** Bookable start times for the given date, in 30-minute steps, leaving room before closing. */
export function getTimeSlots(date: string): string[] {
  const { open, close } = getDaySchedule(date);
  const openMinutes = toMinutes(open);
  const lastSlotMinutes = toMinutes(close) - LAST_SLOT_BUFFER_MINUTES;
  const slots: string[] = [];
  for (let m = openMinutes; m <= lastSlotMinutes; m += SLOT_STEP_MINUTES) slots.push(toTime(m));
  return slots;
}

export function isTimeSlotValid(date: string, time: string): boolean {
  return getTimeSlots(date).includes(time);
}
