import { describe, expect, it } from "vitest";
import { calculateBookingTotal, MockBookingRepository, units } from "./mockBookingRepository";

describe("mock booking repository", () => {
  it("provides the promised inventory of four pods and eight sleep boxes", () => {
    expect(units.filter((unit) => unit.type === "pod")).toHaveLength(4);
    expect(units.filter((unit) => unit.type === "sleep-box")).toHaveLength(8);
  });

  it("calculates totals using the rate for each space type", () => {
    expect(calculateBookingTotal(null, "pod", 3)).toBe(36);
    expect(calculateBookingTotal(null, "sleep-box", 4)).toBe(64);
    expect(calculateBookingTotal(units[0], "pod", 2)).toBe(24);
  });

  it("returns only matching available units", async () => {
    const repository = new MockBookingRepository();
    const available = await repository.checkAvailability({
      type: "pod",
      date: "2026-07-10",
      time: "10:00",
      duration: 2,
    });

    expect(available.length).toBeGreaterThan(0);
    expect(available.length).toBeLessThanOrEqual(4);
    expect(available.every((unit) => unit.type === "pod")).toBe(true);
  });

  it("creates a complete confirmation for a selected unit", async () => {
    const repository = new MockBookingRepository();
    const confirmation = await repository.createBooking({
      type: "pod",
      date: "2026-07-10",
      time: "10:00",
      duration: 2,
      unitId: "pod-1",
      guestName: "Aiko Mori",
      guestEmail: "aiko@example.com",
      total: 24,
    });

    expect(confirmation.unitName).toBe("Study Pod 1");
    expect(confirmation.total).toBe(24);
    expect(confirmation.reference).toMatch(/^MA-[A-Z0-9]{6}$/);
  });
});
