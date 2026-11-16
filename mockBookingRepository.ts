import type {
  AvailabilityQuery,
  BookableUnit,
  BookingConfirmation,
  BookingDetails,
  BookingRepository,
} from "./types";

export const units: BookableUnit[] = [
  ...Array.from({ length: 4 }, (_, index) => ({
    id: `pod-${index + 1}`,
    name: `Study Pod ${index + 1}`,
    type: "pod" as const,
    description:
      index % 2 === 0 ? "Window-side, ergonomic desk" : "Interior, extra sound insulation",
    hourlyRate: 12,
  })),
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `sleep-${index + 1}`,
    name: `Sleep Box ${index + 1}`,
    type: "sleep-box" as const,
    description: index < 4 ? "Upper level, soft ambient light" : "Lower level, easy access",
    hourlyRate: 16,
  })),
];

const wait = (ms: number) => new Promise((resolve) => globalThis.setTimeout(resolve, ms));

export function calculateBookingTotal(
  unit: BookableUnit | null,
  type: AvailabilityQuery["type"],
  duration: number,
) {
  const hourlyRate = unit?.hourlyRate ?? (type === "pod" ? 12 : 16);
  return hourlyRate * duration;
}

export class MockBookingRepository implements BookingRepository {
  async checkAvailability(query: AvailabilityQuery) {
    await wait(700);
    const matching = units.filter((unit) => unit.type === query.type);
    const seed =
      Number(query.date.replaceAll("-", "")) + Number(query.time.slice(0, 2)) + query.duration;
    return matching.filter((_, index) => (seed + index) % 4 !== 0);
  }

  async createBooking(details: BookingDetails): Promise<BookingConfirmation> {
    await wait(850);
    const unit = units.find((item) => item.id === details.unitId);
    if (!unit) throw new Error("That space is no longer available.");
    return {
      reference: `MA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      unitName: unit.name,
      date: details.date,
      time: details.time,
      duration: details.duration,
      total: details.total,
    };
  }
}

// Swap this one export for a Supabase implementation later. The UI will not need to change.
export const bookingRepository: BookingRepository = new MockBookingRepository();
