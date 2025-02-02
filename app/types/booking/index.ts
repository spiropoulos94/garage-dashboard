interface Service {
  uuid: string;
  name: string;
}
export type BookingStatusType =
  | "pending"
  | "awaiting verification"
  | "in moderation"
  | "approved"
  | "declined"
  | "accepted"
  | "rejected"
  | "price negotiation by garage"
  | "accepted by user"
  | "rejected by user"
  | "awaiting garage response (>24h)"
  | "clarification required"
  | "appointment in clarification"
  | "proposed new appointment date"
  | "awaiting customer response (>6h)"
  | "booked"
  | "billed"
  | "not billable"
  | "cancelled"
  | "live booking error"
  | "awaiting external approval";

export type PaymentType = "ESTIMATE" | "PAID" | "VIA_PARTNER";

export type Currency = "EUR" | "USD";

interface Payment {
  amount: number;
  type: PaymentType;
  currency: Currency;
}

interface Partner {
  uuid: string;
  name: string;
  slug: string;
  logo?: {
    url: string;
  };
}
type Condition = "NEW";
export interface Part {
  itemId: string;
  title: string;
  condition: Condition;
  itemWebUrl: string;
  description: string;
}

interface PartsDelivery {
  partsWillBeDelivered: boolean;
  partsWillBeProvided: boolean;
  evtn?: string;
  additionalParts: {
    [key: string]: Part;
  };
  tracking?: Tracking;
  estimatedDeliveryDate?: EstimatedDeliveryDate | null;
}

interface Tracking {
  trackingNumber: string;
  carrierName: string;
}

interface DateRange {
  from: string;
  to: string;
}

interface EstimatedDeliveryDate {
  original?: DateRange;
  current?: DateRange;
}

export interface Customer {
  email: string;
  salutation?: string;
  firstName: string;
  lastName: string;
  phone: string;
  street?: string;
  postcode?: string;
  city?: string;
  addition?: string;
}

export interface Vehicle {
  numberPlate: string;
  fullName: string | null;
  vin: string | null;
  mileage: number | null;
  description?: string;
  initialRegistrationDate: string | null;
  hsnTsn: string | null;
}

export interface PremiumService {
  uuid: string;
  name: string;
}

export type CancelReason =
  | "CUSTOMER_WISH"
  | "CAR_DOES_NOT_MATCH_ORDER"
  | "PART_DOES_NOT_FIT_CAR"
  | "PART_NOT_AS_DESCRIBED"
  | "PART_MISSING"
  | "WORKSHOP_CANNOT_HANDLE_SERVICE"
  | "WORKSHOP_CANNOT_HANDLE_CAR"
  | "WORKSHOP_AT_CAPACITY"
  | "OTHER";

type CancelInitiator = "customer" | "repareo" | "workshop" | "seller";

interface BaseCancelData {
  reason: CancelReason;
  initiator: CancelInitiator;
  cancelledAt: string;
}

interface OtherCancelData extends BaseCancelData {
  reason: "OTHER";
  comment: string;
}

interface NonOtherCancelData extends BaseCancelData {
  reason: Exclude<CancelReason, "OTHER">;
  comment?: string;
}

export type CancelData = OtherCancelData | NonOtherCancelData; // if cancel reason is "OTHER", comment field is required!

type ShippingStatusType = "pending" | "shipped" | "received";

interface Shipping {
  status: ShippingStatusType;
  shippedAt: string;
  receivedAt: string;
}
interface Image {
  url: string;
  description: string;
}
interface Garage {
  uuid: string;
  name: string;
  timeZone: string;
  legalName: string;
  email: string;
  website: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  image: Image;
}
export interface Booking {
  id: number;
  uuid: string;
  status: BookingStatusType;
  garage?: Garage | null;
  service: Service;
  payment?: Payment;
  partner: Partner;
  partsDelivery: PartsDelivery;
  customer: Customer;
  createdAt: string;
  appointmentAt: string;
  vehicle: Vehicle;
  customerMessage: string;
  premiumServices: PremiumService[];
  cancelData?: CancelData;
  garagesNote?: string;
  bookingPinVerifiedAt?: string;
  shipping?: Shipping;
}
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface BookingsResponse {
  current_page: number;
  data: Booking[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
