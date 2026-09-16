import { blobIsConfigured, savePurchase } from '@/lib/blob-store';
import { ASSESSMENT_PRICE_CENTS, PRODUCT_NAME } from '@/lib/product';

export const runtime = 'nodejs';

type JsonObject = Record<string, unknown>;

function objectAt(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return '';
}

export async function POST(request: Request) {
  const secret = process.env.IVOREY_WEBHOOK_SECRET;
  if (!secret || request.headers.get('x-ivorey-secret') !== secret) {
    return Response.json({ error: 'Unauthorized webhook.' }, { status: 401 });
  }
  if (!blobIsConfigured()) return Response.json({ error: 'Vercel Blob is not configured.' }, { status: 503 });

  const body = objectAt(await request.json());
  const contact = objectAt(body.contact);
  const payment = objectAt(body.payment);
  const order = objectAt(body.order);
  const custom = objectAt(body.customData ?? body.custom_data);

  // Ivorey/HighLevel may send standard contact fields at the root, inside
  // `contact`, or inside Custom Data. Accept each documented/common shape.
  const email = firstString(body.email, body.contactEmail, body.contact_email, contact.email, custom.email).toLowerCase().slice(0, 254);
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: 'A valid purchaser email is required.' }, { status: 400 });
  }
  const contactId = firstString(body.contactId, body.contact_id, contact.id, custom.contactId, custom.contact_id);
  const orderId = firstString(
    body.orderId, body.order_id, body.transactionId, body.transaction_id,
    body.paymentId, body.payment_id, order.id, payment.id,
    custom.orderId, custom.order_id, contactId,
  ) || `ivorey-${crypto.randomUUID()}`;
  const firstName = firstString(body.firstName, body.first_name, contact.firstName, contact.first_name, custom.firstName, custom.first_name) || 'Customer';
  const productName = firstString(body.productName, body.product_name, order.productName, order.product_name, custom.productName, custom.product_name) || PRODUCT_NAME;
  const rawAmount = firstString(body.amountCents, body.amount_cents, payment.amountCents, payment.amount_cents, custom.amountCents, custom.amount_cents);
  const amount = Number(rawAmount || ASSESSMENT_PRICE_CENTS);

  await savePurchase({
    id: crypto.randomUUID(),
    orderId,
    firstName: firstName.slice(0, 80),
    email,
    ivoreyContactId: contactId || null,
    productName: productName.slice(0, 160),
    amountCents: Number.isFinite(amount) ? amount : ASSESSMENT_PRICE_CENTS,
    status: 'paid',
    createdAt: new Date().toISOString(),
  });

  return Response.json({ received: true, email, orderId }, { status: 201 });
}
