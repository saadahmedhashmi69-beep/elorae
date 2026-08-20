export interface BundleOption {
  /** Number of devices in this tier (1–6). Doubles as the tier's identity. */
  units: number;
  label: string;
  badge?: string;
  totalPrice: number;
  /** units × single-unit price — used to show "save AED X", never fabricated. */
  compareAtTotal: number;
  recommended?: boolean;
}

export interface CartLine {
  id: string;
  units: number;
  label: string;
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
