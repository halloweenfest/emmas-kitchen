// Checks a Holly Haunt unlock payment with Razorpay before the games open nights 2-3 and the paid rooms.
// GET /api/hollyhaunt/verify?id=pay_XXXX  ->  { paid: true|false, reason? }
//
// Cloudflare Pages environment variables (Settings -> Variables and Secrets, Production):
//   RAZORPAY_KEY_ID      (required) live key id, rzp_live_...
//   RAZORPAY_KEY_SECRET  (required, set as a Secret) live key secret
//   UNLOCK_MIN_AMOUNT    (optional) smallest accepted amount in the currency's subunit, e.g. 100 = $1.00 or ₹1.00
//   UNLOCK_CURRENCY      (optional) e.g. USD or INR

const ALLOWED_ORIGINS = [
  "https://halloweenfest.github.io",
  "http://localhost:8811",
  "http://localhost:8813",
  "http://localhost:8815",
  "http://localhost:8816",
];

function cors(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Vary": "Origin",
  };
}

function reply(request, status, body, cacheSeconds) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": cacheSeconds ? `private, max-age=${cacheSeconds}` : "no-store",
      ...cors(request),
    },
  });
}

export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: { ...cors(request), "Access-Control-Max-Age": "86400" } });
}

export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!/^pay_[A-Za-z0-9]{8,32}$/.test(id)) return reply(request, 400, { paid: false, reason: "bad_id" });
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    return reply(request, 503, { paid: false, reason: "not_configured" });
  }

  let res;
  try {
    res = await fetch(`https://api.razorpay.com/v1/payments/${id}`, {
      headers: { Authorization: "Basic " + btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`) },
    });
  } catch (e) {
    return reply(request, 502, { paid: false, reason: "razorpay_unreachable" });
  }
  if (res.status === 400 || res.status === 404) return reply(request, 200, { paid: false, reason: "unknown_payment" }, 60);
  if (!res.ok) return reply(request, 502, { paid: false, reason: "razorpay_error" });

  const p = await res.json();
  if (p.status !== "captured" || p.refund_status) return reply(request, 200, { paid: false, reason: "not_captured" }, 60);
  if (env.UNLOCK_CURRENCY && p.currency !== env.UNLOCK_CURRENCY) return reply(request, 200, { paid: false, reason: "wrong_currency" }, 300);
  if (env.UNLOCK_MIN_AMOUNT && Number(p.amount) < Number(env.UNLOCK_MIN_AMOUNT)) return reply(request, 200, { paid: false, reason: "low_amount" }, 300);

  return reply(request, 200, { paid: true }, 600);
}
