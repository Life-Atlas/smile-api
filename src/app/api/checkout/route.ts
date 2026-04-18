import Stripe from "stripe";

export const runtime = "nodejs";

type Tier = "pro" | "enterprise" | "consulting";

const PRICES: Record<Tier, number> = {
  pro: 4900,         // EUR 49/mo
  enterprise: 24900, // EUR 249/mo
  consulting: 50000, // EUR 500 one-time
};

const TIER_LABELS: Record<Tier, string> = {
  pro: "SMILE Pro",
  enterprise: "SMILE Enterprise",
  consulting: "SMILE Consulting",
};

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return errorResponse("Stripe is not configured on this deployment.", 503);
  }

  let tier: string;
  try {
    const body = (await request.json()) as { tier?: string };
    tier = body.tier ?? "";
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  if (!["pro", "enterprise", "consulting"].includes(tier)) {
    return errorResponse("Invalid tier. Must be one of: pro, enterprise, consulting.", 400);
  }

  const validTier = tier as Tier;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const stripe = new Stripe(stripeKey);

  const isOneTime = validTier === "consulting";

  const session = await stripe.checkout.sessions.create({
    mode: isOneTime ? "payment" : "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: TIER_LABELS[validTier] },
          unit_amount: PRICES[validTier],
          ...(isOneTime ? {} : { recurring: { interval: "month" } }),
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/analyze?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
  });

  return Response.json({ url: session.url });
}
