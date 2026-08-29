export type YearMonth = {
  year: number;
  month: number;
};

export type AvailabilityPayload = {
  unitId: string;
  fullyBooked: boolean;
  booked: Record<string, number[]>;
  first: YearMonth;
  last: YearMonth;
};
