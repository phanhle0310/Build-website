export type SpaceType = "pod" | "sleep-box";

export interface BookableUnit {
  id: string;
  name: string;
  type: SpaceType;
  description: string;
  hourlyRate: number;
}

export interface AvailabilityQuery {
  date: string;
  time: string;
  duration: number;
  type: SpaceType;
}

export interface BookingDetails extends AvailabilityQuery {
  unitId: string;
  guestName: string;
  guestEmail: string;
  total: number;
}

export interface BookingConfirmation {
  reference: string;
  unitName: string;
  date: string;
  time: string;
  duration: number;
  total: number;
}

export interface BookingRepository {
  checkAvailability(query: AvailabilityQuery): Promise<BookableUnit[]>;
  createBooking(details: BookingDetails): Promise<BookingConfirmation>;
}
