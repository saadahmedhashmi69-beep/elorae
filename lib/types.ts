export type BundleId = "single" | "duo" | "trio";

export interface BundleOption {
  id: BundleId;
  units: number;
  label: string;
  badge?: string;
  unitPrice: number;
  totalPrice: number;
  compareAtTotal: number;
}

export interface CartLine {
  id: string;
  bundleId: BundleId;
  label: string;
  units: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export type Emirate =
  | "Dubai"
  | "Abu Dhabi"
  | "Sharjah"
  | "Ajman"
  | "Ras Al Khaimah"
  | "Fujairah"
  | "Umm Al Quwain";

export type PaymentMethod = "cod" | "online";

export interface CheckoutFormValues {
  fullName: string;
  mobile: string;
  emirate: Emirate | "";
  city: string;
  address: string;
  apartment: string;
  deliveryNotes: string;
  paymentMethod: PaymentMethod;
}

export interface OrderPayload extends CheckoutFormValues {
  items: CartLine[];
  subtotal: number;
  shippingFee: number;
  codFee: number;
  total: number;
  utm: Record<string, string>;
}
