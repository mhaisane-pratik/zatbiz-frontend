/**
 * Four genuinely distinct theme variants per e-commerce niche.
 *
 * Each variant differs in surface (dark/light), hero layout, login layout,
 * copy and — critically — imagery: every niche carries four different hero
 * photos, one per variant, so no two theme cards or previews look alike.
 */

import { ALL_THEMES_160 } from '@/app/dashboard/themesData';

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

/** Four hero images per niche — one for each variant. */
const NICHE_IMAGES: Record<string, string[]> = {
  fashion: [
    u('photo-1483985988355-763728e1935b'),
    u('photo-1490481651871-ab68de25d43d'),
    u('photo-1445205170230-053b83016050'),
    u('photo-1469334031218-e382a71b716b'),
    u('photo-1441984904996-e0b6ba687e04'),
    u('photo-1487222477894-8943e31ef7b2'),
    u('photo-1529139574466-a303027c1d8b'),
    u('photo-1515886657613-9f3515b0c78f'),
  ],
  electronics: [
    u('photo-1505740420928-5e560c06d30e'),
    u('photo-1498049794561-7780e7231661'),
    u('photo-1550009158-9ebf69173e03'),
    u('photo-1519389950473-47ba0277781c'),
    u('photo-1526738549149-8e07eca6c147'),
    u('photo-1587831990711-23ca6441447b'),
    u('photo-1593642702821-c8da6771f0c6'),
    u('photo-1531297484001-80022131f5a1'),
  ],
  grocery: [
    u('photo-1542838132-92c53300491e'),
    u('photo-1506976785307-8732e854ad03'),
    u('photo-1488459716781-31db52582fe9'),
    u('photo-1608686207856-001b95cf60ca'),
  ],
  furniture: [
    u('photo-1524758631624-e2822e304c36'),
    u('photo-1555041469-a586c61ea9bc'),
    u('photo-1493663284031-b7e3aefcae8e'),
    u('photo-1538688525198-9b88f6f53126'),
  ],
  jewelry: [
    u('photo-1605100804763-247f67b3557e'),
    u('photo-1515562141207-7a88fb7ce338'),
    u('photo-1599643478518-a784e5dc4c8f'),
    u('photo-1611652022419-a9419f74343d'),
  ],
  beauty: [
    u('photo-1596462502278-27bfdc403348'),
    u('photo-1522335789203-aabd1fc54bc9'),
    u('photo-1571781926291-c477ebfd024b'),
    u('photo-1512496015851-a90fb38ba796'),
  ],
  pharmacy: [
    u('photo-1586015555751-63bb77f4322a'),
    u('photo-1587854692152-cbe660dbde88'),
    u('photo-1471864190281-a93a3070b6de'),
    u('photo-1584308666744-24d5c474f2ae'),
  ],
  pet: [
    u('photo-1583511655857-d19b40a7a54e'),
    u('photo-1548199973-03cce0bbc87b'),
    u('photo-1450778869180-41d0601e046e'),
    u('photo-1425082661705-1834bfd09dca'),
  ],
  books: [
    u('photo-1497633762265-9d179a990aa6'),
    u('photo-1512820790803-83ca734da794'),
    u('photo-1481627834876-b7833e8f5570'),
    u('photo-1524995997946-a1c2e315a42f'),
  ],
  sports: [
    u('photo-1517649763962-0c623066013b'),
    u('photo-1461896836934-ffe607ba8211'),
    u('photo-1571019613454-1cb2f99b2d8b'),
    u('photo-1526506118085-60ce8714f8c5'),
  ],
  restaurant: [
    u('photo-1517248135467-4c7edcad34c4'),
    u('photo-1414235077428-338989a2e8c0'),
    u('photo-1552566626-52f8b828add9'),
    u('photo-1466978913421-dad2ebd01d17'),
  ],
  bakery: [
    u('photo-1509440159596-0249088772ff'),
    u('photo-1578985545062-69928b1d9587'),
    u('photo-1517433670267-08bbd4be890f'),
    u('photo-1486427944299-d1955d23e34d'),
  ],
  cafe: [
    u('photo-1501339847302-ac426a4a7cbb'),
    u('photo-1495474472287-4d71bcdd2085'),
    u('photo-1554118811-1e0d58224f24'),
    u('photo-1498804103079-a6351b050096'),
  ],
  'home-decor': [
    u('photo-1513519245088-0e12902e5a38'),
    u('photo-1586023492125-27b2c045efd7'),
    u('photo-1616486338812-3dadae4b4ace'),
    u('photo-1615529182904-14819c35db37'),
  ],
  footwear: [
    u('photo-1542291026-7eec264c27ff'),
    u('photo-1549298916-b41d501d3772'),
    u('photo-1595950653106-6c9ebd614d3a'),
    u('photo-1560769629-975ec94e6a86'),
  ],
  watches: [
    u('photo-1524805444758-089113d48a6d'),
    u('photo-1522312346375-d1a52e2b99b3'),
    u('photo-1547996160-81dfa63595aa'),
    u('photo-1533139502658-0198f920d8e8'),
  ],
  flower: [
    u('photo-1561181286-d3fee7d55364'),
    u('photo-1487070183336-b863922373d4'),
    u('photo-1519378058457-4c29a0a2efac'),
    u('photo-1526047932273-341f2a7631f9'),
  ],
  toys: [
    u('photo-1515488042361-404e9250afef'),
    u('photo-1596461404969-9ae70f2830c1'),
    u('photo-1558060370-d644479cb6f7'),
    u('photo-1587654780291-39c9404d746b'),
  ],
};

const GENERIC_IMAGES = [
  u('photo-1441986300917-64674bd600d8'),
  u('photo-1472851294608-062f824d29cc'),
  u('photo-1556740738-b6a63e27c4df'),
  u('photo-1534452203293-494d7ddbf7e0'),
  u('photo-1607082348824-0a96f2a4b9da'),
  u('photo-1483058712412-4245e9b90334'),
  u('photo-1542744173-8e7e53415bb0'),
  u('photo-1557821552-17105176677c'),
];

export type VariantSurface = 'dark' | 'light';
export type HeroLayout =
  | 'overlay'
  | 'split'
  | 'centered'
  | 'editorial'
  | 'minimal'
  | 'showcase'
  | 'diagonal'
  | 'spotlight';
export type EcomLoginLayout =
  | 'split-image'
  | 'centered-glass'
  | 'minimal-light'
  | 'dark-panel'
  | 'right-panel'
  | 'gradient-split'
  | 'boxed-center'
  | 'fullbleed-form';

export interface EcomVariantStyle {
  /** Suffix appended to the niche name, e.g. "Noir" -> "Fashion Noir" */
  suffix: string;
  surface: VariantSurface;
  heroLayout: HeroLayout;
  loginLayout: EcomLoginLayout;
  badge: string;
  tagline: (niche: string) => string;
  desc: (niche: string) => string;
}

export const VARIANT_STYLES: EcomVariantStyle[] = [
  {
    suffix: 'Noir',
    surface: 'dark',
    heroLayout: 'overlay',
    loginLayout: 'dark-panel',
    badge: 'Signature Collection',
    tagline: (n) => `The ${n.toLowerCase()} edit, after dark`,
    desc: (n) => `Moody, premium storefront for ${n.toLowerCase()} — full-bleed imagery, gold-standard product grid and a dark checkout flow.`,
  },
  {
    suffix: 'Ivory',
    surface: 'light',
    heroLayout: 'split',
    loginLayout: 'minimal-light',
    badge: 'New Season',
    tagline: (n) => `${n} essentials, beautifully organised`,
    desc: (n) => `Airy, minimal layout for ${n.toLowerCase()} — split hero, generous whitespace, and a catalogue that lets the products breathe.`,
  },
  {
    suffix: 'Vivid',
    surface: 'dark',
    heroLayout: 'centered',
    loginLayout: 'centered-glass',
    badge: 'Drop 04 · Live Now',
    tagline: (n) => `Loud, fast, unmistakably ${n.toLowerCase()}`,
    desc: (n) => `High-energy gradient storefront for ${n.toLowerCase()} — centred hero, marquee strip, and bold cards built for impulse buys.`,
  },
  {
    suffix: 'Editorial',
    surface: 'light',
    heroLayout: 'editorial',
    loginLayout: 'split-image',
    badge: 'The Journal',
    tagline: (n) => `${n}, told like a magazine`,
    desc: (n) => `Magazine-style layout for ${n.toLowerCase()} — asymmetric hero, serif accents and lookbook-style product storytelling.`,
  },
  {
    suffix: 'Mono',
    surface: 'light',
    heroLayout: 'minimal',
    loginLayout: 'boxed-center',
    badge: 'Less, but better',
    tagline: (n) => `${n}. Nothing you don’t need`,
    desc: (n) => `Stark monochrome storefront for ${n.toLowerCase()} — centred type-led hero, hairline rules and a quiet, confident product grid.`,
  },
  {
    suffix: 'Luxe',
    surface: 'dark',
    heroLayout: 'spotlight',
    loginLayout: 'right-panel',
    badge: 'By Appointment',
    tagline: (n) => `The art of ${n.toLowerCase()}`,
    desc: (n) => `Gallery-grade storefront for ${n.toLowerCase()} — spotlit hero, serif display, and a slow, considered browsing experience.`,
  },
  {
    suffix: 'Pop',
    surface: 'light',
    heroLayout: 'showcase',
    loginLayout: 'fullbleed-form',
    badge: 'New · New · New',
    tagline: (n) => `${n} that pops off the shelf`,
    desc: (n) => `Playful, colour-blocked storefront for ${n.toLowerCase()} — product-first showcase hero, chunky cards and a fun checkout.`,
  },
  {
    suffix: 'Aurora',
    surface: 'dark',
    heroLayout: 'diagonal',
    loginLayout: 'gradient-split',
    badge: 'Limited Drop',
    tagline: (n) => `${n}, dialled all the way up`,
    desc: (n) => `Gradient-soaked storefront for ${n.toLowerCase()} — diagonal split hero, aurora glow accents and neon call-to-actions.`,
  },
];

export interface EcomTheme {
  id: string;
  name: string;
  category: string;
  suffix: string;
  surface: VariantSurface;
  heroLayout: HeroLayout;
  loginLayout: EcomLoginLayout;
  badge: string;
  tagline: string;
  desc: string;
  primaryColor: string;
  secondaryColor: string;
  thumbnail: string;
  previewImage: string;
  heroImageUrl: string;
  bannerImageUrl: string;
  icon: string;
  isPremium: boolean;
  products: any[];
  fontFamily: string;
  /** Kept for compatibility with the existing themeConfig pipeline */
  cardStyle: string;
  layoutStyle: string;
  buttonRoundness: string;
  bannerStyle: string;
  bgColor: string;
  textColor: string;
}

/**
 * Returns exactly four distinct themes for a niche. Colours come from the
 * generated palette for that category; imagery, surface, layouts and copy
 * come from the variant definitions above.
 */
export function getEcomThemes(nicheId: string, nicheName?: string): EcomTheme[] {
  const base = ALL_THEMES_160.filter(
    (t) => t.category.toLowerCase() === nicheId.toLowerCase()
  );
  const images = NICHE_IMAGES[nicheId] || GENERIC_IMAGES;
  const display =
    nicheName ||
    nicheId.charAt(0).toUpperCase() + nicheId.slice(1).replace(/-./g, (x) => ' ' + x[1].toUpperCase());

  return VARIANT_STYLES.map((v, i) => {
    const b: any = base[i] || base[0] || {
      primaryColor: '#6366f1',
      secondaryColor: '#a5b4fc',
      icon: '🛍️',
      products: [],
      fontFamily: 'Inter',
    };
    const img = images[i % images.length];

    return {
      id: `${nicheId}-${v.suffix.toLowerCase()}`,
      name: `${display.split('&')[0].trim()} ${v.suffix}`,
      category: nicheId,
      suffix: v.suffix,
      surface: v.surface,
      heroLayout: v.heroLayout,
      loginLayout: v.loginLayout,
      badge: v.badge,
      tagline: v.tagline(display),
      desc: v.desc(display),
      primaryColor: b.primaryColor,
      secondaryColor: b.secondaryColor,
      thumbnail: img,
      previewImage: img,
      heroImageUrl: img,
      bannerImageUrl: img,
      icon: b.icon || '🛍️',
      isPremium: i === 0,
      products: b.products || [],
      fontFamily: b.fontFamily || 'Inter',
      cardStyle: b.cardStyle || 'classic-bordered',
      layoutStyle: b.layoutStyle || 'modern-grid',
      buttonRoundness: b.buttonRoundness || 'rounded-lg',
      bannerStyle: b.bannerStyle || 'full-bleed',
      bgColor: v.surface === 'dark' ? '#0b0b0f' : '#ffffff',
      textColor: v.surface === 'dark' ? '#ffffff' : '#0f172a',
    };
  });
}
