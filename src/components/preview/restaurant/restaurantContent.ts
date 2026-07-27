/**
 * Shared, category-aware content + theming for restaurant storefronts.
 * Used by the modern landing page so every one of the 24 templates gets
 * copy, imagery and an accent colour that match its niche.
 */

export const THEME_HEX: Record<string, string> = {
  // Wizard presets
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
  'rose-vintage': '#ec4899',
  'ruby-wine': '#e11d48',
  'indigo-ocean': '#4f46e5',
  // Legacy builder presets
  slate: '#64748b',
  deepblue: '#3b82f6',
  purple: '#7c3aed',
  sunset: '#f97316',
  emerald: '#10b981',
};

/** Accepts a preset id or a raw hex value and always returns a usable hex. */
export function resolveAccent(themePreset?: string): string {
  if (!themePreset) return '#c5a880';
  if (themePreset.startsWith('#')) return themePreset;
  return THEME_HEX[themePreset] || '#c5a880';
}

export interface NicheCopy {
  key: string;
  emoji: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  menuHeading: string;
  menuSub: string;
  storyHeading: string;
  storySub: string;
  ctaHeading: string;
  primaryCta: string;
  secondaryCta: string;
  bookLabel: string;
  heroImage: string;
  storyImage: string;
  facts: string[];
}

export interface DemoDish {
  name: string;
  desc: string;
  price: number;
  tag: string;
  img: string;
}

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

/** Normalises any category / niche / project name into a known niche key. */
export function resolveNiche(raw?: string | null): string {
  const c = (raw || '').toLowerCase();
  if (c.includes('fine dining') || c.includes('dining') || c.includes('bistro')) return 'fine-dining';
  if (c.includes('fast food') || c.includes('burger') || c.includes('steak')) return 'fast-food';
  if (c.includes('pizza') || c.includes('pasta') || c.includes('italia')) return 'pizza';
  if (c.includes('indian') || c.includes('punjabi') || c.includes('biryani') || c.includes('tandoori') || c.includes('saffron') || c.includes('bombay')) return 'indian';
  if (c.includes('cafe') || c.includes('coffee') || c.includes('tea') || c.includes('roastery') || c.includes('grind')) return 'cafe';
  if (c.includes('bakery') || c.includes('cake') || c.includes('bread') || c.includes('pastry') || c.includes('chocolat') || c.includes('dessert') || c.includes('waffle') || c.includes('sweet')) return 'bakery';
  if (c.includes('chinese') || c.includes('momo') || c.includes('asian') || c.includes('thai') || c.includes('japanese') || c.includes('sushi') || c.includes('noodle') || c.includes('wok') || c.includes('dragon')) return 'chinese';
  if (c.includes('vegan') || c.includes('vegetarian') || c.includes('healthy') || c.includes('salad') || c.includes('organic') || c.includes('citrus') || c.includes('botanical') || c.includes('meadow')) return 'vegan';
  return 'general';
}

const COPY: Record<string, NicheCopy> = {
  'fine-dining': {
    key: 'fine-dining',
    emoji: '🍽',
    eyebrow: 'Modern Fine Dining',
    heroTitle: 'A tasting menu worth the evening',
    heroSubtitle: 'Seasonal produce, restrained plating and a cellar built over twelve years. Reserve a table and let the pass take care of the rest.',
    menuHeading: 'Signature Selections',
    menuSub: 'Dishes the kitchen is known for, changing with the season.',
    storyHeading: 'Cooked with intent.\nServed with care.',
    storySub: 'Every plate that leaves our pass is built on sourcing we can vouch for and technique refined over years.',
    ctaHeading: 'Reserve your table tonight',
    primaryCta: 'Reserve a Table',
    secondaryCta: 'View Full Menu',
    bookLabel: 'Book a Table',
    heroImage: u('photo-1414235077428-338989a2e8c0', 1600),
    storyImage: u('photo-1517248135467-4c7edcad34c4', 900),
    facts: ['Locally sourced, seasonal produce', 'Cellar of 400+ labels', 'Chef’s counter seating available'],
  },
  'fast-food': {
    key: 'fast-food',
    emoji: '🍔',
    eyebrow: 'Flame-Grilled Daily',
    heroTitle: 'Big flavour, no waiting around',
    heroSubtitle: 'Smash patties, buttermilk-fried chicken and skin-on fries. Order ahead for pickup or grab a booth.',
    menuHeading: 'The Lineup',
    menuSub: 'Everything grilled to order. Nothing sits under a lamp.',
    storyHeading: 'Fast doesn’t mean\ncutting corners.',
    storySub: 'We grind our beef daily, brine the chicken for 24 hours, and cut the potatoes in-house every morning.',
    ctaHeading: 'Hungry? Order in 60 seconds',
    primaryCta: 'Order Now',
    secondaryCta: 'See the Menu',
    bookLabel: 'Order Online',
    heroImage: u('photo-1568901346375-23c9450c58cd', 1600),
    storyImage: u('photo-1550547660-d9450f859349', 900),
    facts: ['Beef ground fresh every morning', '24-hour buttermilk brine', 'Hand-cut fries, twice fried'],
  },
  pizza: {
    key: 'pizza',
    emoji: '🍕',
    eyebrow: 'Wood-Fired Since Day One',
    heroTitle: 'Naples rules. Stone oven. 90 seconds.',
    heroSubtitle: 'San Marzano tomatoes, 48-hour cold-fermented dough and a 450°C stone deck. Dine in or take away.',
    menuHeading: 'From the Oven',
    menuSub: 'Classic Neapolitan pies alongside house pastas.',
    storyHeading: '48-hour dough.\nNinety-second bake.',
    storySub: 'Our starter has been going for six years. The oven runs at 450°C and every pie is turned by hand.',
    ctaHeading: 'Book a table or order a pie',
    primaryCta: 'Order a Pizza',
    secondaryCta: 'View Full Menu',
    bookLabel: 'Book a Table',
    heroImage: u('photo-1513104890138-7c749659a591', 1600),
    storyImage: u('photo-1590947132387-155cc02f3212', 900),
    facts: ['48-hour cold-fermented dough', 'DOP San Marzano tomatoes', 'Imported stone deck oven'],
  },
  indian: {
    key: 'indian',
    emoji: '🍛',
    eyebrow: 'Clay Oven & Slow Gravies',
    heroTitle: 'Spice, smoke and slow-cooked patience',
    heroSubtitle: 'Tandoor-charred kebabs, overnight dal and biryani sealed under dough. Cooked the way it should be.',
    menuHeading: 'Our Specialities',
    menuSub: 'Whole spices ground in-house, every single morning.',
    storyHeading: 'Whole spices.\nGround each morning.',
    storySub: 'Nothing pre-mixed and nothing shortcut. The dal simmers overnight and the biryani is sealed and baked to order.',
    ctaHeading: 'Reserve a table for tonight',
    primaryCta: 'Reserve a Table',
    secondaryCta: 'View Full Menu',
    bookLabel: 'Book a Table',
    heroImage: u('photo-1633945274405-b6c8069047b0', 1600),
    storyImage: u('photo-1601050690597-df056fb4ce78', 900),
    facts: ['Spices ground fresh daily', 'Overnight-simmered dal makhani', 'Traditional sealed dum biryani'],
  },
  cafe: {
    key: 'cafe',
    emoji: '☕',
    eyebrow: 'Speciality Roastery',
    heroTitle: 'Good coffee, unhurried mornings',
    heroSubtitle: 'Single-origin beans roasted in-house, laminated pastries baked at dawn, and a room built for lingering.',
    menuHeading: 'Brews & Bakes',
    menuSub: 'Roasted on site. Pastries laminated over three days.',
    storyHeading: 'Roasted here.\nPoured with care.',
    storySub: 'We cup every batch before it goes on bar, and our pastry team laminates dough over three days for the croissants.',
    ctaHeading: 'Grab a seat or order ahead',
    primaryCta: 'Order Ahead',
    secondaryCta: 'See the Menu',
    bookLabel: 'Reserve a Seat',
    heroImage: u('photo-1501339847302-ac426a4a7cbb', 1600),
    storyImage: u('photo-1498804103079-a6351b050096', 900),
    facts: ['Single-origin, roasted in-house', 'Three-day laminated pastry', 'Free wifi and power at every seat'],
  },
  bakery: {
    key: 'bakery',
    emoji: '🍰',
    eyebrow: 'Baked Fresh Daily',
    heroTitle: 'Designer cakes and morning sourdough',
    heroSubtitle: 'Celebration cakes made to order, French pastry cases refilled twice a day, and bread pulled warm from the deck.',
    menuHeading: 'Pastry & Cake Cases',
    menuSub: 'Everything made by hand, in small batches.',
    storyHeading: 'Butter, flour,\nand a lot of patience.',
    storySub: 'French cultured butter, single-origin chocolate and a naturally leavened starter we have kept alive for years.',
    ctaHeading: 'Order a celebration cake',
    primaryCta: 'Order Cakes',
    secondaryCta: 'Browse the Cases',
    bookLabel: 'Custom Cake Order',
    heroImage: u('photo-1578985545062-69928b1d9587', 1600),
    storyImage: u('photo-1509365465985-25d11c17e812', 900),
    facts: ['French cultured butter only', 'Naturally leavened sourdough', 'Bespoke celebration cakes to order'],
  },
  chinese: {
    key: 'chinese',
    emoji: '🥢',
    eyebrow: 'Wok Fire & Steam Baskets',
    heroTitle: 'Breath of the wok, every plate',
    heroSubtitle: 'Hand-pleated dumplings, fiery Schezwan and noodles pulled to order over roaring wok fire.',
    menuHeading: 'Wok & Steamer',
    menuSub: 'Dumplings pleated by hand throughout service.',
    storyHeading: 'High heat.\nFast hands.',
    storySub: 'Our wok station runs hot all service so every dish carries that unmistakable char. Dumplings are folded to order.',
    ctaHeading: 'Book a table or order in',
    primaryCta: 'Order Now',
    secondaryCta: 'View Full Menu',
    bookLabel: 'Book a Table',
    heroImage: u('photo-1563245372-f21724e3856d', 1600),
    storyImage: u('photo-1585032226651-759b368d7246', 900),
    facts: ['Dumplings hand-pleated to order', 'Sichuan peppercorns imported direct', 'Wok station at full flame all service'],
  },
  vegan: {
    key: 'vegan',
    emoji: '🥗',
    eyebrow: 'Plant-Based & Organic',
    heroTitle: 'Vegetables, treated like the main event',
    heroSubtitle: 'Organic produce from growers we know by name, cold-pressed juices, and bowls built for actual nourishment.',
    menuHeading: 'Bowls & Cold Press',
    menuSub: 'Certified organic, zero-waste prep kitchen.',
    storyHeading: 'From growers\nwe know by name.',
    storySub: 'We buy direct from four organic farms, press juice the same morning, and compost everything the kitchen cannot use.',
    ctaHeading: 'Eat well today',
    primaryCta: 'Order a Bowl',
    secondaryCta: 'See the Menu',
    bookLabel: 'Reserve a Table',
    heroImage: u('photo-1512621776951-a57141f2eefd', 1600),
    storyImage: u('photo-1540420773420-3366772f4999', 900),
    facts: ['Certified organic produce', 'Zero-waste prep kitchen', 'Cold-pressed the same morning'],
  },
  general: {
    key: 'general',
    emoji: '🍽',
    eyebrow: 'All-Day Kitchen',
    heroTitle: 'A room worth coming back to',
    heroSubtitle: 'An all-day menu built on good produce, a proper bar, and service that actually pays attention.',
    menuHeading: 'What We’re Serving',
    menuSub: 'Small plates, mains and a bar list worth exploring.',
    storyHeading: 'Good produce.\nProper service.',
    storySub: 'We keep the menu tight so everything on it is worth ordering, and we change it whenever the season says so.',
    ctaHeading: 'Reserve your table tonight',
    primaryCta: 'Reserve a Table',
    secondaryCta: 'View Full Menu',
    bookLabel: 'Book a Table',
    heroImage: u('photo-1485686531765-ba63b07845a7', 1600),
    storyImage: u('photo-1552566626-52f8b828add9', 900),
    facts: ['Seasonal, tightly edited menu', 'Full bar and natural wine list', 'Walk-ins welcome at the counter'],
  },
};

export function getNicheCopy(raw?: string | null): NicheCopy {
  return COPY[resolveNiche(raw)] || COPY.general;
}

const DISHES: Record<string, DemoDish[]> = {
  pizza: [
    { name: 'Margherita Classica', desc: 'San Marzano tomato, fior di latte, fresh basil.', price: 299, tag: 'Bestseller', img: u('photo-1513104890138-7c749659a591') },
    { name: 'Double Pepperoni', desc: 'Spiced pepperoni, aged mozzarella, chilli honey.', price: 399, tag: 'Spicy', img: u('photo-1534308983496-4fabb1a015ee') },
    { name: 'Truffle Funghi', desc: 'Wild mushrooms, truffle cream, parmesan shavings.', price: 449, tag: 'Chef Pick', img: u('photo-1590947132387-155cc02f3212') },
    { name: 'Garlic Cheese Bread', desc: 'Wood-fired baguette, garlic butter, mozzarella.', price: 179, tag: 'Sides', img: u('photo-1573140247632-f8fd74997d5c') },
    { name: 'Rigatoni Arrabbiata', desc: 'Slow tomato sugo, chilli, torn basil, pecorino.', price: 349, tag: 'Pasta', img: u('photo-1621996346565-e3dbc646d9a9') },
    { name: 'Tiramisu Classico', desc: 'Espresso-soaked savoiardi, mascarpone, cocoa.', price: 199, tag: 'Dessert', img: u('photo-1571877227200-a0d98ea607e9') },
  ],
  indian: [
    { name: 'Butter Chicken Masala', desc: 'Tandoori chicken in silky tomato butter gravy.', price: 349, tag: 'Bestseller', img: u('photo-1603894584373-5ac82b2ae398') },
    { name: 'Paneer Tikka Lababdar', desc: 'Charred cottage cheese, cashew-tomato makhani.', price: 299, tag: 'Veg', img: u('photo-1631452180519-c014fe946bc7') },
    { name: 'Chicken Dum Biryani', desc: 'Sealed handi, aged basmati, saffron, fried onion.', price: 379, tag: 'Signature', img: u('photo-1633945274405-b6c8069047b0') },
    { name: 'Dal Makhani', desc: 'Black lentils simmered overnight with cream.', price: 249, tag: 'Slow Cooked', img: u('photo-1546833999-b9f581a1996d') },
    { name: 'Garlic Butter Naan', desc: 'Clay-oven flatbread, garlic, coriander butter.', price: 69, tag: 'Breads', img: u('photo-1601050690597-df056fb4ce78') },
    { name: 'Rose Kulfi Falooda', desc: 'Cardamom kulfi, rose syrup, vermicelli, nuts.', price: 189, tag: 'Dessert', img: u('photo-1587314168485-3236d6710814') },
  ],
  'fast-food': [
    { name: 'Signature Smash Burger', desc: 'Double patty, aged cheddar, house burger sauce.', price: 279, tag: 'Bestseller', img: u('photo-1568901346375-23c9450c58cd') },
    { name: 'Crispy Chicken Stacker', desc: 'Buttermilk fried thigh, slaw, spicy mayo.', price: 259, tag: 'Spicy', img: u('photo-1606755962773-d324e0a13086') },
    { name: 'Loaded Cheese Fries', desc: 'Skin-on fries, molten cheddar, jalapeños.', price: 179, tag: 'Share', img: u('photo-1573080496219-bb080dd4f877') },
    { name: 'Buffalo Wings (8pc)', desc: 'Flame-grilled wings tossed in buffalo glaze.', price: 299, tag: 'Hot', img: u('photo-1608039755401-742074f0548d') },
    { name: 'Crispy Onion Rings', desc: 'Thick-cut rings, beer batter, chipotle dip.', price: 139, tag: 'Sides', img: u('photo-1639024471283-2bc7b3c6a267') },
    { name: 'Thick Chocolate Shake', desc: 'Belgian cocoa, vanilla ice cream, whipped top.', price: 189, tag: 'Drinks', img: u('photo-1572490122747-3968b75cc699') },
  ],
  cafe: [
    { name: 'Espresso Macchiato', desc: 'Single-origin ristretto, dollop of microfoam.', price: 149, tag: 'Classic', img: u('photo-1510972527407-cbd5e77fb736') },
    { name: 'Caramel Latte', desc: 'Double shot, steamed milk, salted caramel.', price: 209, tag: 'Bestseller', img: u('photo-1541167760496-1628856ab772') },
    { name: 'Cold Brew Tonic', desc: '18-hour cold brew, tonic, orange peel.', price: 229, tag: 'Cold', img: u('photo-1461023058943-07fcbe16d735') },
    { name: 'Butter Croissant', desc: 'Laminated 72 hours, French cultured butter.', price: 139, tag: 'Bakery', img: u('photo-1555507036-ab1f4038808a') },
    { name: 'Avocado Sourdough', desc: 'Smashed avocado, chilli flakes, poached egg.', price: 269, tag: 'All Day', img: u('photo-1541532713592-79a0317b6b77') },
    { name: 'Basque Cheesecake', desc: 'Burnt-top cheesecake, vanilla bean, sea salt.', price: 249, tag: 'Dessert', img: u('photo-1524351199678-941a58a3df50') },
  ],
  bakery: [
    { name: 'Chocolate Fudge Cake', desc: 'Triple layer sponge, dark ganache, cocoa nib.', price: 379, tag: 'Bestseller', img: u('photo-1578985545062-69928b1d9587') },
    { name: 'Red Velvet Cupcake', desc: 'Buttermilk crumb, cream cheese frosting.', price: 99, tag: 'Popular', img: u('photo-1614707267537-b85acf00c4b8') },
    { name: 'French Macarons (6pc)', desc: 'Raspberry, pistachio, salted caramel shells.', price: 329, tag: 'Gift Box', img: u('photo-1569864358642-9d1684040f43') },
    { name: 'Cinnamon Swirl Bun', desc: 'Soft brioche, cinnamon sugar, vanilla glaze.', price: 149, tag: 'Fresh', img: u('photo-1509365465985-25d11c17e812') },
    { name: 'Artisan Sourdough', desc: 'Naturally leavened, 24-hour cold ferment.', price: 199, tag: 'Loaves', img: u('photo-1585478259715-876acc5be8eb') },
    { name: 'Strawberry Tart', desc: 'Almond frangipane, crème pâtissière, berries.', price: 289, tag: 'Seasonal', img: u('photo-1488477181946-6428a0291777') },
  ],
  chinese: [
    { name: 'Steamed Momos (8pc)', desc: 'Hand-pleated wrappers, minced veg, chilli oil.', price: 159, tag: 'Bestseller', img: u('photo-1534422298391-e4f8c172dddb') },
    { name: 'Veg Hakka Noodles', desc: 'Wok-tossed noodles, julienned veg, light soy.', price: 199, tag: 'Noodles', img: u('photo-1585032226651-759b368d7246') },
    { name: 'Schezwan Fried Rice', desc: 'Fiery Schezwan paste, scallion, burnt garlic.', price: 209, tag: 'Spicy', img: u('photo-1603133872878-696658804445') },
    { name: 'Kung Pao Chicken', desc: 'Sichuan pepper, roasted peanuts, dried chilli.', price: 329, tag: 'Signature', img: u('photo-1525755662778-989d0524087e') },
    { name: 'Crispy Spring Rolls', desc: 'Golden pastry, seasoned cabbage, sweet chilli.', price: 149, tag: 'Starters', img: u('photo-1544025162-d76694265947') },
    { name: 'Honey Chilli Potato', desc: 'Crisp batons, honey glaze, toasted sesame.', price: 189, tag: 'Share', img: u('photo-1541592106381-b31e9677c0e5') },
  ],
  vegan: [
    { name: 'Avocado Quinoa Bowl', desc: 'Organic quinoa, kale, edamame, lemon dressing.', price: 299, tag: 'Bestseller', img: u('photo-1512621776951-a57141f2eefd') },
    { name: 'Falafel Mezze Wrap', desc: 'Crisp falafel, hummus, pickled cucumber, pita.', price: 229, tag: 'Wraps', img: u('photo-1540420773420-3366772f4999') },
    { name: 'Vegan Buddha Bowl', desc: 'Roast sweet potato, chickpea, tahini, brown rice.', price: 319, tag: 'High Protein', img: u('photo-1546069901-ba9599a7e63c') },
    { name: 'Green Detox Press', desc: 'Apple, cucumber, celery, spinach, lemon.', price: 169, tag: 'Cold Press', img: u('photo-1610970881699-44a5587caa90') },
    { name: 'Beetroot Hummus Plate', desc: 'Whipped beet hummus, dukkah, seeded crackers.', price: 249, tag: 'Share', img: u('photo-1505576399279-565b52d4ac71') },
    { name: 'Chia Berry Parfait', desc: 'Coconut yoghurt, chia, seasonal berries, granola.', price: 209, tag: 'Dessert', img: u('photo-1488477181946-6428a0291777') },
  ],
  'fine-dining': [
    { name: 'Truffle Tagliatelle', desc: 'Hand-rolled pasta, winter truffle, aged parmesan.', price: 650, tag: 'Signature', img: u('photo-1546549032-9571cd6b27df') },
    { name: 'Pan-Seared Sea Bass', desc: 'Saffron emulsion, heirloom carrot, dill oil.', price: 950, tag: 'Chef Pick', img: u('photo-1519708227418-c8fd9a32b7a2') },
    { name: 'Wagyu Striploin', desc: 'Dry-aged 45 days, bone marrow jus, confit shallot.', price: 1850, tag: 'Premium', img: u('photo-1555996273-367ea4eb4db5') },
    { name: 'Citrus Garden Salad', desc: 'Fennel, orange, toasted almond, herb vinaigrette.', price: 320, tag: 'Starters', img: u('photo-1512621776951-a57141f2eefd') },
    { name: 'Sparkling Yuzu Spritz', desc: 'Yuzu, elderflower, soda, crisp citrus finish.', price: 220, tag: 'Bar', img: u('photo-1551024709-8f23befc6d3a') },
    { name: 'Valrhona Soufflé', desc: 'Warm dark chocolate soufflé, vanilla bean cream.', price: 420, tag: 'Dessert', img: u('photo-1571877227200-a0d98ea607e9') },
  ],
};

DISHES.general = DISHES['fine-dining'];

export function getNicheDishes(raw?: string | null): DemoDish[] {
  return DISHES[resolveNiche(raw)] || DISHES.general;
}

export const RESTAURANT_GALLERY = [
  'photo-1517248135467-4c7edcad34c4',
  'photo-1552566626-52f8b828add9',
  'photo-1466978913421-dad2ebd01d17',
  'photo-1414235077428-338989a2e8c0',
  'photo-1424847651672-bf20a4b0982b',
  'photo-1559339352-11d035aa65de',
].map((id) => u(id, 700));

export const RESTAURANT_REVIEWS = [
  { n: 'Ananya Rao', r: 'Food Critic', q: 'The plating is restrained and the flavours are confident. Easily a repeat visit.' },
  { n: 'Marcus Lee', r: 'Regular guest', q: 'Booking took ten seconds and the table was ready on the minute. Service is genuinely sharp.' },
  { n: 'Priya Nair', r: 'Local guide', q: 'Consistent every single time. The seasonal menu keeps it interesting without losing the classics.' },
];
