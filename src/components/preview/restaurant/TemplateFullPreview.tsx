'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface PreviewTemplate {
  id: string;
  name: string;
  desc: string;
  category: string;
  recommendedTheme: string;
  imageUrl: string;
}

interface Props {
  template: PreviewTemplate;
  onClose: () => void;
  onUseTemplate: () => void;
}

type ViewMode = 'landing' | 'login' | 'dashboard';

/* ------------------------------------------------------------------ */
/*  Theme + demo data                                                  */
/* ------------------------------------------------------------------ */

const THEME_HEX: Record<string, string> = {
  'gold-luxury': '#c5a880',
  'crimson-blaze': '#b91c1c',
  'tangerine-peel': '#f97316',
  'forest-herbs': '#047857',
  'terracotta-clay': '#c2410c',
  'chocolate-truffle': '#7c2d12',
  'velvet-plum': '#7c3aed',
  'sunset-gold': '#ea580c',
  'matcha-zen': '#84cc16',
  'charcoal-slate': '#64748b',
  'lavender-bliss': '#a78bfa',
  'lemon-zest': '#eab308',
  'peach-blossom': '#fb923c',
  'royal-gold': '#d97706',
  'cyan-breeze': '#06b6d4',
  'amber-spiced': '#d97706',
  'emerald-mint': '#10b981',
};

interface Dish {
  name: string;
  desc: string;
  price: number;
  tag: string;
  img: string;
}

function getDishes(category: string): Dish[] {
  const c = category.toLowerCase();
  const u = (id: string) => `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`;

  if (c.includes('pizza'))
    return [
      { name: 'Margherita Classica', desc: 'San Marzano tomato, fior di latte, fresh basil.', price: 299, tag: 'Bestseller', img: u('photo-1513104890138-7c749659a591') },
      { name: 'Double Pepperoni', desc: 'Spiced pepperoni, aged mozzarella, chilli honey.', price: 399, tag: 'Spicy', img: u('photo-1534308983496-4fabb1a015ee') },
      { name: 'Truffle Funghi', desc: 'Wild mushrooms, truffle cream, parmesan shavings.', price: 449, tag: 'Chef Pick', img: u('photo-1590947132387-155cc02f3212') },
      { name: 'Garlic Cheese Bread', desc: 'Wood-fired baguette, garlic butter, mozzarella.', price: 179, tag: 'Side', img: u('photo-1573140247632-f8fd74997d5c') },
      { name: 'Rigatoni Arrabbiata', desc: 'Slow tomato sugo, chilli, torn basil, pecorino.', price: 349, tag: 'Pasta', img: u('photo-1621996346565-e3dbc646d9a9') },
      { name: 'Tiramisu Classico', desc: 'Espresso-soaked savoiardi, mascarpone, cocoa.', price: 199, tag: 'Dessert', img: u('photo-1571877227200-a0d98ea607e9') },
    ];

  if (c.includes('indian'))
    return [
      { name: 'Butter Chicken Masala', desc: 'Tandoori chicken in silky tomato butter gravy.', price: 349, tag: 'Bestseller', img: u('photo-1603894584373-5ac82b2ae398') },
      { name: 'Paneer Tikka Lababdar', desc: 'Charred cottage cheese, cashew-tomato makhani.', price: 299, tag: 'Veg', img: u('photo-1631452180519-c014fe946bc7') },
      { name: 'Chicken Dum Biryani', desc: 'Sealed handi, aged basmati, saffron, fried onion.', price: 379, tag: 'Signature', img: u('photo-1633945274405-b6c8069047b0') },
      { name: 'Dal Makhani', desc: 'Black lentils simmered overnight with cream.', price: 249, tag: 'Slow Cooked', img: u('photo-1546833999-b9f581a1996d') },
      { name: 'Garlic Butter Naan', desc: 'Clay-oven flatbread, garlic, coriander butter.', price: 69, tag: 'Bread', img: u('photo-1601050690597-df056fb4ce78') },
      { name: 'Rose Kulfi Falooda', desc: 'Cardamom kulfi, rose syrup, vermicelli, nuts.', price: 189, tag: 'Dessert', img: u('photo-1587314168485-3236d6710814') },
    ];

  if (c.includes('fast'))
    return [
      { name: 'Signature Smash Burger', desc: 'Double patty, aged cheddar, house burger sauce.', price: 279, tag: 'Bestseller', img: u('photo-1568901346375-23c9450c58cd') },
      { name: 'Crispy Chicken Stacker', desc: 'Buttermilk fried thigh, slaw, spicy mayo.', price: 259, tag: 'Spicy', img: u('photo-1606755962773-d324e0a13086') },
      { name: 'Loaded Cheese Fries', desc: 'Skin-on fries, molten cheddar, jalapeños.', price: 179, tag: 'Share', img: u('photo-1573080496219-bb080dd4f877') },
      { name: 'Buffalo Wings (8pc)', desc: 'Flame-grilled wings tossed in buffalo glaze.', price: 299, tag: 'Hot', img: u('photo-1608039755401-742074f0548d') },
      { name: 'Crispy Onion Rings', desc: 'Thick-cut rings, beer batter, chipotle dip.', price: 139, tag: 'Side', img: u('photo-1639024471283-2bc7b3c6a267') },
      { name: 'Thick Chocolate Shake', desc: 'Belgian cocoa, vanilla ice cream, whipped top.', price: 189, tag: 'Drink', img: u('photo-1572490122747-3968b75cc699') },
    ];

  if (c.includes('cafe'))
    return [
      { name: 'Espresso Macchiato', desc: 'Single-origin ristretto, dollop of microfoam.', price: 149, tag: 'Classic', img: u('photo-1510972527407-cbd5e77fb736') },
      { name: 'Caramel Latte', desc: 'Double shot, steamed milk, salted caramel.', price: 209, tag: 'Bestseller', img: u('photo-1541167760496-1628856ab772') },
      { name: 'Cold Brew Tonic', desc: '18-hour cold brew, tonic, orange peel.', price: 229, tag: 'Cold', img: u('photo-1461023058943-07fcbe16d735') },
      { name: 'Butter Croissant', desc: 'Laminated 72 hours, French cultured butter.', price: 139, tag: 'Bakery', img: u('photo-1555507036-ab1f4038808a') },
      { name: 'Avocado Sourdough', desc: 'Smashed avocado, chilli flakes, poached egg.', price: 269, tag: 'All Day', img: u('photo-1541532713592-79a0317b6b77') },
      { name: 'Basque Cheesecake', desc: 'Burnt-top cheesecake, vanilla bean, sea salt.', price: 249, tag: 'Dessert', img: u('photo-1524351199678-941a58a3df50') },
    ];

  if (c.includes('bakery'))
    return [
      { name: 'Chocolate Fudge Cake', desc: 'Triple layer sponge, dark ganache, cocoa nib.', price: 379, tag: 'Bestseller', img: u('photo-1578985545062-69928b1d9587') },
      { name: 'Red Velvet Cupcake', desc: 'Buttermilk crumb, cream cheese frosting.', price: 99, tag: 'Popular', img: u('photo-1614707267537-b85acf00c4b8') },
      { name: 'French Macarons (6pc)', desc: 'Raspberry, pistachio, salted caramel shells.', price: 329, tag: 'Gift Box', img: u('photo-1569864358642-9d1684040f43') },
      { name: 'Cinnamon Swirl Bun', desc: 'Soft brioche, cinnamon sugar, vanilla glaze.', price: 149, tag: 'Fresh', img: u('photo-1509365465985-25d11c17e812') },
      { name: 'Artisan Sourdough', desc: 'Naturally leavened, 24-hour cold ferment.', price: 199, tag: 'Loaf', img: u('photo-1585478259715-876acc5be8eb') },
      { name: 'Strawberry Tart', desc: 'Almond frangipane, crème pâtissière, berries.', price: 289, tag: 'Seasonal', img: u('photo-1488477181946-6428a0291777') },
    ];

  if (c.includes('chinese'))
    return [
      { name: 'Steamed Momos (8pc)', desc: 'Hand-pleated wrappers, minced veg, chilli oil.', price: 159, tag: 'Bestseller', img: u('photo-1534422298391-e4f8c172dddb') },
      { name: 'Veg Hakka Noodles', desc: 'Wok-tossed noodles, julienned veg, light soy.', price: 199, tag: 'Wok', img: u('photo-1585032226651-759b368d7246') },
      { name: 'Schezwan Fried Rice', desc: 'Fiery Schezwan paste, scallion, burnt garlic.', price: 209, tag: 'Spicy', img: u('photo-1603133872878-696658804445') },
      { name: 'Kung Pao Chicken', desc: 'Sichuan pepper, roasted peanuts, dried chilli.', price: 329, tag: 'Signature', img: u('photo-1525755662778-989d0524087e') },
      { name: 'Crispy Spring Rolls', desc: 'Golden pastry, seasoned cabbage, sweet chilli.', price: 149, tag: 'Starter', img: u('photo-1544025162-d76694265947') },
      { name: 'Honey Chilli Potato', desc: 'Crisp batons, honey glaze, toasted sesame.', price: 189, tag: 'Share', img: u('photo-1541592106381-b31e9677c0e5') },
    ];

  if (c.includes('vegan'))
    return [
      { name: 'Avocado Quinoa Bowl', desc: 'Organic quinoa, kale, edamame, lemon dressing.', price: 299, tag: 'Bestseller', img: u('photo-1512621776951-a57141f2eefd') },
      { name: 'Falafel Mezze Wrap', desc: 'Crisp falafel, hummus, pickled cucumber, pita.', price: 229, tag: 'Wrap', img: u('photo-1540420773420-3366772f4999') },
      { name: 'Vegan Buddha Bowl', desc: 'Roast sweet potato, chickpea, tahini, brown rice.', price: 319, tag: 'High Protein', img: u('photo-1546069901-ba9599a7e63c') },
      { name: 'Green Detox Press', desc: 'Apple, cucumber, celery, spinach, lemon.', price: 169, tag: 'Cold Press', img: u('photo-1610970881699-44a5587caa90') },
      { name: 'Beetroot Hummus Plate', desc: 'Whipped beet hummus, dukkah, seeded crackers.', price: 249, tag: 'Share', img: u('photo-1505576399279-565b52d4ac71') },
      { name: 'Chia Berry Parfait', desc: 'Coconut yoghurt, chia, seasonal berries, granola.', price: 209, tag: 'Dessert', img: u('photo-1488477181946-6428a0291777') },
    ];

  // Fine dining / general fallback
  return [
    { name: 'Truffle Tagliatelle', desc: 'Hand-rolled pasta, winter truffle, aged parmesan.', price: 650, tag: 'Signature', img: u('photo-1546549032-9571cd6b27df') },
    { name: 'Pan-Seared Sea Bass', desc: 'Saffron emulsion, heirloom carrot, dill oil.', price: 950, tag: 'Chef Pick', img: u('photo-1519708227418-c8fd9a32b7a2') },
    { name: 'Wagyu Striploin', desc: 'Dry-aged 45 days, bone marrow jus, confit shallot.', price: 1850, tag: 'Premium', img: u('photo-1555996273-367ea4eb4db5') },
    { name: 'Citrus Garden Salad', desc: 'Fennel, orange, toasted almond, herb vinaigrette.', price: 320, tag: 'Starter', img: u('photo-1512621776951-a57141f2eefd') },
    { name: 'Sparkling Yuzu Spritz', desc: 'Yuzu, elderflower, soda, crisp citrus finish.', price: 220, tag: 'Bar', img: u('photo-1551024709-8f23befc6d3a') },
    { name: 'Valrhona Soufflé', desc: 'Warm dark chocolate soufflé, vanilla bean cream.', price: 420, tag: 'Dessert', img: u('photo-1571877227200-a0d98ea607e9') },
  ];
}

const GALLERY = [
  'photo-1517248135467-4c7edcad34c4',
  'photo-1552566626-52f8b828add9',
  'photo-1466978913421-dad2ebd01d17',
  'photo-1414235077428-338989a2e8c0',
  'photo-1424847651672-bf20a4b0982b',
  'photo-1559339352-11d035aa65de',
].map((id) => `https://images.unsplash.com/${id}?w=700&auto=format&fit=crop&q=80`);

/* ------------------------------------------------------------------ */
/*  Scroll reveal helper                                               */
/* ------------------------------------------------------------------ */

function useScrollReveal(rootRef: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;

    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('zb-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('zb-in');
            io.unobserve(e.target);
          }
        });
      },
      { root, threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function TemplateFullPreview({ template, onClose, onUseTemplate }: Props) {
  const [view, setView] = useState<ViewMode>('landing');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const scrollRef = useRef<HTMLDivElement>(null);

  const accent = THEME_HEX[template.recommendedTheme] || '#c5a880';
  const dishes = useMemo(() => getDishes(template.category), [template.category]);

  useScrollReveal(scrollRef, [view, device, template.id]);

  // Reset scroll on view change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [view]);

  // Esc to close + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const tabs: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'landing', label: 'Landing Page', icon: '🏠' },
    { id: 'login', label: 'Login Page', icon: '🔐' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950 flex flex-col">
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        [data-reveal].zb-in{opacity:1;transform:none}
        [data-reveal][data-delay="1"]{transition-delay:.09s}
        [data-reveal][data-delay="2"]{transition-delay:.18s}
        [data-reveal][data-delay="3"]{transition-delay:.27s}
        [data-reveal][data-delay="4"]{transition-delay:.36s}
        [data-reveal][data-delay="5"]{transition-delay:.45s}
        @keyframes zbFadeUp{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}
        @keyframes zbZoom{from{transform:scale(1.14)}to{transform:scale(1)}}
        @keyframes zbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes zbShine{0%{background-position:200% 0}100%{background-position:-200% 0}}
        .zb-hero-t{animation:zbFadeUp .9s cubic-bezier(.16,1,.3,1) both}
        .zb-hero-img{animation:zbZoom 1.8s cubic-bezier(.16,1,.3,1) both}
        .zb-float{animation:zbFloat 5s ease-in-out infinite}
        .zb-scroll::-webkit-scrollbar{width:8px}
        .zb-scroll::-webkit-scrollbar-thumb{background:#334155;border-radius:8px}
        .zb-scroll::-webkit-scrollbar-track{background:transparent}
      `}</style>

      {/* ---------------- Top chrome bar ---------------- */}
      <div className="shrink-0 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 mr-1">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0"
            style={{ backgroundColor: accent, color: '#0f172a' }}
          >
            Live Preview
          </span>
          <span className="text-white text-xs font-bold truncate">{template.name}</span>
          <span className="hidden sm:inline text-slate-500 text-[10px] font-mono truncate">
            {template.id}.zatbiz.site
          </span>
        </div>

        {/* View tabs */}
        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mx-auto order-last w-full sm:order-none sm:w-auto justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition border-none cursor-pointer ${
                view === t.id ? 'text-slate-900' : 'bg-transparent text-slate-400 hover:text-white'
              }`}
              style={view === t.id ? { backgroundColor: accent } : undefined}
            >
              <span className="mr-1">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['desktop', 'mobile'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md border-none cursor-pointer transition ${
                  device === d ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-500 hover:text-white'
                }`}
              >
                {d === 'desktop' ? '🖥 Desktop' : '📱 Mobile'}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 cursor-pointer transition flex items-center gap-1.5"
          >
            ← Back to Templates
          </button>

          <button
            onClick={onUseTemplate}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer text-slate-900 shadow-lg hover:brightness-110 transition"
            style={{ backgroundColor: accent }}
          >
            Use This Template ➔
          </button>

          <button
            onClick={onClose}
            title="Close preview"
            className="px-3 py-2 text-[11px] font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-none cursor-pointer transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ---------------- Scrollable viewport ---------------- */}
      <div className="flex-grow min-h-0 bg-slate-800 flex justify-center">
        <div
          ref={scrollRef}
          key={view + device}
          className={`zb-scroll h-full overflow-y-auto overflow-x-hidden bg-white transition-all duration-300 ${
            device === 'mobile' ? 'w-[420px] max-w-full border-x border-slate-700 shadow-2xl' : 'w-full'
          }`}
        >
          {view === 'landing' && <LandingView t={template} accent={accent} dishes={dishes} onLogin={() => setView('login')} />}
          {view === 'login' && <LoginView t={template} accent={accent} onSuccess={() => setView('dashboard')} onBack={() => setView('landing')} />}
          {view === 'dashboard' && <DashboardView t={template} accent={accent} dishes={dishes} onLogout={() => setView('landing')} />}
        </div>
      </div>

      {/* ---------------- Bottom CTA strip ---------------- */}
      <div className="shrink-0 bg-slate-900 border-t border-slate-800 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[11px] text-slate-400 font-semibold min-w-0">
          <span className="text-white font-bold">{template.name}</span>
          <span className="hidden sm:inline"> — {template.desc}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border-none cursor-pointer transition"
          >
            ← Back to Gallery
          </button>
          <button
            onClick={onUseTemplate}
            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer text-slate-900 shadow-xl hover:scale-[1.02] transition"
            style={{ backgroundColor: accent }}
          >
            Use This Template & Continue ➔
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Per-niche visual profile — each niche gets its own look            */
/* ------------------------------------------------------------------ */

type HeroKind = 'overlay' | 'split' | 'centered' | 'editorial';

interface NicheProfile {
  surface: 'dark' | 'light' | 'cream';
  hero: HeroKind;
  font: string; // CSS font-family for headings
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  storyTitle: string;
  menuTitle: string;
  primaryCta: string;
  secondaryCta: string;
  storyImg: string;
}

function getNicheProfile(category: string, name: string): NicheProfile {
  const c = category.toLowerCase();
  const u = (id: string) => `https://images.unsplash.com/${id}?w=900&auto=format&fit=crop&q=80`;
  const serif = 'Georgia, "Times New Roman", serif';
  const display = '"Helvetica Neue", Arial, sans-serif';

  if (c.includes('fine dining') || c.includes('dining'))
    return { surface: 'dark', hero: 'overlay', font: serif, eyebrow: 'Fine Dining',
      heroTitle: 'An evening worth\nsavouring', heroSub: 'Seasonal tasting menus, a curated cellar, and service that pays attention to every detail.',
      storyTitle: 'Cooked with intent.\nServed with care.', menuTitle: 'The Tasting Menu', primaryCta: 'Reserve a Table', secondaryCta: 'View Menu', storyImg: u('photo-1414235077428-338989a2e8c0') };

  if (c.includes('indian'))
    return { surface: 'cream', hero: 'split', font: serif, eyebrow: 'Authentic Indian',
      heroTitle: 'Spice, smoke &\nslow cooking', heroSub: 'Tandoor-charred kebabs, overnight dal, and biryani sealed under dough — cooked the way it should be.',
      storyTitle: 'Whole spices.\nGround each morning.', menuTitle: 'Our Specialities', primaryCta: 'Book a Table', secondaryCta: 'View Menu', storyImg: u('photo-1601050690597-df056fb4ce78') };

  if (c.includes('fast food') || c.includes('burger'))
    return { surface: 'light', hero: 'centered', font: display, eyebrow: 'Flame-Grilled Daily',
      heroTitle: 'BIG FLAVOUR,\nNO WAITING', heroSub: 'Smash patties, buttermilk-fried chicken and skin-on fries. Order ahead or grab a booth.',
      storyTitle: 'Fast doesn’t mean\ncutting corners.', menuTitle: 'The Lineup', primaryCta: 'Order Now', secondaryCta: 'See Menu', storyImg: u('photo-1550547660-d9450f859349') };

  if (c.includes('pizza'))
    return { surface: 'dark', hero: 'editorial', font: serif, eyebrow: 'Wood-Fired',
      heroTitle: 'Naples rules.\nStone oven.', heroSub: 'San Marzano tomatoes, 48-hour dough, and a 450°C deck. Dine in or take away.',
      storyTitle: '48-hour dough.\n90-second bake.', menuTitle: 'From the Oven', primaryCta: 'Order a Pizza', secondaryCta: 'View Menu', storyImg: u('photo-1590947132387-155cc02f3212') };

  if (c.includes('cafe') || c.includes('coffee'))
    return { surface: 'cream', hero: 'centered', font: serif, eyebrow: 'Speciality Roastery',
      heroTitle: 'Good coffee,\nunhurried mornings', heroSub: 'Single-origin beans roasted in-house and pastries laminated over three days.',
      storyTitle: 'Roasted here.\nPoured with care.', menuTitle: 'Brews & Bakes', primaryCta: 'Order Ahead', secondaryCta: 'See Menu', storyImg: u('photo-1498804103079-a6351b050096') };

  if (c.includes('bakery') || c.includes('cake') || c.includes('dessert'))
    return { surface: 'light', hero: 'split', font: serif, eyebrow: 'Baked Fresh Daily',
      heroTitle: 'Designer cakes &\nmorning sourdough', heroSub: 'Celebration cakes to order, French pastry cases, and bread pulled warm from the deck.',
      storyTitle: 'Butter, flour,\nand patience.', menuTitle: 'Pastry & Cake Cases', primaryCta: 'Order Cakes', secondaryCta: 'Browse', storyImg: u('photo-1509365465985-25d11c17e812') };

  if (c.includes('chinese') || c.includes('noodle') || c.includes('sushi') || c.includes('asian'))
    return { surface: 'dark', hero: 'split', font: display, eyebrow: 'Wok Fire & Steam',
      heroTitle: 'Breath of the wok,\nevery plate', heroSub: 'Hand-pleated dumplings, fiery Schezwan, and noodles pulled to order over roaring wok fire.',
      storyTitle: 'High heat.\nFast hands.', menuTitle: 'Wok & Steamer', primaryCta: 'Order Now', secondaryCta: 'View Menu', storyImg: u('photo-1585032226651-759b368d7246') };

  if (c.includes('vegan') || c.includes('salad') || c.includes('healthy') || c.includes('organic'))
    return { surface: 'light', hero: 'editorial', font: display, eyebrow: 'Plant-Based & Organic',
      heroTitle: 'Vegetables, as\nthe main event', heroSub: 'Organic produce from growers we know by name, cold-pressed juices, and bowls built to nourish.',
      storyTitle: 'From growers\nwe know by name.', menuTitle: 'Bowls & Cold Press', primaryCta: 'Order a Bowl', secondaryCta: 'See Menu', storyImg: u('photo-1540420773420-3366772f4999') };

  return { surface: 'cream', hero: 'split', font: display, eyebrow: name || 'All-Day Kitchen',
    heroTitle: 'A room worth\ncoming back to', heroSub: 'An all-day menu built on good produce, a proper bar, and service that actually pays attention.',
    storyTitle: 'Good produce.\nProper service.', menuTitle: 'What We’re Serving', primaryCta: 'Reserve a Table', secondaryCta: 'View Menu', storyImg: u('photo-1552566626-52f8b828add9') };
}

/* ------------------------------------------------------------------ */
/*  LANDING                                                            */
/* ------------------------------------------------------------------ */

function LandingView({
  t,
  accent,
  dishes,
  onLogin,
}: {
  t: PreviewTemplate;
  accent: string;
  dishes: Dish[];
  onLogin: () => void;
}) {
  const [activeCat, setActiveCat] = useState('All');
  const cats = useMemo(() => ['All', ...Array.from(new Set(dishes.map((d) => d.tag)))], [dishes]);
  const shown = activeCat === 'All' ? dishes : dishes.filter((d) => d.tag === activeCat);

  const p = useMemo(() => getNicheProfile(t.category, t.name), [t.category, t.name]);
  const dark = p.surface === 'dark';
  const heroImg = t.imageUrl.replace('w=500', 'w=1400');

  // Surface tokens flip per niche so each page reads differently
  const pageBg = p.surface === 'dark' ? '#111014' : p.surface === 'cream' ? '#faf6f0' : '#ffffff';
  const s = {
    text: dark ? 'text-white' : 'text-slate-900',
    muted: dark ? 'text-white/55' : 'text-slate-500',
    soft: dark ? 'text-white/70' : 'text-slate-600',
    border: dark ? 'border-white/10' : 'border-slate-200',
    card: dark ? 'bg-white/[0.03]' : 'bg-white',
    band: dark ? 'bg-white/[0.02]' : p.surface === 'cream' ? 'bg-white' : 'bg-slate-50',
    navBg: dark ? 'bg-[#111014]/85' : 'bg-white/80',
    navBtn: dark ? 'bg-white/10 hover:bg-white/20 text-white border-white/15' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200',
  };

  /* ---- Hero, four distinct layouts ---- */
  const hero = (() => {
    if (p.hero === 'overlay') {
      return (
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <img src={heroImg} alt={t.name} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,#0b0b0f 5%,#0b0b0fcc 45%,transparent)' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${pageBg}, transparent 55%)` }} />
          <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
            <div className="max-w-xl space-y-6 text-white">
              <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full" style={{ backgroundColor: accent, animationDelay: '.1s' }}>{p.eyebrow}</span>
              <h1 className="zb-hero-t text-4xl sm:text-6xl leading-[1.03] tracking-tight whitespace-pre-line" style={{ fontFamily: p.font, animationDelay: '.22s' }}>{p.heroTitle}</h1>
              <p className="zb-hero-t text-white/70 text-[15px] leading-relaxed" style={{ animationDelay: '.34s' }}>{p.heroSub}</p>
              <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
                <button onClick={onLogin} className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-2xl hover:scale-[1.03] transition" style={{ backgroundColor: accent }}>{p.primaryCta}</button>
                <a href="#menu" className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition">{p.secondaryCta}</a>
              </div>
            </div>
          </div>
        </section>
      );
    }
    if (p.hero === 'centered') {
      return (
        <section className="relative min-h-[560px] flex items-center justify-center overflow-hidden text-center">
          <img src={heroImg} alt={t.name} className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}dd, #0b0b0fe6)` }} />
          <div className="relative max-w-3xl mx-auto px-6 py-20 space-y-6 text-white">
            <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur" style={{ animationDelay: '.1s' }}>{p.eyebrow}</span>
            <h1 className="zb-hero-t text-5xl sm:text-7xl font-black leading-[0.98] tracking-tight whitespace-pre-line" style={{ fontFamily: p.font, animationDelay: '.22s' }}>{p.heroTitle}</h1>
            <p className="zb-hero-t text-white/75 text-[15px] leading-relaxed max-w-lg mx-auto" style={{ animationDelay: '.34s' }}>{p.heroSub}</p>
            <div className="zb-hero-t flex flex-wrap gap-3 pt-1 justify-center" style={{ animationDelay: '.46s' }}>
              <button onClick={onLogin} className="px-8 py-4 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white text-slate-900 border-none cursor-pointer shadow-2xl hover:scale-[1.03] transition">{p.primaryCta}</button>
              <a href="#menu" className="px-8 py-4 text-[12px] font-black uppercase tracking-widest rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur transition">{p.secondaryCta}</a>
            </div>
          </div>
        </section>
      );
    }
    // split & editorial share a two-column build with different emphasis
    const editorial = p.hero === 'editorial';
    return (
      <section className={`max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center ${editorial ? 'md:grid-cols-[1.05fr_1fr]' : ''}`}>
        <div className={`space-y-6 ${editorial ? 'md:order-1' : ''}`}>
          <span className="zb-hero-t inline-block text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full" style={{ backgroundColor: `${accent}1a`, color: accent, animationDelay: '.1s' }}>{p.eyebrow}</span>
          <h1 className={`zb-hero-t text-5xl md:text-6xl leading-[1.03] tracking-tight ${s.text} ${editorial ? 'italic' : ''}`} style={{ fontFamily: p.font, animationDelay: '.22s' }}>{p.heroTitle.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}</h1>
          <p className={`zb-hero-t text-[15px] leading-relaxed ${s.muted}`} style={{ animationDelay: '.34s' }}>{p.heroSub}</p>
          <div className="zb-hero-t flex flex-wrap gap-3 pt-1" style={{ animationDelay: '.46s' }}>
            <button onClick={onLogin} className="px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl text-white border-none cursor-pointer shadow-lg hover:scale-[1.02] transition" style={{ backgroundColor: accent }}>{p.primaryCta}</button>
            <button onClick={onLogin} className={`px-7 py-3.5 text-[12px] font-black uppercase tracking-widest rounded-xl border cursor-pointer transition ${s.navBtn}`}>{p.secondaryCta}</button>
          </div>
        </div>
        <div className={`relative ${editorial ? 'md:order-2' : ''}`}>
          <img src={heroImg} alt={t.name} className={`zb-hero-img w-full h-[440px] object-cover shadow-xl ${editorial ? 'rounded-none rounded-tr-[80px] rounded-bl-[80px]' : 'rounded-3xl'}`} />
          <div className={`absolute -bottom-5 -left-4 md:left-6 rounded-2xl px-5 py-4 shadow-lg zb-float ${dark ? 'bg-white/10 backdrop-blur border border-white/20' : 'bg-white border border-slate-100'}`}>
            <div className="text-2xl font-black leading-none" style={{ color: accent }}>4.9★</div>
            <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${s.muted}`}>Guest rating</div>
          </div>
        </div>
      </section>
    );
  })();

  return (
    <div style={{ backgroundColor: pageBg }} className={s.text}>
      {/* NAV */}
      <nav className={`sticky top-0 z-30 backdrop-blur-xl border-b ${s.border} ${s.navBg}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: accent }}>🍽</div>
            <span className="font-bold tracking-tight text-[15px]" style={{ fontFamily: p.font }}>{t.name}</span>
          </div>
          <div className={`hidden md:flex items-center gap-7 text-[12px] font-medium ${s.muted}`}>
            {['Home', 'Menu', 'Our Story', 'Gallery', 'Reserve'].map((l) => (
              <a key={l} className={`${dark ? 'hover:text-white' : 'hover:text-slate-900'} transition cursor-pointer`}>{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onLogin} className={`px-4 py-2 text-[11px] font-semibold rounded-lg border cursor-pointer transition ${s.navBtn}`}>Sign In</button>
            <button onClick={onLogin} className="px-4 py-2 text-[11px] font-semibold rounded-lg text-white border-none cursor-pointer hover:brightness-105 transition shadow-sm" style={{ backgroundColor: accent }}>{p.primaryCta}</button>
          </div>
        </div>
      </nav>

      {hero}

      {/* STATS */}
      <section className={`border-y ${s.border} ${s.band}`}>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: `${dishes.length}+`, l: 'Signature Dishes' },
            { v: '18k', l: 'Guests Served' },
            { v: '4.9★', l: 'Average Rating' },
            { v: '12', l: 'Years of Craft' },
          ].map((st, i) => (
            <div key={st.l} data-reveal data-delay={i} className="text-center">
              <div className="text-3xl font-black" style={{ color: accent }}>{st.v}</div>
              <div className={`text-[10px] uppercase tracking-widest font-semibold mt-1 ${s.muted}`}>{st.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-16">
        <div data-reveal className="text-center max-w-lg mx-auto space-y-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>Our Menu</span>
          <h2 className="text-4xl font-black tracking-tight" style={{ fontFamily: p.font }}>{p.menuTitle}</h2>
          <p className={`text-[13px] leading-relaxed ${s.muted}`}>Seasonal produce, house-made staples, and dishes the kitchen is known for.</p>
        </div>

        <div data-reveal className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-full border cursor-pointer transition ${
                activeCat === c ? 'text-white border-transparent' : `${s.card} ${s.muted} ${s.border} hover:opacity-80`
              }`}
              style={activeCat === c ? { backgroundColor: accent } : undefined}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((d, i) => (
            <div key={d.name} data-reveal data-delay={i % 3} className={`group ${s.card} border ${s.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition duration-500`}>
              <div className="h-52 overflow-hidden relative">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>{d.tag}</span>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`font-bold text-[15px] leading-snug ${s.text}`}>{d.name}</h3>
                  <span className="font-black text-[15px] shrink-0" style={{ color: accent }}>₹{d.price}</span>
                </div>
                <p className={`text-[12px] leading-relaxed ${s.muted}`}>{d.desc}</p>
                <button className={`w-full mt-3 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl border cursor-pointer transition ${s.card} ${s.text} ${s.border} hover:opacity-80`}>Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY SPLIT */}
      <section className={`${s.band} border-y ${s.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
          <div data-reveal className="relative">
            <img src={p.storyImg} alt="Our kitchen" className="rounded-3xl w-full h-[420px] object-cover shadow-md" />
            <div className="absolute -bottom-6 -right-4 md:right-8 rounded-2xl px-6 py-5 shadow-lg text-white zb-float" style={{ backgroundColor: accent }}>
              <div className="text-3xl font-black leading-none">12+</div>
              <div className="text-[10px] font-black uppercase tracking-widest mt-1">Years of craft</div>
            </div>
          </div>
          <div data-reveal data-delay="1" className="space-y-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>Our Story</span>
            <h2 className="text-4xl font-black tracking-tight leading-tight whitespace-pre-line" style={{ fontFamily: p.font }}>{p.storyTitle}</h2>
            <p className={`text-[13.5px] leading-relaxed ${s.muted}`}>Every plate that leaves our pass is built on sourcing we can vouch for and technique refined over years. {t.desc}</p>
            <ul className="space-y-3 pt-2">
              {['Locally sourced, seasonal produce', 'Zero-waste prep kitchen', 'House-fermented and cured in-house'].map((f) => (
                <li key={f} className={`flex items-center gap-3 text-[13px] font-medium ${s.soft}`}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white shrink-0" style={{ backgroundColor: accent }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RESERVATION BAND */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${accent}, ${accent}22)` }} />
        <div data-reveal className="relative max-w-4xl mx-auto px-6 py-20 text-center text-white space-y-5">
          <h2 className="text-4xl font-black tracking-tight" style={{ fontFamily: p.font }}>Reserve your table tonight</h2>
          <p className="text-white/80 text-[14px] font-semibold max-w-lg mx-auto">Live seat map, instant confirmation, and a reminder before you arrive.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <button onClick={onLogin} className="px-8 py-4 bg-black hover:bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border-none cursor-pointer shadow-2xl transition">{p.primaryCta}</button>
            <button className="px-8 py-4 bg-white/25 hover:bg-white/40 backdrop-blur text-white text-[11px] font-black uppercase tracking-widest rounded-xl border border-white/20 cursor-pointer transition">Order Takeaway</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div data-reveal className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>Reviews</span>
          <h2 className="text-4xl font-black tracking-tight" style={{ fontFamily: p.font }}>What our guests say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: 'Ananya Rao', r: 'Food Critic', q: 'The plating is restrained and the flavours are confident. Easily a repeat visit.' },
            { n: 'Marcus Lee', r: 'Regular guest', q: 'Booking took ten seconds and the table was ready on the minute. Service is genuinely sharp.' },
            { n: 'Priya Nair', r: 'Local guide', q: 'Consistent every single time. The seasonal menu keeps it interesting without losing the classics.' },
          ].map((t2, i) => (
            <div key={t2.n} data-reveal data-delay={i} className={`${s.card} border ${s.border} rounded-3xl p-7 space-y-4 shadow-sm`}>
              <div className="text-lg" style={{ color: accent }}>★★★★★</div>
              <p className={`text-[13px] leading-relaxed italic ${s.soft}`}>“{t2.q}”</p>
              <div className={`flex items-center gap-3 pt-2 border-t ${s.border}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: accent }}>{t2.n[0]}</div>
                <div>
                  <div className={`text-[12px] font-bold ${s.text}`}>{t2.n}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${s.muted}`}>{t2.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div data-reveal className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>Gallery</span>
          <h2 className="text-4xl font-black tracking-tight" style={{ fontFamily: p.font }}>Inside the room</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <div key={g} data-reveal data-delay={i % 3} className={`overflow-hidden rounded-2xl shadow-sm ${i === 0 ? 'md:row-span-2 md:h-[420px]' : 'h-52'}`}>
              <img src={g} alt="gallery" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t ${s.border} ${s.band}`}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>🍽</div>
              <span className="font-bold text-[15px]" style={{ fontFamily: p.font }}>{t.name}</span>
            </div>
            <p className={`text-[12px] leading-relaxed max-w-sm ${s.muted}`}>{t.desc}</p>
            <div className="flex gap-2 pt-2">
              {['ig', 'fb', 'x', 'in'].map((sm) => (
                <span key={sm} className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-semibold uppercase ${s.card} ${s.border} ${s.muted}`}>{sm}</span>
              ))}
            </div>
          </div>
          {[
            { h: 'Visit', items: ['104 Food Arcade, MG Road', 'Noida, UP 201301', 'Mon–Sun · 11:00–23:30'] },
            { h: 'Contact', items: ['+91 98765 43210', `hello@${t.id}.com`, 'Private events desk'] },
          ].map((col) => (
            <div key={col.h} className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{col.h}</h4>
              {col.items.map((it) => (
                <p key={it} className={`text-[12px] font-medium ${s.muted}`}>{it}</p>
              ))}
            </div>
          ))}
        </div>
        <div className={`border-t ${s.border} py-5 text-center text-[10px] font-semibold uppercase tracking-widest ${s.muted}`}>
          © {new Date().getFullYear()} {t.name} · Built with ZATBIZ
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOGIN                                                              */
/* ------------------------------------------------------------------ */

function LoginView({
  t,
  accent,
  onSuccess,
  onBack,
}: {
  t: PreviewTemplate;
  accent: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('guest@demo.com');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(onSuccess, 900);
  };

  return (
    <div className="min-h-full bg-[#0b0b0f] text-white grid lg:grid-cols-2">
      {/* Visual panel */}
      <div className="relative hidden lg:block overflow-hidden">
        <img src={t.imageUrl.replace('w=500', 'w=1200')} alt="" className="zb-hero-img absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}dd, #0b0b0fee)` }} />
        <div className="relative h-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl">🍽</div>
            <span className="font-black text-[15px]">{t.name}</span>
          </div>
          <div className="space-y-4 max-w-sm">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Your table,
              <br />
              your orders,
              <br />
              one account.
            </h2>
            <p className="text-white/70 text-[13px] leading-relaxed">
              Track live orders, manage reservations, and unlock loyalty rewards across every visit.
            </p>
            <div className="flex gap-6 pt-4">
              {[
                { v: '2 min', l: 'Avg. booking' },
                { v: '18k+', l: 'Members' },
                { v: '4.9★', l: 'Rated' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-black">{s.v}</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/50 font-bold">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Powered by ZATBIZ</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-8 sm:p-14">
        <div className="w-full max-w-sm space-y-7">
          <button
            onClick={onBack}
            className="text-white/40 hover:text-white text-[11px] font-bold bg-transparent border-none cursor-pointer p-0 transition"
          >
            ← Back to site
          </button>

          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight">
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-white/45 text-[13px]">
              {mode === 'signin' ? 'Sign in to manage your bookings and orders.' : 'Join to book faster and earn rewards.'}
            </p>
          </div>

          <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg border-none cursor-pointer transition ${
                  mode === m ? 'text-slate-900' : 'bg-transparent text-white/50 hover:text-white'
                }`}
                style={mode === m ? { backgroundColor: accent } : undefined}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <Field label="Full Name" defaultValue="Aarav Sharma" accent={accent} />
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-[13px] text-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Password</label>
                {mode === 'signin' && (
                  <span className="text-[10px] font-bold cursor-pointer" style={{ color: accent }}>
                    Forgot?
                  </span>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-[13px] text-white outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl text-slate-900 border-none cursor-pointer shadow-xl hover:brightness-110 transition disabled:opacity-70"
              style={{ backgroundColor: accent }}
            >
              {loading ? 'Signing in…' : mode === 'signin' ? 'Sign In ➔' : 'Create Account ➔'}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <span className="flex-grow h-px bg-white/10" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">or continue with</span>
            <span className="flex-grow h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Apple'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={onSuccess}
                className="py-3 text-[11px] font-bold rounded-xl bg-white/5 hover:bg-white/12 text-white border border-white/15 cursor-pointer transition"
              >
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-white/30 text-[10px] font-semibold">
            Demo preview · any credentials open the dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, accent }: { label: string; defaultValue: string; accent: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/50">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-[13px] text-white outline-none transition"
        style={{ caretColor: accent }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD                                                          */
/* ------------------------------------------------------------------ */

function DashboardView({
  t,
  accent,
  dishes,
  onLogout,
}: {
  t: PreviewTemplate;
  accent: string;
  dishes: Dish[];
  onLogout: () => void;
}) {
  const [nav, setNav] = useState('Overview');
  const items = ['Overview', 'Orders', 'Reservations', 'Menu Items', 'Kitchen Stock', 'Customers', 'Settings'];

  const orders = [
    { id: '#ZB-4821', c: 'Aarav Sharma', items: 3, total: 1240, status: 'Preparing', t: '2 min ago' },
    { id: '#ZB-4820', c: 'Priya Nair', items: 5, total: 2180, status: 'Served', t: '14 min ago' },
    { id: '#ZB-4819', c: 'Marcus Lee', items: 2, total: 690, status: 'Ready', t: '22 min ago' },
    { id: '#ZB-4818', c: 'Sana Qureshi', items: 6, total: 3420, status: 'Served', t: '41 min ago' },
    { id: '#ZB-4817', c: 'Dev Malhotra', items: 1, total: 320, status: 'Cancelled', t: '1 hr ago' },
  ];

  const statusStyle: Record<string, string> = {
    Preparing: 'bg-amber-100 text-amber-700',
    Served: 'bg-emerald-100 text-emerald-700',
    Ready: 'bg-sky-100 text-sky-700',
    Cancelled: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="min-h-full bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 bg-slate-900 text-white flex-col">
        <div className="p-5 flex items-center gap-2.5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: accent }}>
            🍽
          </div>
          <div className="min-w-0">
            <div className="font-black text-[12px] truncate">{t.name}</div>
            <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Admin Console</div>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-grow">
          {items.map((it) => (
            <button
              key={it}
              onClick={() => setNav(it)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[12px] font-bold border-none cursor-pointer transition ${
                nav === it ? 'text-slate-900' : 'bg-transparent text-white/55 hover:bg-white/10 hover:text-white'
              }`}
              style={nav === it ? { backgroundColor: accent } : undefined}
            >
              {it}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2.5 rounded-xl text-[11px] font-bold bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border-none cursor-pointer transition"
          >
            ← Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-grow min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black tracking-tight">{nav}</h1>
            <p className="text-[11px] text-slate-500 font-semibold">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} · Live service
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block relative">
              <input
                placeholder="Search orders, guests…"
                className="w-56 bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-[12px] outline-none focus:border-slate-400 transition"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[12px]">🔍</span>
            </div>
            <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[13px]">
              🔔
            </span>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black text-slate-900"
              style={{ backgroundColor: accent }}
            >
              AS
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: "Today's Revenue", v: '₹84,320', d: '+12.4%', up: true, i: '💰' },
              { l: 'Live Orders', v: '18', d: '+3 new', up: true, i: '🧾' },
              { l: 'Tables Booked', v: '26 / 32', d: '81% full', up: true, i: '🪑' },
              { l: 'Avg. Prep Time', v: '14 min', d: '-2 min', up: true, i: '⏱' },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.l}</span>
                  <span className="text-base">{s.i}</span>
                </div>
                <div className="text-2xl font-black tracking-tight">{s.v}</div>
                <div className={`text-[11px] font-bold ${s.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {s.up ? '▲' : '▼'} {s.d}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Orders table */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-[13px] font-black">Live Orders</h3>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
                  View all
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      {['Order', 'Guest', 'Items', 'Total', 'Status', 'Time'].map((h) => (
                        <th key={h} className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                        <td className="px-5 py-3.5 text-[12px] font-black font-mono">{o.id}</td>
                        <td className="px-5 py-3.5 text-[12px] font-semibold">{o.c}</td>
                        <td className="px-5 py-3.5 text-[12px] text-slate-500">{o.items}</td>
                        <td className="px-5 py-3.5 text-[12px] font-black">₹{o.total.toLocaleString('en-IN')}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${statusStyle[o.status]}`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[11px] text-slate-400 font-semibold">{o.t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side column */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-[13px] font-black">Upcoming Reservations</h3>
                {[
                  { n: 'Kapoor · 4 pax', t: '7:30 PM', tb: 'T-12' },
                  { n: 'Fernandes · 2 pax', t: '8:00 PM', tb: 'T-04' },
                  { n: 'Iyer · 6 pax', t: '8:45 PM', tb: 'T-21' },
                ].map((r) => (
                  <div key={r.n} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-900 shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      {r.tb}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="text-[12px] font-bold truncate">{r.n}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Confirmed</div>
                    </div>
                    <span className="text-[11px] font-black shrink-0">{r.t}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-[13px] font-black">Top Selling Items</h3>
                {dishes.slice(0, 4).map((d, i) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <img src={d.img} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0 flex-grow">
                      <div className="text-[12px] font-bold truncate">{d.name}</div>
                      <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${92 - i * 17}%`, backgroundColor: accent }} />
                      </div>
                    </div>
                    <span className="text-[11px] font-black shrink-0">₹{d.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kitchen stock */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-[13px] font-black mb-4">Kitchen Stock Levels</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { n: 'Fresh Produce', p: 78 },
                { n: 'Dairy & Cheese', p: 46 },
                { n: 'Proteins', p: 88 },
                { n: 'Dry Goods', p: 23 },
              ].map((s) => (
                <div key={s.n} className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>{s.n}</span>
                    <span className={s.p < 30 ? 'text-rose-600' : 'text-slate-400'}>{s.p}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${s.p}%`, backgroundColor: s.p < 30 ? '#e11d48' : accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
