import { NextResponse } from "next/server";
import { generateOrderRef, isValidUaeMobile } from "@/lib/utils";
import type { OrderPayload } from "@/lib/types";

/**
 * Order intake endpoint. There is no database in this project (see
 * README "Order handling" for why) — a valid order is logged to the
 * Vercel function log and acknowledged with an order reference. The
 * customer-facing confirmation flow hands the same order details to
 * WhatsApp so the brand's WhatsApp number is the live order inbox until
 * a CRM/sheet/database integration is added.
 */
export async function POST(request: Request) {
  let body: Partial<OrderPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.fullName || body.fullName.trim().length < 2) {
    return NextResponse.json({ error: "Full name is required" }, { status: 400 });
  }
  if (!body.mobile || !isValidUaeMobile(body.mobile)) {
    return NextResponse.json({ error: "A valid UAE mobile number is required" }, { status: 400 });
  }
  if (!body.emirate) {
    return NextResponse.json({ error: "Emirate is required" }, { status: 400 });
  }
  if (!body.address || body.address.trim().length < 3) {
    return NextResponse.json({ error: "Delivery address is required" }, { status: 400 });
  }
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const orderRef = generateOrderRef();

  console.log("[ELORAE_ORDER]", JSON.stringify({ orderRef, receivedAt: new Date().toISOString(), ...body }));

  return NextResponse.json({ success: true, orderRef });
}
