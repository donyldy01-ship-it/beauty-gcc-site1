import { NextResponse } from 'next/server';
export const runtime = 'edge';
export async function POST(req: Request) {
  try {
    const { amount, currency = 'SAR', customer, items, lang = 'en' } = await req.json();
    if (!amount || !items?.length) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const resp = await fetch('https://api.tap.company/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.TAP_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        threeDSecure: true,
        description: 'Beauty of Joseon order',
        receipt: { email: true, sms: true },
        customer: {
          first_name: customer?.name || 'Guest',
          email: customer?.email || 'guest@example.com',
          phone: { country_code: '+966', number: (customer?.phone || '').replace(/[^0-9]/g, '') }
        },
        source: { id: 'src_all' },
        redirect: { url: (process.env.NEXT_PUBLIC_BASE_URL || '') + '/thank-you' },
        metadata: { lang, items }
      })
    });
    const data = await resp.json();
    if (!resp.ok) return NextResponse.json({ error: data?.message || 'Tap error' }, { status: 500 });
    return NextResponse.json({ redirectUrl: data?.redirect?.url || data?.transaction?.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
