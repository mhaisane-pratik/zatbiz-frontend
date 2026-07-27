/**
 * Per-variant content for the e-commerce storefront.
 *
 * Each of the 8 theme variants (Noir, Ivory, Vivid, Editorial, Mono, Luxe,
 * Pop, Aurora) gets its own voice: marquee strip, feature band, reviews and
 * section headings — so two variants of the same niche read completely
 * differently, not just look different.
 *
 * Kept in its own file so the storefront component stays lean.
 */

export interface VariantFeature {
  i: string;
  h: string;
  d: string;
}
export interface VariantReview {
  n: string;
  r: string;
  q: string;
}

export interface VariantContent {
  marquee: string[];
  shopEyebrow: string;
  shopTitle: string;
  features: VariantFeature[];
  reviews: VariantReview[];
  reviewsHeading: string;
  newsTitle: string;
  newsSub: string;
}

const CONTENT: Record<string, VariantContent> = {
  /* ---------------- NOIR — premium, after-dark ---------------- */
  Noir: {
    marquee: ['Members get early access', 'Complimentary gift wrapping', 'Authenticity guaranteed', 'Insured worldwide delivery', 'Private client service'],
    shopEyebrow: 'The Collection',
    shopTitle: 'Chosen with intent',
    features: [
      { i: '🤍', h: 'White-Glove Delivery', d: 'Every order hand-checked, boxed and dispatched with signed, insured shipping.' },
      { i: '🔐', h: 'Authenticity Guaranteed', d: 'Each piece verified and sealed with a certificate you can scan.' },
      { i: '🕯️', h: 'Concierge Service', d: 'A dedicated line for sizing, styling and priority restock alerts.' },
    ],
    reviews: [
      { n: 'Isabella M.', r: 'Member since 2023', q: 'The packaging alone feels like an event. Everything arrives immaculate and exactly as shown.' },
      { n: 'Rohan D.', r: 'Private client', q: 'Concierge sorted a last-minute gift in an hour. This is how online shopping should feel.' },
      { n: 'Chen W.', r: 'Verified buyer', q: 'Quiet luxury done properly — no clutter, no noise, just beautiful product.' },
    ],
    reviewsHeading: 'From our members',
    newsTitle: 'Join the inner circle',
    newsSub: 'Early access to drops, private sales and members-only pricing.',
  },

  /* ---------------- IVORY — airy, minimal ---------------- */
  Ivory: {
    marquee: ['Free shipping over ₹999', 'Easy 7-day returns', 'Sustainably sourced', 'Carbon-neutral delivery', 'Made to last'],
    shopEyebrow: 'This Season',
    shopTitle: 'Everyday essentials',
    features: [
      { i: '🌿', h: 'Sustainably Made', d: 'Responsibly sourced materials and recyclable, plastic-free packaging.' },
      { i: '↩️', h: 'Effortless Returns', d: 'Changed your mind? Seven days, prepaid label, instant refund.' },
      { i: '🚚', h: 'Free, Fast Shipping', d: 'Complimentary delivery on every order over ₹999, tracked door to door.' },
    ],
    reviews: [
      { n: 'Ananya R.', r: 'Verified buyer', q: 'Clean, calm and exactly the right amount of choice. I found what I wanted in a minute.' },
      { n: 'Marcus L.', r: 'Repeat customer', q: 'Quality is quietly excellent. Nothing shouts, everything just works.' },
      { n: 'Priya N.', r: 'Verified buyer', q: 'Returns were painless and the packaging is genuinely plastic-free. Rare.' },
    ],
    reviewsHeading: 'What customers say',
    newsTitle: 'Get 10% off your first order',
    newsSub: 'Join the list for new arrivals, restocks and slow-fashion stories.',
  },

  /* ---------------- VIVID — loud, hype ---------------- */
  Vivid: {
    marquee: ['🔥 New drops every Friday', 'Limited stock — going fast', 'Express 2-day shipping', 'Tag us to get featured', '10K+ five-star reviews'],
    shopEyebrow: 'Trending Now',
    shopTitle: 'The stuff everyone wants',
    features: [
      { i: '⚡', h: 'Drops Every Friday', d: 'Fresh limited runs weekly. Once they’re gone, they’re gone.' },
      { i: '🚀', h: 'Express Shipping', d: 'Order today, flexing by the weekend with 2-day tracked delivery.' },
      { i: '💬', h: 'Get Featured', d: 'Tag us in your fit and land on the homepage. Real customers, real hype.' },
    ],
    reviews: [
      { n: 'Zoe K.', r: 'Superfan', q: 'Copped the Friday drop in 4 minutes flat. Shipping was stupid fast. Obsessed.' },
      { n: 'Dev P.', r: 'Repeat buyer', q: 'The hype is real. Quality slaps and the unboxing is a whole moment.' },
      { n: 'Aisha B.', r: 'Verified buyer', q: 'Got featured for my fit and it made my week. Best community of any store.' },
    ],
    reviewsHeading: 'The hype is real',
    newsTitle: 'Don’t miss the next drop',
    newsSub: 'Get the drop alert before it sells out. Zero spam, all heat.',
  },

  /* ---------------- EDITORIAL — magazine ---------------- */
  Editorial: {
    marquee: ['Styled by our editors', 'New lookbook out now', 'The Journal', 'Behind every piece a story', 'Curated, not crowded'],
    shopEyebrow: 'The Edit',
    shopTitle: 'This week’s selects',
    features: [
      { i: '📖', h: 'Editor-Curated', d: 'Every piece hand-picked and styled by our in-house editorial team.' },
      { i: '📷', h: 'Shot on Location', d: 'See it worn, not just laid flat. Real context, real proportions.' },
      { i: '✍️', h: 'The Story Behind It', d: 'Maker notes and provenance for the pieces worth knowing about.' },
    ],
    reviews: [
      { n: 'Farah S.', r: 'Reader & buyer', q: 'It reads like a magazine I actually want to shop. The styling sold me instantly.' },
      { n: 'Tom E.', r: 'Verified buyer', q: 'Loved the maker story on the product page. You feel like you know what you’re buying.' },
      { n: 'Meera J.', r: 'Repeat customer', q: 'Curated beautifully. I trust the edit more than endless scrolling.' },
    ],
    reviewsHeading: 'From our readers',
    newsTitle: 'Read the Journal',
    newsSub: 'Lookbooks, maker stories and the edit — straight to your inbox.',
  },

  /* ---------------- MONO — essentialist ---------------- */
  Mono: {
    marquee: ['Buy less, choose well', 'Lifetime repairs', 'Carbon neutral', 'No sales, fair prices always', 'Built to outlast trends'],
    shopEyebrow: 'The Essentials',
    shopTitle: 'A short, considered list',
    features: [
      { i: '♾️', h: 'Lifetime Repairs', d: 'We fix what we make, for as long as you own it. No questions.' },
      { i: '⚖️', h: 'Honest Pricing', d: 'One fair price, all year. No fake discounts, no manufactured urgency.' },
      { i: '🌍', h: 'Carbon Neutral', d: 'Every order’s footprint measured and offset. Details on request.' },
    ],
    reviews: [
      { n: 'Jonas V.', r: 'Owner since 2021', q: 'Three years in, still perfect. They repaired a strap for free. This is the whole point.' },
      { n: 'Nadia R.', r: 'Verified buyer', q: 'No noise, no pressure, no sales games. Just good things at a fair price.' },
      { n: 'Sam O.', r: 'Repeat customer', q: 'I own fewer, better things now. This shop changed how I buy.' },
    ],
    reviewsHeading: 'Owners, not customers',
    newsTitle: 'Fewer, better things',
    newsSub: 'Occasional notes on what we make and why. No sales, ever.',
  },

  /* ---------------- LUXE — gallery-grade ---------------- */
  Luxe: {
    marquee: ['By appointment', 'Certified & appraised', 'Bespoke commissions', 'Lifetime servicing', 'Discreet worldwide delivery'],
    shopEyebrow: 'The Maison',
    shopTitle: 'Objects of desire',
    features: [
      { i: '💎', h: 'Certified & Appraised', d: 'Independent certification and a full appraisal with every acquisition.' },
      { i: '🎨', h: 'Bespoke Commissions', d: 'Work directly with our atelier to create something entirely yours.' },
      { i: '🤝', h: 'Lifetime Servicing', d: 'Complimentary cleaning, servicing and restoration for life.' },
    ],
    reviews: [
      { n: 'Victoria H.', r: 'Collector', q: 'The private viewing was exceptional. Every detail considered, nothing rushed.' },
      { n: 'Arjun K.', r: 'Commissioned client', q: 'They brought my commission to life beyond what I imagined. True craftsmanship.' },
      { n: 'Elena P.', r: 'Verified client', q: 'Servicing after two years, still flawless and still free. This is real luxury.' },
    ],
    reviewsHeading: 'From our collectors',
    newsTitle: 'Request a private viewing',
    newsSub: 'Preview new acquisitions and commissions before they’re shown publicly.',
  },

  /* ---------------- POP — playful ---------------- */
  Pop: {
    marquee: ['🎉 Buy one, gift one', 'Student discount 15%', 'Super-fast shipping', 'Add a free surprise at checkout', 'Happiness guaranteed'],
    shopEyebrow: 'Fresh Picks',
    shopTitle: 'Stuff that makes you smile',
    features: [
      { i: '🎁', h: 'Free Surprise', d: 'Every order comes with a little something extra. Because why not.' },
      { i: '🎓', h: 'Student Discount', d: 'Verify once, get 15% off everything, forever. Easy.' },
      { i: '😄', h: 'Happiness Guarantee', d: 'Not grinning? Return it, no fuss, and we’ll make it right.' },
    ],
    reviews: [
      { n: 'Lily T.', r: 'Verified buyer', q: 'The free surprise in my box actually made me laugh out loud. Instant repeat customer.' },
      { n: 'Kabir M.', r: 'Student buyer', q: 'Colours are so fun and the student discount is legit. Ordered three more.' },
      { n: 'Grace A.', r: 'Repeat customer', q: 'Everything is bright, cheerful and arrives crazy fast. My go-to gift shop.' },
    ],
    reviewsHeading: 'Happy little reviews',
    newsTitle: 'Get 15% + a free surprise',
    newsSub: 'Join for fun drops, student perks and the occasional freebie.',
  },

  /* ---------------- AURORA — neon drop ---------------- */
  Aurora: {
    marquee: ['⚡ Limited drop live now', 'Glow guarantee', 'Next-day dispatch', 'Only 100 made', 'Neon nights collection'],
    shopEyebrow: 'The Drop',
    shopTitle: 'Turn it all the way up',
    features: [
      { i: '🌈', h: 'Limited Runs', d: 'Only a hundred of each. Numbered, sealed, and never restocked.' },
      { i: '✨', h: 'Glow Guarantee', d: 'If it doesn’t light up your feed, send it back — on us.' },
      { i: '🌙', h: 'Next-Day Dispatch', d: 'Order before midnight, out the door before sunrise.' },
    ],
    reviews: [
      { n: 'Neo R.', r: 'Drop hunter', q: 'Grabbed #47 of 100. The colours are unreal in person. Feed’s never looked better.' },
      { n: 'Maya S.', r: 'Verified buyer', q: 'Ordered at 11pm, had it next morning. The glow is exactly as advertised.' },
      { n: 'Jax B.', r: 'Repeat buyer', q: 'Every drop is a whole vibe. Numbered pieces make it feel properly exclusive.' },
    ],
    reviewsHeading: 'Straight from the drop',
    newsTitle: 'Get the next drop alert',
    newsSub: 'One hundred pieces. One notification. Don’t sleep on it.',
  },
};

const FALLBACK = CONTENT.Ivory;

export function getVariantContent(suffix?: string): VariantContent {
  return (suffix && CONTENT[suffix]) || FALLBACK;
}
