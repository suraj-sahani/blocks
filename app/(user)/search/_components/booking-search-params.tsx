import {
  createLoader,
  parseAsBoolean,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

const spotTypes = ["all", "parking", "ev"] as const;
const vehicleTypes = ["sedan", "suv", "truck", "motorcycle", "ev"] as const;

export const bookingSearchParams = {
  address: parseAsString.withDefault(""),
  showMap: parseAsBoolean.withDefault(true),
  spotType: parseAsStringLiteral(spotTypes).withDefault("all"),
  checkIn: parseAsIsoDateTime.withDefault(new Date()),
  checkOut: parseAsIsoDateTime.withDefault(new Date()),
  vehicleType: parseAsStringLiteral(vehicleTypes).withDefault("sedan"),
};

export const loadBookingSearchParams = createLoader(bookingSearchParams);
