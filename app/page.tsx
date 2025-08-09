\
"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Globe, Languages, ShoppingBag, Star, Truck, BadgeCheck, Sparkles, Phone, CreditCard } from "lucide-react";

// Layout helper
const sectionCls = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

// Copy (EN/AR)
const copy = {
  en: {
    brand: "Beauty of Joseon",
    nav: { products: "Products", benefits: "Why Us", halal: "Halal & Safety", shipping: "GCC Shipping", contact: "Contact", checkout: "Checkout" },
    hero: {
      title: "Luxury K‑Beauty for the Gulf",
      subtitle: "Premium, heat‑tested, halal‑conscious formulas — shipped from Korea to the GCC in about 1 week.",
      ctaPrimary: "Shop Bestsellers",
      ctaSecondary: "Wholesale / B2B",
    },
    usps: [
      { title: "SFDA‑ready labels", desc: "Arabic/English packaging with INCI, batch, and expiry." },
      { title: "Halal‑conscious", desc: "No pork‑derived ingredients. Alcohol‑free options available." },
      { title: "Heat‑stability tested", desc: "Tested at 45°C chambers for 7–14 days." },
      { title: "WhatsApp service", desc: "Direct Arabic/Korean/English support." },
    ],
    productsTitle: "Bestsellers",
    currencyNote: "Prices shown in SAR • AED available at checkout",
    addToCart: "Add to Cart",
    halalBlock: {
      title: "Halal & Safety",
      bullets: [
        "No pork-/animal-derived collagen or gelatin",
        "Ethanol-free or <0.1% denatured options",
        "MSDS & COA available upon request",
        "Cruelty-free development",
      ],
      note: "* Formal halal certification available per SKU on request.",
    },
    shipping: {
      title: "GCC Shipping — about 1 week",
      items: [
        { k: "KSA", v: "≈ 7 days" },
        { k: "UAE", v: "≈ 7 days" },
        { k: "Kuwait", v: "≈ 7 days" },
        { k: "Qatar / Bahrain / Oman", v: "≈ 7 days" },
      ],
      cod: "Policy: No refunds. Standard delivery ≈ 7 days",
    },
    testimonials: {
      title: "Loved by Gulf customers",
      list: [
        { name: "Fatimah — Riyadh", text: "Light texture even in August heat. No irritation, mashallah!" },
        { name: "Aisha — Dubai", text: "Arabic packaging. Customs clearance was smooth." },
      ],
    },
    newsletter: { title: "Get 10% off your first order", placeholder: "Enter your email", cta: "Subscribe" },
    footer: {
      wholesale: "Wholesale & Distribution",
      rights: "© " + new Date().getFullYear() + " Beauty of Joseon. All rights reserved.",
      links: ["Privacy", "Terms", "No Refund Policy"],
      address: "Seoul, Republic of Korea",
    },
    b2b: { placeholder: "Your WhatsApp (e.g., +966 5X XXX XXXX)", send: "Request Catalog" },
    whatsapp: "WhatsApp: +966-1111-1111",
    checkout: {
      title: "Checkout",
      note: "Tap secure checkout. No refunds. Delivery ≈ 7 days.",
      namePh: "Full name",
      emailPh: "Email",
      phonePh: "Phone (e.g., +9665...)",
      payTap: "Pay with Tap",
      or: "or",
      cod: "Cash on Delivery (KSA / UAE)",
      placeCod: "Place COD Order",
      empty: "Your cart is empty. Add products above.",
      currency: "Currency",
    }
  },
  ar: {
    brand: "جمال جوصون",
    nav: { products: "المنتجات", benefits: "لماذا نحن", halal: "حلال والسلامة", shipping: "الشحن للخليج", contact: "تواصل", checkout: "الدفع" },
    hero: {
      title: "كي‑بيوتي فاخرة للخليج",
      subtitle: "تركيبات مميزة وواعية بالحلال ومختبرة للحرارة — شحن خلال حوالي أسبوع إلى دول الخليج.",
      ctaPrimary: "تسوّق الأكثر مبيعًا",
      ctaSecondary: "جملة / أعمال",
    },
    usps: [
      { title: "ملصقات متوافقة مع SFDA", desc: "تعبئة بالعربية والإنجليزية مع INCI والدفعة وتاريخ الانتهاء." },
      { title: "واعي بالحلال", desc: "خالية من مشتقات الخنزير. خيارات بلا كحول." },
      { title: "تحمُّل للحرارة", desc: "اختبار 45° م لمدة 7–14 يومًا." },
      { title: "خدمة واتساب", desc: "دعم مباشر بالعربية والكورية والإنجليزية." },
    ],
    productsTitle: "الأكثر مبيعًا",
    currencyNote: "الأسعار بالريال السعودي • الدرهم عند الدفع",
    addToCart: "أضِف إلى السلة",
    halalBlock: {
      title: "الحلال والسلامة",
      bullets: [
        "خالية من الكولاجين أو الجيلاتين الحيواني/الخنزيري",
        "بلا إيثانول أو أقل من ‎0.1%‎ (مُحوَّه)",
        "MSDS و COA متوفّرة عند الطلب",
        "خالية من التجارب على الحيوانات",
      ],
      note: "* شهادة حلال رسمية متوفّرة لبعض المنتجات عند الطلب.",
    },
    shipping: {
      title: "شحن للخليج — حوالي أسبوع",
      items: [
        { k: "السعودية", v: "حوالي 7 أيام" },
        { k: "الإمارات", v: "حوالي 7 أيام" },
        { k: "الكويت", v: "حوالي 7 أيام" },
        { k: "قطر / البحرين / عُمان", v: "حوالي 7 أيام" },
      ],
      cod: "السياسة: لا يوجد استرجاع. مدة التوصيل القياسية ≈ 7 أيام",
    },
    testimonials: {
      title: "محبوب لدى عملاء الخليج",
      list: [
        { name: "فاطمة — الرياض", text: "قوام خفيف حتى في حر أغسطس — بلا تهيّج!" },
        { name: "عائشة — دبي", text: "التغليف بالعربية. التخليص الجمركي كان سلسًا." },
      ],
    },
    newsletter: { title: "خصم 10% لأول طلب", placeholder: "أدخل بريدك الإلكتروني", cta: "اشترك" },
    footer: {
      wholesale: "الجملة والتوزيع",
      rights: "© " + new Date().getFullYear() + " جمال جوصون. جميع الحقوق محفوظة.",
      links: ["الخصوصية", "الشروط", "لا يوجد استرجاع"],
      address: "سيول، كوريا الجنوبية",
    },
    b2b: { placeholder: "رقم واتساب (مثال +966 5X XXX XXXX)", send: "أرسل طلب الكتالوج" },
    whatsapp: "واتساب: +966-1111-1111",
    checkout: {
      title: "الدفع",
      note: "دفع آمن عبر Tap. لا يوجد استرجاع. التوصيل ≈ 7 أيام.",
      namePh: "الاسم الكامل",
      emailPh: "البريد الإلكتروني",
      phonePh: "الهاتف (مثال +9665...)",
      payTap: "ادفع عبر Tap",
      or: "أو",
      cod: "الدفع عند الاستلام (السعودية/الإمارات)",
      placeCod: "تأكيد طلب الدفع عند الاستلام",
      empty: "سلتك فارغة. أضِف منتجات أولًا.",
      currency: "العملة",
    }
  }
} as const;

// Products (per your pricing, base in SAR)
const baseProducts = [
  { id: 1, name: { en: "Ampoule", ar: "أمبول" }, priceSar: 100, img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, name: { en: "Mask Pack", ar: "قناع ورقي" }, priceSar: 50, img: "https://images.unsplash.com/photo-1585386959984-a41552231656?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, name: { en: "Sunscreen SPF50+", ar: "واقي شمس SPF50+" }, priceSar: 300, img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop" },
];

export default function Landing() {
  const [lang, setLang] = useState<'en' | 'ar'>("ar");
  const [currency, setCurrency] = useState<'SAR' | 'AED'>("SAR");
  const [cart, setCart] = useState<typeof baseProducts>([]);
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });
  const [cod, setCod] = useState(false);

  const t = copy[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const align = lang === "ar" ? "text-right" : "text-left";
  const isAr = lang === 'ar';

  // Simple static FX (approx). For production, fetch rate server-side.
  const fx = currency === 'AED' ? 0.98 : 1; // 1 SAR ≈ 0.98 AED
  const priceFmt = useMemo(() => new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-SA"), [lang]);
  const products = baseProducts.map(p => ({...p, displayPrice: Math.round(p.priceSar * fx)}));
  const totalBase = cart.reduce((sum, p) => sum + p.priceSar, 0);
  const totalDisplay = Math.round(totalBase * fx);

  async function handleCheckoutTap() {
    try {
      const res = await fetch('/api/create-tap-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalDisplay,
          currency,
          customer: buyer,
          items: cart.map(p => ({ name: p.name[lang], amount: Math.round(p.priceSar * fx), quantity: 1 })),
          lang,
        })
      });
      const data = await res.json();
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert('Checkout init failed');
      }
    } catch (e) {
      alert('Network error during checkout');
    }
  }

  function handlePlaceCOD() {
    alert((isAr ? 'تم إنشاء طلب الدفع عند الاستلام. سنتواصل عبر واتساب.' : 'COD order created. We will contact you on WhatsApp.') + `\\nTotal: ${priceFmt.format(totalDisplay)} ${currency}`);
    setCart([]);
  }

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-amber-100">
        <div className={`${sectionCls} flex items-center justify-between py-3`}>
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <Image src="/logo.png" alt="Beauty of Joseon" width={160} height={48} />
            <Badge className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 ml-2">GCC</Badge>
          </div>
          <nav className={`hidden md:flex items-center gap-6 ${align}`}>
            <a href="#products" className="hover:text-amber-700">{t.nav.products}</a>
            <a href="#benefits" className="hover:text-amber-700">{t.nav.benefits}</a>
            <a href="#halal" className="hover:text-amber-700">{t.nav.halal}</a>
            <a href="#shipping" className="hover:text-amber-700">{t.nav.shipping}</a>
            <a href="#contact" className="hover:text-amber-700">{t.nav.contact}</a>
            <a href="#checkout" className="hover:text-amber-700">{t.nav.checkout}</a>
          </nav>
          <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            <Button variant="outline" onClick={() => setLang(isAr ? 'en' : 'ar')} className="gap-2 border-amber-300">
              <Languages className="h-4 w-4" /> {isAr ? "EN" : "AR"}
            </Button>
            <div className="flex items-center gap-2">
              <select value={currency} onChange={(e) => setCurrency(e.target.value as any)} className="border rounded-xl px-2 py-1 text-sm border-amber-300 bg-white">
                <option value="SAR">SAR</option>
                <option value="AED">AED</option>
              </select>
            </div>
            <Button onClick={() => document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth' })} className="gap-2 bg-amber-600 hover:bg-amber-700 border border-amber-700 shadow-sm">
              <ShoppingBag className="h-4 w-4" /> {cart.length}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={`${sectionCls} grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-20`}>
        <div className={`${align}`}>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg text-stone-600">{t.hero.subtitle}</p>
          <div className={`mt-6 flex ${isAr ? 'flex-row-reverse' : ''} gap-3`}>
            <Button size="lg" className="rounded-2xl px-6 bg-amber-600 hover:bg-amber-700 border border-amber-700">{t.hero.ctaPrimary}</Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-6 border-amber-300">{t.hero.ctaSecondary}</Button>
          </div>
          <p className="mt-3 text-sm text-stone-500 flex items-center gap-2"><Globe className="h-4 w-4" /> {t.currencyNote}</p>
          <div className={`mt-6 flex flex-wrap ${isAr ? 'justify-end' : 'justify-start'} gap-2`}>
            <Badge className="rounded-full bg-white border-amber-300 text-stone-700"><BadgeCheck className="h-3 w-3 mr-1 inline"/> SFDA‑ready</Badge>
            <Badge className="rounded-full bg-white border-amber-300 text-stone-700">Halal‑conscious</Badge>
            <Badge className="rounded-full bg-white border-amber-300 text-stone-700">Cruelty‑free</Badge>
            <Badge className="rounded-full bg-white border-amber-300 text-stone-700">Derm‑tested</Badge>
          </div>
          <div className={`mt-4 flex ${isAr ? 'flex-row-reverse' : ''} items-center gap-2 text-amber-800`}>
            <Phone className="h-4 w-4"/>
            <span className="font-medium">{t.whatsapp}</span>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1600&auto=format&fit=crop" alt="Hero" className="rounded-3xl shadow-2xl ring-1 ring-amber-200 w-full h-[420px] object-cover" />
          <div className="absolute -bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <img key={i} src={`https://images.unsplash.com/photo-1556228453-efd1e3f0c66b?q=80&w=800&auto=format&fit=crop`} className="rounded-2xl shadow-lg ring-1 ring-amber-200 h-28 object-cover" />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-12">
        <div className={`${sectionCls}`}>
          <div className={`grid md:grid-cols-4 gap-4 ${align}`}>
            {t.usps.map((u, idx) => (
              <Card key={idx} className="rounded-2xl border-amber-100">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><Star className="h-5 w-5 text-amber-600" /> {u.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-stone-600">{u.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-6">
        <div className={`${sectionCls} ${align}`}>
          <h2 className="text-2xl font-bold mb-4">{t.productsTitle}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <Card key={p.id} className="rounded-2xl overflow-hidden border-amber-100">
                <img src={p.img} alt="product" className="h-48 w-full object-cover" />
                <CardHeader>
                  <CardTitle className="text-base">{p.name[lang]}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="font-semibold">{priceFmt.format(p.displayPrice)} {currency}</div>
                  <Button size="sm" onClick={() => setCart(prev => [...prev, p])} className="rounded-xl bg-amber-600 hover:bg-amber-700 border border-amber-700">{t.addToCart}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Halal & Safety */}
      <section id="halal" className="py-12">
        <div className={`${sectionCls} grid md:grid-cols-2 gap-8 items-start`}>
          <div className={`${align}`}>
            <h3 className="text-2xl font-bold mb-4">{t.halalBlock.title}</h3>
            <ul className="space-y-3">
              {t.halalBlock.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5 text-amber-600"/> <span className="text-stone-700">{b}</span></li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-stone-500">{t.halalBlock.note}</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1611930021780-d9e8d9a1f4b7?q=80&w=1600&auto=format&fit=crop" alt="lab" className="rounded-3xl shadow-xl ring-1 ring-amber-200 w-full h-[360px] object-cover" />
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section id="shipping" className="py-12 bg-white">
        <div className={`${sectionCls} ${align}`}>
          <h3 className="text-2xl font-bold mb-6">{t.shipping.title}</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {t.shipping.items.map((it, i) => (
              <Card key={i} className="rounded-2xl border-amber-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-amber-600"/> {it.k}</CardTitle>
                </CardHeader>
                <CardContent className="text-stone-600">{it.v}</CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-600 flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-amber-600"/> {t.shipping.cod}</p>
        </div>
      </section>

      {/* Checkout (Tap) */}
      <section id="checkout" className="py-16">
        <div className={`${sectionCls} grid lg:grid-cols-2 gap-8 items-start`}>
          <Card className="rounded-3xl border-amber-100">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><CreditCard className="h-5 w-5 text-amber-600"/> {t.checkout.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-stone-600">{t.checkout.empty}</p>
              ) : (
                <div className={`${align}`}>
                  <ul className="space-y-2 mb-4">
                    {cart.map((p, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span>{p.name[lang]}</span>
                        <span>{priceFmt.format(Math.round(p.priceSar * fx))} {currency}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between font-semibold text-lg border-t pt-3">
                    <span>{isAr ? 'الإجمالي' : 'Total'}</span>
                    <span>{priceFmt.format(totalDisplay)} {currency}</span>
                  </div>

                  <p className="mt-3 text-xs text-stone-500">{t.checkout.note}</p>

                  <div className={`mt-4 grid grid-cols-1 gap-2 ${isAr ? 'text-right' : 'text-left'}`}>
                    <Input value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} placeholder={t.checkout.namePh} className="rounded-2xl" />
                    <Input value={buyer.email} onChange={e => setBuyer({ ...buyer, email: e.target.value })} placeholder={t.checkout.emailPh} className="rounded-2xl" />
                    <Input value={buyer.phone} onChange={e => setBuyer({ ...buyer, phone: e.target.value })} placeholder={t.checkout.phonePh} className="rounded-2xl" />
                  </div>

                  <div className={`mt-3 flex items-center gap-2 ${isAr ? 'justify-end' : ''}`}>
                    <input id="cod" type="checkbox" checked={cod} onChange={e => setCod(e.target.checked)} />
                    <label htmlFor="cod" className="text-sm">{t.checkout.cod}</label>
                  </div>

                  {!cod ? (
                    <Button onClick={handleCheckoutTap} className="mt-4 rounded-2xl w-full bg-amber-600 hover:bg-amber-700 border border-amber-700">
                      {t.checkout.payTap}
                    </Button>
                  ) : (
                    <Button onClick={handlePlaceCOD} className="mt-4 rounded-2xl w-full bg-stone-900 hover:bg-stone-800">
                      {t.checkout.placeCod}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className={`${sectionCls} ${align}`}>
          <h3 className="text-2xl font-bold mb-4">{t.testimonials.title}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {t.testimonials.list.map((r, i) => (
              <Card key={i} className="rounded-2xl border-amber-100">
                <CardContent className="pt-6">
                  <p className="leading-relaxed text-stone-800">“{r.text}”</p>
                  <div className="mt-3 text-sm text-stone-500">{r.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Contact */}
      <section id="contact" className="py-12">
        <div className={`${sectionCls} grid lg:grid-cols-2 gap-8 items-center`}>
          <Card className="rounded-3xl border-amber-100">
            <CardHeader>
              <CardTitle className="text-xl">{t.newsletter.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex ${isAr ? 'flex-row-reverse' : ''} gap-2`}>
                <Input type="email" placeholder={t.newsletter.placeholder} className="rounded-2xl" />
                <Button className="rounded-2xl bg-amber-600 hover:bg-amber-700 border border-amber-700">{t.newsletter.cta}</Button>
              </div>
              <p className="mt-2 text-xs text-stone-500">We never spam. Unsubscribe anytime.</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-amber-100">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-amber-600"/> WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-stone-600 mb-3">{t.whatsapp}</p>
              <div className={`flex ${isAr ? 'flex-row-reverse' : ''} gap-2`}>
                <Input placeholder={t.b2b.placeholder} className="rounded-2xl" />
                <Button className="rounded-2xl bg-amber-600 hover:bg-amber-700 border border-amber-700">{t.b2b.send}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 bg-white/70">
        <div className={`${sectionCls} grid md:grid-cols-4 gap-6 items-start`}>
          <div className={`${align}`}>
            <div className="font-semibold text-lg">Beauty of Joseon</div>
            <p className="text-sm text-stone-600 mt-2">Seoul, Republic of Korea</p>
          </div>
          <div className={`${align}`}>
            <div className="font-semibold">Wholesale & Distribution</div>
            <ul className="text-sm text-stone-600 mt-2 space-y-1">
              <li>KSA • UAE • KW • QA • BH • OM</li>
              <li>INCI/Arabic labels • COA • MSDS</li>
              <li>Private Label / OEM</li>
            </ul>
          </div>
          <div className={`${align}`}>
            <div className="font-semibold">Social</div>
            <ul className="text-sm text-stone-600 mt-2 space-y-1">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Snapchat</li>
            </ul>
          </div>
          <div className={`${align}`}>
            <div className="font-semibold">{isAr ? 'روابط' : 'Links'}</div>
            <ul className="text-sm text-stone-600 mt-2 space-y-1">
              <li><a href="/privacy" className="hover:text-amber-700 underline-offset-4 hover:underline">{isAr ? 'الخصوصية' : 'Privacy'}</a></li>
              <li><a href="/terms" className="hover:text-amber-700 underline-offset-4 hover:underline">{isAr ? 'الشروط' : 'Terms'}</a></li>
              <li><a href="/no-refund" className="hover:text-amber-700 underline-offset-4 hover:underline">{isAr ? 'لا يوجد استرجاع' : 'No Refund Policy'}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-stone-500">© {new Date().getFullYear()} Beauty of Joseon. All rights reserved.</div>
      </footer>
    </div>
  );
}
