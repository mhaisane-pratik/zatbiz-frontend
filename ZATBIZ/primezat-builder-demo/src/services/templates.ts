export const NICHE_DETAILS: Record<string, {
  title: string;
  subtitle: string;
  heroImage: string;
  theme: 'slate' | 'sunset' | 'deepblue' | 'purple';
  logoIcon: string;
}> = {
  cloth: {
    title: 'Fashion & Apparel Boutique',
    subtitle: 'Discover the latest runway trends, premium clothing collections, and everyday essentials designed for comfort and elegance.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '👕'
  },
  fashion_men: {
    title: "Men's Fashion Boutique",
    subtitle: "Upgrade your wardrobe with premium shirts, classic chinos, and authentic leather jackets crafted for modern men.",
    heroImage: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '👕'
  },
  fashion_women: {
    title: "Women's Fashion Boutique",
    subtitle: "Explore elegant summer dresses, designer handbags, and casual blazers tailored for your everyday grace.",
    heroImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '👗'
  },
  fashion_kids: {
    title: "Kids Fashion Corner",
    subtitle: "Durable dungarees, cartoon hoodies, and soft cotton sleepwear sets to keep your little ones cozy and stylish.",
    heroImage: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '🧸'
  },
  fashion_footwear: {
    title: "Premium Footwear Collection",
    subtitle: "Step into comfort and style with elite running sneakers, classic leather loafers, and active outdoor footwear.",
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '👟'
  },
  electronics_mobile: {
    title: "Mobiles & Smart Devices",
    subtitle: "Stay connected with flagship 5G smartphones, premium phone cases, and high-quality charging accessories.",
    heroImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    theme: 'deepblue',
    logoIcon: '📱'
  },
  electronics_laptop: {
    title: "Laptops & Computing Hub",
    subtitle: "Unleash high performance with next-gen gaming laptops, light-weight ultrabooks, and ergonomic workstation setups.",
    heroImage: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=800&auto=format&fit=crop&q=80',
    theme: 'deepblue',
    logoIcon: '💻'
  },
  electronics_accessories: {
    title: "Premium Tech Accessories",
    subtitle: "Enhance your digital gear with wireless noise-cancelling headphones, ergonomic mice, and multi-port USB-C hubs.",
    heroImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    theme: 'deepblue',
    logoIcon: '🎧'
  },
  electronics_smartwatch: {
    title: "Smart Watches & Trackers",
    subtitle: "Monitor your fitness levels and receive notifications on the go with premium GPS sports watches.",
    heroImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    theme: 'deepblue',
    logoIcon: '⌚'
  },
  grocery: {
    title: 'Fresh & Organic Groceries',
    subtitle: 'Fresh farm produce, organic greens, dairy, bakery products, and household essentials delivered straight to your doorstep.',
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🍎'
  },
  grocery_fruits: {
    title: "Fresh Fruit Mart",
    subtitle: "Fresh organic Gala apples, seedless grapes, and premium Alphonso mangoes delivered fresh to your doorstep.",
    heroImage: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🍎'
  },
  grocery_vegetables: {
    title: "Organic Vegetables Bazaar",
    subtitle: "Nutrient-rich broccoli, organic red tomatoes, and farm-fresh potatoes picked daily from certified eco-orchards.",
    heroImage: 'https://images.unsplash.com/photo-1566385101042-1a010c129fa6?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🥦'
  },
  grocery_essential: {
    title: "Daily Essentials & Dairy",
    subtitle: "Farm-fresh milk, organic eggs, and high-fiber multi-grain breads to fuel your family's morning routines.",
    heroImage: 'https://images.unsplash.com/photo-1584263343329-74f157f461b8?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🥛'
  },
  pet_food: {
    title: "Premium Pet Food & Treats",
    subtitle: "High-protein dry dog food, delicious wet cat food gravies, and healthy baked treats for your loving pets.",
    heroImage: 'https://images.unsplash.com/photo-1589721062230-fb10c85c2c7e?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🥩'
  },
  pet_accessories: {
    title: "Pet Accessories & Comfort",
    subtitle: "Durable nylon harnesses, interactive laser toys, and warm fleece cushioned pet beds for maximum comfort.",
    heroImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🐕'
  },
  pet_medicines: {
    title: "Pet Care & Medicines",
    subtitle: "Tick and flea preventative drops, multivitamin syrups, and soothing ear cleaners recommended by top veterinarians.",
    heroImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '💊'
  },
  books_education: {
    title: "Educational & Reference Books",
    subtitle: "High school physics textbooks, master data structures guides, and organic chemistry reference materials.",
    heroImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&auto=format&fit=crop&q=80',
    theme: 'purple',
    logoIcon: '📓'
  },
  books_novels: {
    title: "Best-Selling Novels & Fiction",
    subtitle: "Immerse yourself in romance, thrilling mystery novels, and premium hardcover sci-fi space odysseys.",
    heroImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
    theme: 'purple',
    logoIcon: '📖'
  },
  books_ebook: {
    title: "Digital E-Books & Manuals",
    subtitle: "Download startup manuals, UI/UX guides, and mindfulness e-pubs directly to your e-reader devices.",
    heroImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    theme: 'purple',
    logoIcon: '📱'
  },
  electronics: {
    title: 'Next-Gen Electronics Hub',
    subtitle: 'Stay ahead of tech curves with cutting-edge laptops, gaming rigs, mechanical keyboards, headphones, and smart home gadgets.',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
    theme: 'deepblue',
    logoIcon: '💻'
  },
  beauty: {
    title: 'Radiant Beauty & Cosmetics',
    subtitle: 'Luxurious organic skincare serums, dermatologist-approved makeup, natural hair care, and signature fragrances for your everyday glow.',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
    theme: 'purple',
    logoIcon: '💄'
  },
  books: {
    title: 'Stationery & Literature Nest',
    subtitle: 'Best-selling novels, academic reference books, premium notebooks, luxury pens, and inspiring stationery collections.',
    heroImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '📚'
  },
  home: {
    title: 'Modern Home & Furniture',
    subtitle: 'Ergonomic office desks, minimalist living room couches, elegant wooden tables, aesthetic lightings, and handcrafted home decors.',
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '🛋️'
  },
  sports: {
    title: 'Elite Sports & Fitness Gear',
    subtitle: 'Heavy dumbbells, professional gym apparel, running gear, high-quality basketballs, and nutrition supplements to fuel your journey.',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    theme: 'purple',
    logoIcon: '⚽'
  },
  toys: {
    title: 'Creative Toys & Kids Games',
    subtitle: 'Educational wood blocks, interactive coding toys, board games, cute plushies, and outdoor activities to spark young imaginations.',
    heroImage: 'https://images.unsplash.com/photo-1537655780520-1e392edd816a?w=800&auto=format&fit=crop&q=80',
    theme: 'sunset',
    logoIcon: '🧸'
  },
  jewelry: {
    title: 'Luxury Jewelry & Accessories',
    subtitle: 'Stunning 18k gold necklaces, sterling silver rings, luxury mechanical watches, and diamond earrings crafted to perfection.',
    heroImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    theme: 'purple',
    logoIcon: '💎'
  },
  pharmacy: {
    title: 'Care & Wellness Pharmacy',
    subtitle: 'Essential prescription medicines, first-aid kits, herbal dietary supplements, vitamins, and medical care tools.',
    heroImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    theme: 'deepblue',
    logoIcon: '💊'
  },
  footwear: {
    title: 'Premium Footwear & Sneakers',
    subtitle: 'Running trainers, formal leather shoes, beach sandals, and comfortable daily sneakers tailored for performance and style.',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '👟'
  },
  automotive: {
    title: 'Automotive Parts & Hardware',
    subtitle: 'Engine oils, professional wrench sets, custom alloy wheels, premium car wax, and emergency hardware tools.',
    heroImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    theme: 'slate',
    logoIcon: '🚗'
  }
};

export function getRestaurantPreset(categoryName: string, brandName: string, slogan: string) {
  const nameLower = (categoryName || '').toLowerCase();

  // 1. Pizza
  if (nameLower.includes('pizza')) {
    return {
      title: `Artisanal Wood-Fired Pizza at ${brandName}`,
      subtitle: slogan || 'Crispy thin-crust, fresh mozzarella, and hand-plucked basil baked to perfection in our traditional stone oven.',
      heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80',
      theme: 'sunset' as const,
      features: [
        { icon: '🍕', title: 'Wood-Fired Oven', desc: 'Stone-baked at 450°C for the perfect smoky, bubbly crust.' },
        { icon: '🍅', title: 'San Marzano Sauce', desc: 'Made with authentic vine-ripened Italian tomatoes and herbs.' },
        { icon: '🧀', title: 'Fresh Mozzarella', desc: 'Local, hand-stretched mozzarella delivered fresh daily.' }
      ],
      menuItems: [
        { title: 'Margherita DOC', price: '₹349', features: ['San Marzano tomatoes', 'Buffalo mozzarella', 'Fresh basil', 'Extra virgin olive oil'], isFeatured: false },
        { title: 'Truffle Mushroom Pizza', price: '₹499', features: ['Wild forest mushrooms', 'White truffle oil', 'Fresh rosemary', 'Aged parmesan'], isFeatured: true }
      ],
      faqs: [
        { question: 'Do you offer gluten-free pizza crusts?', answer: 'Yes, we offer gluten-free bases for all our pizzas prepared in a dedicated gluten-free zone.' },
        { question: 'Can I customize the toppings?', answer: 'Absolutely! You can choose from our wide selection of gourmet cheese, fresh vegetables, and premium cured meats.' }
      ]
    };
  }

  // 2. Indian
  if (
    nameLower.includes('indian') ||
    nameLower.includes('punjabi') ||
    nameLower.includes('gujarati') ||
    nameLower.includes('rajasthani') ||
    nameLower.includes('bengali') ||
    nameLower.includes('hyderabadi') ||
    nameLower.includes('kerala') ||
    nameLower.includes('andhra') ||
    nameLower.includes('tamil') ||
    nameLower.includes('kashmiri') ||
    nameLower.includes('maharashtrian') ||
    nameLower.includes('biryani') ||
    nameLower.includes('tandoori')
  ) {
    return {
      title: `Experience the Royal Flavors of India at ${brandName}`,
      subtitle: slogan || 'A rich tapestry of aromatic spices, slow-cooked curries, and fire-baked tandoori breads crafted with heritage recipes.',
      heroImage: 'https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=1200&auto=format&fit=crop&q=80',
      theme: 'sunset' as const,
      features: [
        { icon: '🍛', title: 'Aromatic Spices', desc: 'Hand-ground spice blends roasted daily in our kitchens.' },
        { icon: '🔥', title: 'Traditional Tandoor', desc: 'Naans and kebabs baked in a traditional clay oven.' },
        { icon: '🍚', title: 'Heritage Dum Biryani', desc: 'Slow-cooked basmati rice layered with fragrant herbs.' }
      ],
      menuItems: [
        { title: 'Paneer Butter Masala', price: '₹320', features: ['Soft cottage cheese cubes', 'Rich tomato-cashew gravy', 'Fresh cream & butter'], isFeatured: false },
        { title: 'Royal Hyderabadi Biryani', price: '₹380', features: ['Fragrant long-grain basmati', 'Traditional spice blend', 'Saffron infusion', 'Raita side'], isFeatured: true }
      ],
      faqs: [
        { question: 'Can I adjust the spice levels?', answer: 'Yes! All our dishes can be prepared from mild to extra spicy according to your preference.' },
        { question: 'Are your dishes suitable for vegetarians?', answer: 'We offer an extensive selection of 100% vegetarian entrees cooked in separate utensils.' }
      ]
    };
  }

  // 3. Cafe / Coffee / Tea
  if (
    nameLower.includes('cafe') ||
    nameLower.includes('coffee') ||
    nameLower.includes('tea') ||
    nameLower.includes('roastery') ||
    nameLower.includes('juice') ||
    nameLower.includes('smoothie')
  ) {
    return {
      title: `Artisanal Coffee & Fresh Bakes at ${brandName}`,
      subtitle: slogan || 'Freshly roasted single-origin espresso, delicate loose-leaf teas, and warm handmade pastries served in a cozy space.',
      heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
      theme: 'purple' as const,
      features: [
        { icon: '☕', title: 'Single-Origin Beans', desc: 'Sourced ethically and roasted in-house to bring out unique flavor profiles.' },
        { icon: '🥐', title: 'Daily Handmade Bakes', desc: 'Flaky butter croissants and sweet pastries baked fresh every morning.' },
        { icon: '🍃', title: 'Organic Loose Tea', desc: 'Handpicked green, black, and herbal infusions from premium gardens.' }
      ],
      menuItems: [
        { title: 'Signature Flat White', price: '₹180', features: ['Double shot single-origin espresso', 'Silky steamed microfoam', 'Artisanal latte art'], isFeatured: false },
        { title: 'Almond Croissant', price: '₹220', features: ['Flaky house-baked butter pastry', 'Creamy sweet frangipane filling', 'Toasted sliced almonds'], isFeatured: true }
      ],
      faqs: [
        { question: 'Do you offer non-dairy milk options?', answer: 'Yes! We offer organic oat milk, almond milk, and soy milk at no extra charge.' },
        { question: 'Is there free Wi-Fi for remote work?', answer: 'Definitely. High-speed Wi-Fi is available for all guests. We also have dedicated quiet corners.' }
      ]
    };
  }

  // 4. Bakery / Cake
  if (nameLower.includes('bakery') || nameLower.includes('cake') || nameLower.includes('bread') || nameLower.includes('pastry') || nameLower.includes('chocolate') || nameLower.includes('sweet') || nameLower.includes('ice cream') || nameLower.includes('parlour')) {
    return {
      title: `Artisanal Breads & Gourmet Pastries at ${brandName}`,
      subtitle: slogan || 'Warm croissants, sourdough loaves, and custom celebration cakes handcrafted with premium natural ingredients.',
      heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80',
      theme: 'purple' as const,
      features: [
        { icon: '🥐', title: 'Fresh Pastries', desc: 'Flaky, buttery pastries baked in small batches throughout the day.' },
        { icon: '🍞', title: 'Sourdough Breads', desc: 'Fermented naturally for 24 hours with organic flour and sea salt.' },
        { icon: '🍰', title: 'Custom Cakes', desc: 'Tailor-made celebration cakes designed for your special occasions.' }
      ],
      menuItems: [
        { title: 'Chocolate Hazelnut Tart', price: '₹240', features: ['Rich dark chocolate ganache', 'Roasted hazelnut crust', 'Sea salt flake garnish'], isFeatured: false },
        { title: 'Organic Sourdough Loaf', price: '₹290', features: ['Wild yeast sourdough starter', 'Crispy caramelised crust', 'Soft airy crumb'], isFeatured: true }
      ],
      faqs: [
        { question: 'How far in advance should I order custom cakes?', answer: 'We recommend placing orders for custom celebration cakes at least 48 hours in advance.' },
        { question: 'Do you have eggless options?', answer: 'Yes! Most of our cakes and pastries can be ordered in 100% eggless variants.' }
      ]
    };
  }

  // 5. Vegetarian / Vegan / Jain
  if (nameLower.includes('vegetarian') || nameLower.includes('vegan') || nameLower.includes('jain') || nameLower.includes('healthy') || nameLower.includes('organic')) {
    return {
      title: `100% Plant-Based Nourishment at ${brandName}`,
      subtitle: slogan || 'Nutrient-dense bowls, organic seasonal salads, and delicious vegan comfort foods crafted to fuel your body and soul.',
      heroImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80',
      theme: 'emerald' as const,
      features: [
        { icon: '🥗', title: '100% Vegan/Veg', desc: 'Strictly plant-based kitchen with zero animal product cross-contamination.' },
        { icon: '🌱', title: 'Farm-to-Table', desc: 'Fresh organic ingredients sourced directly from local bio-farms.' },
        { icon: '🍋', title: 'Superfood Infused', desc: 'Packed with natural seeds, antioxidants, and healthy greens.' }
      ],
      menuItems: [
        { title: 'Quinoa Avocado Bowl', price: '₹280', features: ['Organic red quinoa', 'Sliced fresh avocado', 'Baby spinach', 'Lemon tahini dressing'], isFeatured: false },
        { title: 'Vegan Truffle Risotto', price: '₹420', features: ['Creamy arborio rice', 'Wild mushrooms', 'House cashew cream', 'White truffle oil'], isFeatured: true }
      ],
      faqs: [
        { question: 'Are all your menu items dairy-free?', answer: 'Yes! Our entire kitchen is 100% vegan, meaning no dairy, eggs, or animal products are used.' },
        { question: 'Do you offer Jain food?', answer: 'We have a dedicated Jain menu prepared without root vegetables like onions, garlic, and potatoes.' }
      ]
    };
  }

  // 6. Fast Food / Burger
  if (nameLower.includes('fast food') || nameLower.includes('burger') || nameLower.includes('snack') || nameLower.includes('sandwich') || nameLower.includes('street food')) {
    return {
      title: `Gourmet Burgers & Crispy Sides at ${brandName}`,
      subtitle: slogan || 'Juicy flame-grilled burgers, golden crispy fries, and thick milkshakes prepared instantly with premium ingredients.',
      heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&auto=format&fit=crop&q=80',
      theme: 'sunset' as const,
      features: [
        { icon: '🍔', title: 'Flame-Grilled Patty', desc: '100% premium patties grilled to juicy perfection on open flames.' },
        { icon: '🍟', title: 'Golden House Fries', desc: 'Double-fried hand-cut potatoes seasoned with sea salt.' },
        { icon: '🥤', title: 'Thick Milkshakes', desc: 'Rich vanilla, chocolate, and fruit shakes blended with premium ice cream.' }
      ],
      menuItems: [
        { title: 'Zatbiz Double Smash Burger', price: '₹249', features: ['Two flame-grilled smash patties', 'Melted cheddar', 'Caramelised onions', 'Secret house sauce'], isFeatured: true },
        { title: 'Crispy Onion Ring Basket', price: '₹149', features: ['Hand-battered sweet onions', 'Spicy cajun dip', 'Herb garnish'], isFeatured: false }
      ],
      faqs: [
        { question: 'Do you have plant-based burger options?', answer: 'Yes, we offer premium grilled vegan patties as a substitute for any of our burgers.' },
        { question: 'Can I customize my burger toppings?', answer: 'Absolutely! You can add extra cheese, jalapeños, caramelized onions, or house sauces.' }
      ]
    };
  }

  // 7. Chinese / Asian
  if (
    nameLower.includes('chinese') ||
    nameLower.includes('thai') ||
    nameLower.includes('japanese') ||
    nameLower.includes('korean') ||
    nameLower.includes('momos') ||
    nameLower.includes('asian')
  ) {
    return {
      title: `Authentic Pan-Asian Culinary Art at ${brandName}`,
      subtitle: slogan || 'From delicate dim sums and hand-rolled sushi to fiery wok-tossed noodles and aromatic curries.',
      heroImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80',
      theme: 'slate' as const,
      features: [
        { icon: '🥢', title: 'Hand-rolled Sushi', desc: 'Prepared fresh at our counter using pristine sashimi-grade fish.' },
        { icon: '🥟', title: 'Steamed Dim Sum', desc: 'Delicate handmade wrappers filled with fresh gourmet ingredients.' },
        { icon: '🔥', title: 'Fiery Wok Cooking', desc: 'High-heat stir-fried noodles and rice preserving fresh textures.' }
      ],
      menuItems: [
        { title: 'Truffle Edamame Dumplings', price: '₹280', features: ['Steamed spinach-infused dumplings', 'Pureed edamame & white truffle', 'Soy ginger dip'], isFeatured: false },
        { title: 'Signature Dragon Roll', price: '₹450', features: ['Crispy tempura shrimp', 'Eel & sliced avocado topping', 'Sweet unagi sauce drizzle'], isFeatured: true }
      ],
      faqs: [
        { question: 'Do you offer low-sodium soy sauce?', answer: 'Yes, low-sodium and gluten-free tamari options are available on request.' },
        { question: 'Are all your sushi ingredients fresh?', answer: 'Yes, we source our seafood daily from top fish markets with certified sustainable catching.' }
      ]
    };
  }

  // 8. Fine Dining / BBQ / Grill
  if (
    nameLower.includes('fine dining') ||
    nameLower.includes('bbq') ||
    nameLower.includes('grill') ||
    nameLower.includes('seafood') ||
    nameLower.includes('bar') ||
    nameLower.includes('lounge') ||
    nameLower.includes('pub')
  ) {
    return {
      title: `Exquisite Gastronomy & Fine Service at ${brandName}`,
      subtitle: slogan || 'Sophisticated multi-course tasting menus, premium dry-aged cuts, and world-class wine pairings served in an elegant setting.',
      heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop&q=80',
      theme: 'slate' as const,
      features: [
        { icon: '🍽️', title: "Chef's Tasting Menu", desc: "A curated culinary journey designed by our Michelin-starred head chef." },
        { icon: '🥩', title: 'Dry-Aged Prime Cuts', desc: 'Steaks aged in-house for 28 days for maximum tenderness and flavor.' },
        { icon: '🍷', title: 'Sommelier Pairings', desc: 'Expertly selected vintage wines to complement each course of your meal.' }
      ],
      menuItems: [
        { title: 'Pan-Seared Sea Bass', price: '₹850', features: ['Wild caught fresh sea bass', 'Saffron butter sauce', 'Roasted asparagus side'], isFeatured: false },
        { title: 'Wagyu Ribeye Steak', price: '₹1450', features: ['A5 Grade Japanese Wagyu', 'Black truffle butter glaze', 'Rosemary roasted potatoes'], isFeatured: true }
      ],
      faqs: [
        { question: 'What is your dress code?', answer: 'We request smart casual attire. Please avoid sportswear, flip-flops, or beachwear.' },
        { question: 'Is there a corkage fee for bringing wine?', answer: 'Yes, we have a ₹1,000 corkage fee per bottle. Please notify the sommelier upon arrival.' }
      ]
    };
  }

  // Fallback / default general restaurant
  return {
    title: `Welcome to Gourmet Dining at ${brandName}`,
    subtitle: slogan || 'Gourmet plates, wood-fired pizzas, and fresh seasonal ingredients selected by our master chefs. Reserve a table tonight.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
    theme: 'sunset' as const,
    features: [
      { icon: '🍕', title: 'Wood-Fired Pizza', desc: 'Crafted with authentic Neapolitan flour and baked to crispy perfection.' },
      { icon: '🌿', title: 'Organic Ingredients', desc: 'Sourced daily from certified local eco-farms and organic gardens.' },
      { icon: '🍷', title: 'Wine Cellar Pairing', desc: 'Curated reserve vintages to complement your dining journey.' }
    ],
    menuItems: [
      { title: 'Truffle Tagliatelle', price: '₹420', features: ['Handmade fresh egg pasta', 'Italian white truffle oil', 'Aged parmigiano-reggiano shavings'], isFeatured: false },
      { title: 'Prime Ribeye Steak', price: '₹850', features: ['Dry-aged prime cut beef', 'Herbed butter baste', 'Roasted garlic & rosemary side'], isFeatured: true }
    ],
    faqs: [
      { question: 'Do you offer vegan or gluten-free options?', answer: 'Yes! Our menu has clearly marked gluten-free crusts and delicious plant-based substitutions.' },
      { question: 'What is your reservation cancellation policy?', answer: 'We kindly request that you cancel at least 12 hours in advance. No fee will be charged.' }
    ]
  };
}

export function generateTemplateBlocks(params: {
  selectedTemplateId: string;
  companyName: string;
  slogan: string;
  contactEmail: string;
  contactPhone: string;
  logoType: 'icon' | 'custom';
  logoIcon: string;
  customLogoUrl: string;
  heroType: 'default' | 'custom';
  customHeroUrl: string;
  shopNiche?: string;
  restaurantCategory?: string;
  gymCategory?: string;
  weddingCategory?: string;
  ngoCategory?: string;
  corporateCategory?: string;
  theme?: string;
  weddingHomeOption?: number;
  weddingLoginOption?: number;
  weddingDashboardOption?: number;
}) {
  const {
    selectedTemplateId,
    companyName: brandName,
    slogan,
    contactEmail,
    contactPhone,
    logoType,
    logoIcon,
    customLogoUrl,
    heroType,
    customHeroUrl,
    shopNiche,
    restaurantCategory,
    gymCategory,
    weddingCategory,
    ngoCategory,
    corporateCategory,
    theme,
    weddingHomeOption,
    weddingLoginOption,
    weddingDashboardOption,
  } = params;

  const blocksList: any[] = [];
  const customLogo = logoType === 'custom' ? customLogoUrl : '';

  // Fallback default images map for each template if no custom hero is uploaded
  const templateHeroImages: Record<string, string> = {
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    clinic: 'https://images.unsplash.com/photo-1584515901367-f1c276565acf?w=800&auto=format&fit=crop&q=80',
    school: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    storefront: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    realestate: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
    travel: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    portfolio: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    wedding: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
    ngo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    corporate: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    'medical-shop': '/images/medical_shop_template.png',
  };

  let customHero =
    heroType === 'custom'
      ? customHeroUrl
      : templateHeroImages[selectedTemplateId] || '';

  if (selectedTemplateId === 'storefront' && shopNiche && heroType !== 'custom') {
    const nicheInfo = NICHE_DETAILS[shopNiche];
    if (nicheInfo) {
      customHero = nicheInfo.heroImage;
    }
  }

  // 1. Header
  blocksList.push({
    id: Date.now() + '-header',
    type: 'header',
    theme:
      theme ||
      (selectedTemplateId === 'gym'
        ? 'purple'
        : selectedTemplateId === 'restaurant'
        ? 'sunset'
        : 'slate'),
    content: {
      companyName: brandName,
      logoIcon: logoIcon,
      logoUrl: customLogo,
      layout: 'left-logo',
      links: [
        { label: 'Home', url: '#' },
        { label: 'Services', url: '#features' },
        { label: 'Contact Us', url: '#footer' },
      ],
    },
  });

  // 2. Body sections based on selected template
  if (selectedTemplateId === 'restaurant') {
    const preset = getRestaurantPreset(restaurantCategory || '', brandName, slogan);
    const themeToUse = preset.theme;

    // Update Header theme if it's restaurant
    const headerBlock = blocksList.find(b => b.type === 'header');
    if (headerBlock) {
      headerBlock.theme = themeToUse;
    }

    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: themeToUse,
      content: {
        title: preset.title,
        subtitle: preset.subtitle,
        imageUrl: heroType === 'custom' ? customHeroUrl : preset.heroImage,
        btn1Text: 'Book Table',
        btn2Text: 'View Food Menu',
      },
    });
    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: 'slate',
      content: {
        title: 'Our Culinary Philosophy',
        subtitle: 'Three key pillars that define our gourmet kitchen experience.',
        items: preset.features,
      },
    });
    blocksList.push({
      id: Date.now() + '-pricing',
      type: 'pricing',
      theme: 'slate',
      content: {
        title: 'Signature Chef Specialities',
        items: preset.menuItems,
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'slate',
      content: {
        title: 'Reservations & Dietary FAQ',
        items: preset.faqs,
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: `© 2026 ${brandName} Dining Room. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'socials',
        socials: [
          { icon: '📘', label: 'Facebook', url: '#' },
          { icon: '📸', label: 'Instagram', url: '#' },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: themeToUse,
      content: {
        title: 'Restaurant Staff Portal',
        subtitle: `Sign in to manage kitchen orders, table bookings, and food menus for ${brandName}.`,
        btnText: 'Open Restaurant Dashboard',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: preset.heroImage,
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: themeToUse,
      content: {
        title: 'Restaurant Console',
        metric1Title: 'Active Reservations',
        metric1Value: '18 tables tonight',
        metric1Trend: '▲ 4 new bookings',
        metric2Title: 'Daily Sales',
        metric2Value: '₹14,200.00',
        metric2Trend: 'Peak hours active',
        metric3Title: 'Kitchen Stock Alert',
        metric3Value: '2 low items',
        metric3Trend: 'Order restock soon',
      },
    });
  } else if (selectedTemplateId === 'clinic') {
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'deepblue',
      content: {
        title: `Compassionate Healthcare at ${brandName}`,
        subtitle:
          slogan ||
          'Dedicated medical specialists, diagnostic scans, and clinical treatments. Providing care for a healthier tomorrow.',
        imageUrl: customHero,
        btn1Text: 'Book Appointment',
        btn2Text: 'Find Doctors',
      },
    });
    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: 'slate',
      content: {
        title: 'Our Specialist Departments',
        subtitle: 'Certified medical programs supporting your family health.',
        items: [
          {
            icon: '❤️',
            title: 'Cardiology Care',
            desc: 'Heart diagnostics, vascular screenings, and blood pressure therapies.',
          },
          {
            icon: '👶',
            title: 'Pediatric Clinic',
            desc: 'Caring environment for childrens wellness checks and immunizations.',
          },
          {
            icon: '🦴',
            title: 'Orthopedic Unit',
            desc: 'Bone density tests, joint recovery programs, and athletic therapy.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'slate',
      content: {
        title: 'Patient Advisory & Billing FAQ',
        items: [
          {
            question: 'What insurance networks do you accept?',
            answer:
              'We are in-network with major health insurers. Please call us to confirm specific coverage plans.',
          },
          {
            question: 'How do I access my diagnostic test results?',
            answer:
              'All lab reports are uploaded securely to our online Patient Portal within 48 hours.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: `© 2026 ${brandName} Health Partners. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'simple',
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'deepblue',
      content: {
        title: 'Medical Staff Portal',
        subtitle: `Access secure patient appointments, digital health charts, and clinical records for ${brandName}.`,
        btnText: 'Enter Patient Console',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'deepblue',
      content: {
        title: 'Clinical Dashboard',
        metric1Title: 'Appointments Today',
        metric1Value: '24 scheduled',
        metric1Trend: '▲ 6 walk-ins',
        metric2Title: 'Hospital Capacity',
        metric2Value: '88% occupancy',
        metric2Trend: 'Admissions normal',
        metric3Title: 'Pending Lab Reports',
        metric3Value: '8 updates',
        metric3Trend: 'Syncing to portal',
      },
    });
  } else if (selectedTemplateId === 'medical-shop') {
    blocksList.push({
      id: Date.now() + '-header',
      type: 'header',
      theme: 'emerald',
      content: {
        companyName: brandName,
        logoIcon: logoIcon || '💊',
        logoUrl: customLogo,
        layout: 'left-logo',
        links: [
          { label: 'Home', url: '?page=home' },
          { label: 'Shop', url: '?page=shop' },
          { label: 'Upload Prescription', url: '?page=prescription' },
          { label: 'Contact', url: '?page=contact' },
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'emerald',
      content: {
        title: `Your Trusted Pharmacy: ${brandName}`,
        subtitle: slogan || 'Order genuine medicines, healthcare devices, and wellness products online with fast door-step delivery.',
        imageUrl: customHero || '/images/medical_shop_template.png',
        btn1Text: 'Shop Medicines',
        btn1Url: '#shop',
        btn2Text: 'Upload Prescription',
        btn2Url: '#upload',
      }
    });

    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: 'slate',
      content: {
        title: 'Why Choose Us',
        subtitle: 'We provide top-tier pharmaceutical care and licensed medical products.',
        items: [
          { icon: '🛡️', title: 'Genuine Medicines', desc: '100% authentic medicines sourced directly from licensed distributors.' },
          { icon: '🚚', title: 'Express Delivery', desc: 'Get your prescriptions delivered to your doorstep within 2 hours.' },
          { icon: '👨‍⚕️', title: 'Pharmacist Checked', desc: 'Every order is verified by a certified healthcare professional.' },
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'slate',
      content: {
        title: 'Pharmacy Frequently Asked Questions',
        items: [
          { question: 'How do I upload a prescription?', answer: 'Click the "Upload Prescription" button, choose a photo/PDF of your prescription, add any pharmacist doctor notes, and hit submit. Our pharmacist will review it within 10 minutes.' },
          { question: 'What are the delivery charges?', answer: 'We offer free delivery for orders above Rs. 500. For smaller orders, a flat delivery fee of Rs. 40 is applicable.' },
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: `© 2026 ${brandName} Pharmacy. All Rights Reserved. Licensed Pharmacy Code: Rx-92842. Phone: ${contactPhone || 'N/A'} | Email: ${contactEmail || 'N/A'}`,
        layout: 'simple',
      }
    });

    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'emerald',
      content: {
        title: 'Pharmacy Customer & Staff Portal',
        subtitle: `Login to your ${brandName} dashboard to track orders, upload prescriptions, and view your loyalty points.`,
        btnText: 'Log In to My MedShop',
        logoIcon: logoIcon || '💊',
        logoUrl: customLogo,
        illustrationUrl: '/images/medical_shop_template.png',
      }
    });

    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'emerald',
      content: {
        title: 'Pharmacy Admin Console',
        metric1Title: 'Active Prescriptions',
        metric1Value: '12 pending check',
        metric1Trend: '▲ 4 new uploads',
        metric2Title: 'Today\'s Orders',
        metric2Value: '48 items placed',
        metric2Trend: 'Dispatch team busy',
        metric3Title: 'Inventory Stock Level',
        metric3Value: '96% in stock',
        metric3Trend: '2 reorder alerts',
      }
    });
  } else if (selectedTemplateId === 'school') {
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'deepblue',
      content: {
        title: `Nurturing Minds & Leaders at ${brandName}`,
        subtitle:
          slogan ||
          'Advanced learning facilities, high-ranking STEM tracks, and athletic clubs. Shaping academic futures.',
        imageUrl: customHero,
        btn1Text: 'Admissions Open',
        btn2Text: 'Curriculum overview',
      },
    });
    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: 'slate',
      content: {
        title: 'Our Academic Advantages',
        subtitle: 'Providing standard pathways for college preparatory excellence.',
        items: [
          {
            icon: '🔬',
            title: 'Modern Laboratories',
            desc: 'Advanced chemistry, robotics, and biology equipment for experiments.',
          },
          {
            icon: '👩‍🏫',
            title: 'Expert Educators',
            desc: 'Highly certified subject experts committed to student development.',
          },
          {
            icon: '🎨',
            title: 'Arts & Music Studios',
            desc: 'Extensive fine arts courses, classical instruments, and digital design.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-pricing',
      type: 'pricing',
      theme: 'slate',
      content: {
        title: 'Admission Tuition Tiers',
        items: [
          {
            title: 'Standard Term Enrollment',
            price: '$450',
            features: [
              'Full curriculum access',
              'Standard sports clubs',
              'Library & lab resources',
            ],
            isFeatured: false,
          },
          {
            title: 'AP & Honors Enrollment',
            price: '$650',
            features: [
              'Advanced college placement prep',
              '1-on-1 tutoring sessions',
              'Robotics and computing clubs',
              'International sports league',
            ],
            isFeatured: true,
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'slate',
      content: {
        title: 'Admissions & Intake FAQ',
        items: [
          {
            question: 'When is the application deadline for new terms?',
            answer:
              'The autumn term deadline is July 31st. Spring registrations close on December 15th.',
          },
          {
            question: 'Are scholarship plans or financial aid available?',
            answer:
              'Yes! We award merit scholarships and need-based financial aid annually.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: `© 2026 ${brandName} Academic Trust. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'directory',
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'deepblue',
      content: {
        title: 'Academic Portal Login',
        subtitle: `Manage campus enrollments, publish class timetables, and upload grades for ${brandName}.`,
        btnText: 'Sign In to Campus Panel',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'deepblue',
      content: {
        title: 'School Management Panel',
        metric1Title: 'Active Students',
        metric1Value: '1,420 enrolled',
        metric1Trend: 'No updates pending',
        metric2Title: 'Staff Telemetry',
        metric2Value: '58 professors online',
        metric2Trend: 'Database connected',
        metric3Title: 'Campus System Load',
        metric3Value: '14 ms response',
        metric3Trend: 'H2 Schema synced',
      },
    });
  } else if (selectedTemplateId === 'gym') {
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: theme || 'purple',
      content: {
        title: `Build Your Ultimate Strength at ${brandName}`,
        subtitle:
          slogan ||
          'Cardio decks, heavy free-weight zones, and certified personal coaches. Break your personal limits.',
        imageUrl: customHero,
        btn1Text: 'Claim Free Pass',
        btn2Text: 'Browse Fitness Classes',
      },
    });
    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: theme || 'slate',
      content: {
        title: 'Elite Club Conveniences',
        subtitle: 'Everything you need to optimize physical output.',
        items: [
          {
            icon: '🏋️',
            title: 'Strength Training',
            desc: 'Premium Olympic barbell racks, plate loaders, and strength machines.',
          },
          {
            icon: '🧘',
            title: 'Group Yoga & Cycle',
            desc: 'Spacious air-conditioned cycle studios and peaceful yoga sessions.',
          },
          {
            icon: '🏊',
            title: 'Indoor Lap Pool',
            desc: 'Four lanes temperature controlled swimming lanes with locker access.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-pricing',
      type: 'pricing',
      theme: theme || 'slate',
      content: {
        title: 'Club Membership Pricing',
        items: [
          {
            title: 'Gym Access Pass',
            price: '$29',
            features: [
              'Access to cardio & weights',
              'Locker rooms & showers',
              'Complimentary towel service',
            ],
            isFeatured: false,
          },
          {
            title: 'VIP Unlimited Pro',
            price: '$59',
            features: [
              'All standard privileges',
              'Unlimited group fitness classes',
              '2 private coaching hours / mo',
              'Sauna and steam room access',
            ],
            isFeatured: true,
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: theme || 'slate',
      content: {
        title: 'Fitness Membership FAQ',
        items: [
          {
            question: 'What are your operational hours?',
            answer:
              'We are open 24/7 for VIP members. General access is allowed from 5:00 AM to 11:00 PM.',
          },
          {
            question: 'Can I freeze my membership billing plan?',
            answer:
              'Yes. You can request a billing freeze up to 60 days per calendar year via the Portal.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: theme || 'purple',
      content: {
        text: `© 2026 ${brandName} Fitness Club. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'socials',
        socials: [
          { icon: '📘', label: 'Facebook', url: '#' },
          { icon: '📸', label: 'Instagram', url: '#' },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'purple',
      content: {
        title: 'Fitness Coach Portal',
        subtitle: `Log in to edit training schedules, view membership subscriptions, and plan sessions for ${brandName}.`,
        btnText: 'Open Coach Console',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'purple',
      content: {
        title: 'Fitness Control Center',
        metric1Title: 'Active Members',
        metric1Value: '852 checking in',
        metric1Trend: '▲ 24% check-in rate',
        metric2Title: 'Class Bookings',
        metric2Value: '14 group classes',
        metric2Trend: 'Spin session full',
        metric3Title: 'Average Attendance',
        metric3Value: '122 daily',
        metric3Trend: 'Telemetry normal',
      },
    });
  } else if (selectedTemplateId === 'storefront') {
    const nicheInfo = shopNiche ? NICHE_DETAILS[shopNiche] : null;
    const storefrontTheme = nicheInfo ? nicheInfo.theme : 'deepblue';

    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: storefrontTheme,
      content: {
        title: nicheInfo ? `${brandName} ${nicheInfo.title}` : `${brandName} Storefront`,
        subtitle:
          slogan ||
          (nicheInfo
            ? nicheInfo.subtitle
            : `Welcome to the global commerce catalog of ${brandName}. Handcrafted items designed to elevate your visual lifestyle.`),
        imageUrl: customHero,
        btn1Text: 'Shop Catalog',
        btn2Text: 'Explore Collections',
      },
    });
    blocksList.push({
      id: Date.now() + '-products',
      type: 'products',
      theme: nicheInfo ? nicheInfo.theme : 'slate',
      content: {
        title: nicheInfo ? `${nicheInfo.title} Catalog` : 'Featured Products Catalog',
        subtitle: nicheInfo ? `Explore our curated selection of premium ${shopNiche} products.` : 'Explore our latest releases and premium essentials.',
      },
    });
    blocksList.push({
      id: Date.now() + '-pricing',
      type: 'pricing',
      theme: nicheInfo ? nicheInfo.theme : 'slate',
      content: {
        title: 'VIP Store Membership',
        items: [
          {
            title: 'Silver Tier Club',
            price: '$10',
            features: [
              '10% checkout discount',
              'Early access to drops',
              'Standard free shipping',
            ],
            isFeatured: false,
          },
          {
            title: 'Gold Premium Pass',
            price: '$25',
            features: [
              '20% checkout discount',
              'First priority shipping',
              'Custom sizing consultations',
              'Yearly exclusive anniversary drop',
            ],
            isFeatured: true,
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: nicheInfo ? nicheInfo.theme : 'slate',
      content: {
        text: `© 2026 ${brandName}. Phone: ${contactPhone || 'N/A'} | Email: ${
          contactEmail || 'N/A'
        }`,
        layout: 'directory',
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: storefrontTheme,
      content: {
        title: 'Welcome back',
        subtitle: `Enter your credentials to manage your ${brandName} storefront.`,
        btnText: 'Sign In to Dashboard',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: shopNiche === 'fashion_men'
          ? 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80'
          : shopNiche === 'fashion_women'
          ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80'
          : shopNiche === 'fashion_kids'
          ? 'https://images.unsplash.com/photo-1471286174240-e7a8853b5e40?w=600&auto=format&fit=crop&q=80'
          : shopNiche === 'fashion_footwear'
          ? 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80'
          : '/images/login_illustration.png',
      },
    });

    // Custom dashboard configs based on niche
    let dashTitle = 'Administration Summary';
    let m1Title = 'Total Revenue';
    let m1Val = '$5,824.00';
    let m1Trend = '▲ 14.2% since yesterday';
    let m2Title = 'Active Sales';
    let m2Val = '244 units';
    let m2Trend = 'Full Database synced';
    let m3Title = 'Inventory Alert';
    let m3Val = '3 low items';
    let m3Trend = 'Restock recommended';

    if (shopNiche === 'cloth') {
      dashTitle = 'Boutique Operations Overview';
      m1Title = 'Total Boutique Revenue';
      m1Val = '₹1,45,200.00';
      m1Trend = '▲ 18.5% this week';
      m2Title = 'Garments Sold';
      m2Val = '148 units';
      m2Trend = 'Average Order Value: ₹980';
      m3Title = 'Low Inventory Alert';
      m3Val = '2 products low';
      m3Trend = 'Jeans & Summer Dresses';
    } else if (shopNiche === 'grocery') {
      dashTitle = 'Supermarket Stock & Orders';
      m1Title = 'Fresh Grocery Revenue';
      m1Val = '₹89,420.00';
      m1Trend = '▲ 8.2% this morning';
      m2Title = 'Baskets Filled';
      m2Val = '312 orders';
      m2Trend = 'Perishable fresh intake';
      m3Title = 'Perishables Warning';
      m3Val = '5 produce items';
      m3Trend = 'Check fresh dairy aisle';
    } else if (nicheInfo) {
      dashTitle = `${nicheInfo.title} Overview`;
      m1Title = 'Total Sales Volume';
      m1Val = '$2,840.00';
      m1Trend = '▲ 10.4% increase';
      m2Title = 'Orders Completed';
      m2Val = '86 units';
      m2Trend = 'JPA database active';
      m3Title = 'Stock Status';
      m3Val = 'Healthy';
      m3Trend = 'All listings synced';
    }

    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: storefrontTheme,
      content: {
        title: dashTitle,
        metric1Title: m1Title,
        metric1Value: m1Val,
        metric1Trend: m1Trend,
        metric2Title: m2Title,
        metric2Value: m2Val,
        metric2Trend: m2Trend,
        metric3Title: m3Title,
        metric3Value: m3Val,
        metric3Trend: m3Trend,
      },
    });
  } else if (selectedTemplateId === 'realestate') {
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'slate',
      content: {
        title: `Discover Elegant Living with ${brandName}`,
        subtitle:
          slogan ||
          'Luxury suburban estates, modern high-rise apartments, and spacious commercial spots. Explore our premium real estate portfolio.',
        imageUrl: customHero,
        btn1Text: 'View Property Listings',
        btn2Text: 'Consult an Agent',
      },
    });
    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: 'slate',
      content: {
        title: 'Real Estate Excellence',
        subtitle: 'Providing seamless support for property search & buying.',
        items: [
          {
            icon: '🏡',
            title: 'Verified Listings',
            desc: '100% physically inspected properties complete with clear deeds.',
          },
          {
            icon: '👔',
            title: 'Certified Realtors',
            desc: 'Experienced market specialists offering neighborhood evaluation.',
          },
          {
            icon: '🔑',
            title: 'Smooth Closings',
            desc: 'Fully secure escrow coordination and digital contract completion.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'slate',
      content: {
        title: 'Property Transactions FAQ',
        items: [
          {
            question: 'How do home visits work during listings?',
            answer:
              'Simply click "Consult an Agent" to specify your convenient hours. We schedule private tours.',
          },
          {
            question: 'Do you help arrange bank mortgage pre-approvals?',
            answer:
              'Yes! We cooperate with premier banks to expedite your home loan process.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: `© 2026 ${brandName} Properties. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'directory',
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'slate',
      content: {
        title: 'Agent Command Center',
        subtitle: `Sign in to manage property listings, escrow contracts, and client viewings for ${brandName}.`,
        btnText: 'Open Property Dashboard',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'slate',
      content: {
        title: 'Realty Portal Control',
        metric1Title: 'Listed Properties',
        metric1Value: '48 active homes',
        metric1Trend: '2 listings closed',
        metric2Title: 'Average Valuation',
        metric2Value: '$425,000.00',
        metric2Trend: 'Market high active',
        metric3Title: 'Pending Consultations',
        metric3Value: '5 client leads',
        metric3Trend: 'Syncing to inbox',
      },
    });
  } else if (selectedTemplateId === 'travel') {
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'sunset',
      content: {
        title: `Embark on Grand Journeys with ${brandName}`,
        subtitle:
          slogan ||
          'Curated tropical tour packs, alpine hiking guides, and exotic resort bookings. Make your next vacation unforgettable.',
        imageUrl: customHero,
        btn1Text: 'Book Travel Package',
        btn2Text: 'Custom Travel Plans',
      },
    });
    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: 'slate',
      content: {
        title: 'Uncompromising Travel Care',
        subtitle: 'Making your global wanders stress-free and exciting.',
        items: [
          {
            icon: '🛡️',
            title: 'Flexible Bookings',
            desc: 'No-cost changes up to 72 hours before travel departure times.',
          },
          {
            icon: '✈️',
            title: 'All-inclusive Plans',
            desc: 'Resort lodging, tour guide matching, and local transfers covered.',
          },
          {
            icon: '🗺️',
            title: 'Verified Guides',
            desc: 'Vetted bilingual guides hosting historical and geographical routes.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-pricing',
      type: 'pricing',
      theme: 'slate',
      content: {
        title: 'Standard Itinerary Passes',
        items: [
          {
            title: 'Weekend Getaway',
            price: '$249',
            features: [
              '2 Nights hotel reservation',
              'Guided heritage walking tour',
              'Included breakfasts & drinks',
            ],
            isFeatured: false,
          },
          {
            title: 'Globetrotter Package',
            price: '$799',
            features: [
              '5 Nights premium hotel',
              'Custom private transfers',
              'Historical tour guide matching',
              'Premium airport lounge access',
            ],
            isFeatured: true,
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'slate',
      content: {
        title: 'Booking & Safety FAQ',
        items: [
          {
            question: 'What packing checklist do you recommend for mountain tours?',
            answer:
              'We send a detailed PDF checklist 7 days before departure covering thermals, boots, and gear.',
          },
          {
            question: 'Are international flight tickets included?',
            answer:
              'Our standard packages cover lodging and local tour costs. Flight bookings are optional additions.',
          },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'sunset',
      content: {
        text: `© 2026 ${brandName} Agency. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'socials',
        socials: [
          { icon: '📘', label: 'Facebook', url: '#' },
          { icon: '📸', label: 'Instagram', url: '#' },
        ],
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'sunset',
      content: {
        title: 'Travel Agency Control',
        subtitle: `Manage tropical vacation itineraries, flight seats, and customer tickets for ${brandName}.`,
        btnText: 'Open Booking Panel',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: '/images/login_illustration.png',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'sunset',
      content: {
        title: 'Agency Console',
        metric1Title: 'Active Bookings',
        metric1Value: '184 flights active',
        metric1Trend: '▲ 18% weekly growth',
        metric2Title: 'Itineraries Sold',
        metric2Value: '42 packages',
        metric2Trend: 'Resorts connected',
        metric3Title: 'Checkout Revenue',
        metric3Value: '$18,450.00',
        metric3Trend: 'Database synced',
      },
    });
  } else if (selectedTemplateId === 'wedding') {
    // Wedding & Event Planner
    const homeOpt = weddingHomeOption || 1;
    const presets = [
      { theme: 'purple', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80', title: 'Lavender Blossom Planners', slogan: 'Bespoke planning, delicate floral framing, and lilac themes.' },
      { theme: 'sunset', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80', title: 'Rose Gold Romance Events', slogan: 'Warm blush pink, champagne trims, and ballroom magic.' },
      { theme: 'deepblue', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80', title: 'Midnight Starry Celebrations', slogan: 'Deep indigo backing, fairy lights, and gold foil typography.' },
      { theme: 'sunset', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80', title: 'Golden Palace Weddings', slogan: 'Ivory white, champagne gold accents, and palace grounds elegance.' },
      { theme: 'emerald', image: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?w=800&auto=format&fit=crop&q=80', title: 'Sage & Botanical Planning', slogan: 'Sage green borders, organic leaf details, and floral Mandaps.' },
      { theme: 'purple', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop&q=80', title: 'Blushing Bride Decor', slogan: 'Pastel pink lace borders, beautiful photo galleries, and elegant scripts.' },
      { theme: 'sunset', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80', title: 'Burgundy Royal Galas', slogan: 'Burgundy velvet vibes, gold trims, and reception details.' },
      { theme: 'deepblue', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', title: 'Ocean Coastline Destination', slogan: 'Aquamarine and beachside canopy setups for coastal weddings.' },
      { theme: 'deepblue', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80', title: 'Teal & Modern Copper Events', slogan: 'Metallic copper details with a dark chic teal backdrop.' },
      { theme: 'sunset', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80', title: 'Warm Champagne Dream', slogan: 'Warm ivory backdrops and neutral classy layouts.' }
    ];
    const selectedPreset = presets[homeOpt - 1] || presets[0];
    const activeTheme = selectedPreset.theme;
    const heroImage = customHeroUrl || selectedPreset.image;
    const resolvedTitle = brandName || selectedPreset.title;
    const resolvedSlogan = slogan || selectedPreset.slogan;

    const headerBlock = blocksList.find((b) => b.type === 'header');
    if (headerBlock) {
      headerBlock.theme = activeTheme;
      headerBlock.content = {
        companyName: resolvedTitle,
        logoIcon: logoIcon || '✨',
        logoUrl: customLogo,
        layout: 'left-logo',
        links: [
          { label: 'Home', url: '#' },
          { label: 'Services', url: '#services' },
          { label: 'Contact Us', url: '#contact' }
        ]
      };
    } else {
      blocksList.push({
        id: Date.now() + '-header',
        type: 'header',
        theme: activeTheme,
        content: {
          companyName: resolvedTitle,
          logoIcon: logoIcon || '✨',
          logoUrl: customLogo,
          layout: 'left-logo',
          links: [
            { label: 'Home', url: '#' },
            { label: 'Services', url: '#services' },
            { label: 'Contact Us', url: '#contact' }
          ]
        },
      });
    }

    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: activeTheme,
      content: {
        title: resolvedTitle,
        subtitle: resolvedSlogan,
        imageUrl: heroImage,
        btn1Text: 'View Portfolio',
        btn2Text: 'Book Consultation',
      },
    });

    blocksList.push({
      id: Date.now() + '-features',
      type: 'features',
      theme: activeTheme,
      content: {
        title: 'Our Premium Services',
        subtitle: 'Bespoke coordination for the most memorable celebrations of your life.',
        items: [
          { icon: '✨', title: 'Custom Theme Design', desc: 'Personalized decoration, lighting styling, and tabletop designs.' },
          { icon: '🍽️', title: 'Catering Management', desc: 'Exquisite multi-course menus curated by award-winning catering chefs.' },
          { icon: '🏰', title: 'Venue Coordination', desc: 'Secure the most beautiful gardens, private estates, and luxury banquets.' },
          { icon: '📸', title: 'Media & Entertainment', desc: 'Candid wedding photography, highlights videography, DJs, and live bands.' }
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-gallery',
      type: 'gallery',
      theme: activeTheme,
      content: {
        title: 'Featured Staging & Designs',
        images: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80'
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-text-image',
      type: 'text-image',
      theme: activeTheme,
      content: {
        title: `Elegance Orchestrated: Your ${weddingCategory || 'Special Event'}`,
        text: 'From small garden gatherings and kids birthday parties to luxury beachside weddings and corporate business summits, we take care of all coordination details. Sit back and create memories while our expert crew handles the stage, floral arches, vendor check-ins, and guest seating charts.',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
        align: 'right',
      },
    });

    blocksList.push({
      id: Date.now() + '-pricing',
      type: 'pricing',
      theme: activeTheme,
      content: {
        title: 'Investment Packages',
        subtitle: 'Clear, transparent pricing structures for every event size.',
        plans: [
          { name: 'Silver Plan', price: '₹1,50,000', period: 'flat fee', desc: 'Coordination checklist, 1 planner coordinator, florist backdrop design, standard sound DJ.', features: ['Timeline planning assistance', 'On-day venue coordination', 'Floral backdrop setup', 'Standard sound & microphone kit'] },
          { name: 'Gold Plan', price: '₹3,0,000', period: 'flat fee', desc: 'Complete decorations, DJ stage lighting, 2 photo coordinators, buffet hospitality management.', features: ['Full floral stage design', '2 Coordinator assistants', 'DJ & professional staging lights', 'Custom menu catering assistance'] },
          { name: 'Platinum Plan', price: '₹5,00,000', period: 'flat fee', desc: 'Luxury flower stage mandap, drone photography album, live band, full designer catalog management.', features: ['Premium luxury mandap design', '4 Coordinator assistants', 'HD video + drone album', 'Live performance band setup'] }
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-testimonials',
      type: 'testimonials',
      theme: activeTheme,
      content: {
        title: 'Love Letters & Reviews',
        items: [
          { quote: 'The floral arches were spectacular! The timeline coordinator kept all vendors perfectly on schedule.', author: 'Shalini & Rohan (Wedding Couple)' },
          { quote: 'Organized our annual IT conference of 500+ guests. The registration counters, stage projection, and buffet catering went flawlessly.', author: 'Karan Mehra (HR Director)' }
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: activeTheme,
      content: {
        title: 'Planning FAQs',
        items: [
          { question: 'How early should we book your services?', answer: 'For weddings and large events, we recommend booking 6 to 12 months in advance.' },
          { question: 'Do you offer customized catering menus?', answer: 'Yes! We coordinate with top chefs to offer tailor-made menu options including vegan and gluten-free plans.' },
          { question: 'Can we manually customize the decoration items?', answer: 'Absolutely! Our dashboard lets you upload custom logos, select layouts, and update checklists anytime.' }
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-contact_form',
      type: 'contact_form',
      theme: activeTheme,
      content: {
        title: 'Get In Touch',
        subtitle: 'Drop us a line to check availability and book a free design consultation.',
        emailPlaceholder: 'couple@love.com',
        messagePlaceholder: 'Tell us about your event dates, guest count, and theme ideas...'
      }
    });

    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: activeTheme,
      content: {
        text: `© 2026 ${resolvedTitle}. Phone: ${contactPhone || 'N/A'} | Email: ${contactEmail || 'N/A'}`,
        layout: 'socials',
        socials: [
          { icon: '📸', label: 'Instagram', url: '#' },
          { icon: '👥', label: 'Facebook', url: '#' }
        ]
      }
    });

    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: activeTheme,
      content: {
        title: 'Event Portal Login',
        subtitle: `Access reservations, guest checklists, and vendor contacts for ${resolvedTitle}.`,
        btnText: 'Manage Event Portal',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: heroImage,
        selectedLoginOption: weddingLoginOption || 1
      },
    });

    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: activeTheme,
      content: {
        title: 'Events Control Panel',
        metric1Title: 'Active Bookings',
        metric1Value: '28 upcoming events',
        metric1Trend: '▲ 15% monthly increase',
        metric2Title: 'Guests Registered',
        metric2Value: '1,420 guests',
        metric2Trend: 'RSVP database active',
        metric3Title: 'Event Revenue',
        metric3Value: '₹48,900.00',
        metric3Trend: 'Invoices cleared',
        selectedDashboardOption: weddingDashboardOption || 1
      },
    });
  } else if (selectedTemplateId === 'ngo') {
    // NGO & Charity
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'emerald',
      content: {
        title: `Empowering Communities through our ${ngoCategory || 'Charity Work'}`,
        subtitle: slogan || 'Join our mission to bring positive social, community, and political change.',
        imageUrl: customHero,
        btn1Text: 'Make Donation',
        btn2Text: 'Volunteer Today',
      },
    });
    blocksList.push({
      id: Date.now() + '-text-image',
      type: 'text-image',
      theme: 'emerald',
      content: {
        title: 'Our Philanthropic Pillars',
        text: 'We mobilize resources for humanitarian aid, religious activities, localized neighborhood support campaigns, and voter awareness.',
        align: 'left',
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'emerald',
      content: {
        title: 'Donation & Impact FAQ',
        items: [
          { question: 'Are donations tax-deductible?', answer: 'Yes, all donations are 100% tax-deductible under 501(c)(3) non-profit regulations. We send receipts instantly.' },
          { question: 'How are campaign funds utilized?', answer: 'Over 85% of all raised funds directly sponsor field campaigns, community meals, education, and medical checkups.' }
        ]
      }
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'emerald',
      content: {
        text: `© 2026 ${brandName} NGO. Phone: ${contactPhone || 'N/A'} | Email: ${contactEmail || 'N/A'}`,
        layout: 'socials',
        socials: [
          { icon: '🕊️', label: 'Twitter', url: '#' },
          { icon: '🤝', label: 'LinkedIn', url: '#' }
        ]
      }
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'emerald',
      content: {
        title: 'Donor Console',
        subtitle: `Access your donation records, campaign receipts, and volunteer schedules for ${brandName}.`,
        btnText: 'Open Donor Portal',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: '/images/database_sync.png',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'emerald',
      content: {
        title: 'NGO Admin Center',
        metric1Title: 'Total Funds Raised',
        metric1Value: '$84,520.00',
        metric1Trend: '▲ 24% campaign growth',
        metric2Title: 'Active Volunteers',
        metric2Value: '310 helpers',
        metric2Trend: 'Community units synced',
        metric3Title: 'Supported Families',
        metric3Value: '1,200 recipients',
        metric3Trend: 'Direct support active',
      },
    });
  } else if (selectedTemplateId === 'corporate') {
    // Corporate Company Website
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'deepblue',
      content: {
        title: `Strategic Excellence for ${corporateCategory || 'Your Business'}`,
        subtitle: slogan || 'Delivering high-tech solutions, financial consulting, CA tax filing, and legal advice.',
        imageUrl: customHero,
        btn1Text: 'View Services',
        btn2Text: 'Request Quote',
      },
    });
    blocksList.push({
      id: Date.now() + '-text-image',
      type: 'text-image',
      theme: 'deepblue',
      content: {
        title: 'Corporate Advisory & Engineering',
        text: 'Our consultants specialize in startup scaling, enterprise IT infrastructure, accounting auditing, marketing expansion, and insurance defense.',
        align: 'left',
      },
    });
    blocksList.push({
      id: Date.now() + '-faq',
      type: 'faq',
      theme: 'deepblue',
      content: {
        title: 'Service & Advisory FAQ',
        items: [
          { question: 'Do you offer custom SLA agreements?', answer: 'Yes! Our IT and software engineering squads operate under 99.9% availability service level agreements.' },
          { question: 'What accounting/tax systems do you integrate with?', answer: 'We support automatic ledger syncing with SAP, Oracle, QuickBooks, and custom SQL databases.' }
        ]
      }
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'deepblue',
      content: {
        text: `© 2026 ${brandName} Corp. Phone: ${contactPhone || 'N/A'} | Email: ${contactEmail || 'N/A'}`,
        layout: 'simple',
      }
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'deepblue',
      content: {
        title: 'Client Desk',
        subtitle: `Access tax filings, audit reports, software repository, and open tickets for ${brandName}.`,
        btnText: 'Client Console Login',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: '/images/zatbiz_dashboard_hero.png',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'deepblue',
      content: {
        title: 'Corporate Command Console',
        metric1Title: 'Active Contracts',
        metric1Value: '95 corporate clients',
        metric1Trend: '▲ 9% quarterly scale',
        metric2Title: 'Audits Completed',
        metric2Value: '184 tax filings',
        metric2Trend: 'CA ledgers verified',
        metric3Title: 'Infrastructure Uptime',
        metric3Value: '99.98% active',
        metric3Trend: 'Database nodes synced',
      },
    });
  } else {
    // Personal Portfolio
    blocksList.push({
      id: Date.now() + '-hero',
      type: 'hero',
      theme: 'sunset',
      content: {
        title: `Hello, I am the designer behind ${brandName}`,
        subtitle:
          slogan ||
          'Sleek, minimalistic layout structures that combine shape, typography, and text gracefully.',
        imageUrl: customHero,
        btn1Text: 'View Designs',
        btn2Text: 'Contact Me',
      },
    });
    blocksList.push({
      id: Date.now() + '-text-image',
      type: 'text-image',
      theme: 'slate',
      content: {
        title: 'Visual Minimalism & Balance',
        text: 'I believe in spacious margins and bold, clear heading fonts. Every design I build focuses on highlighting content while ensuring responsive navigation.',
        align: 'left',
      },
    });
    blocksList.push({
      id: Date.now() + '-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: `© 2026 ${brandName} Studio. Phone: ${
          contactPhone || 'N/A'
        } | Email: ${contactEmail || 'N/A'}`,
        layout: 'simple',
      },
    });
    blocksList.push({
      id: Date.now() + '-login-config',
      type: 'login_config',
      theme: 'slate',
      content: {
        title: 'Studio Administration',
        subtitle: `Access views, metrics, and message feedback for ${brandName} Studio.`,
        btnText: 'Open Studio Dashboard',
        logoIcon: logoIcon,
        logoUrl: customLogo,
        illustrationUrl: '/images/builder_canvas.png',
      },
    });
    blocksList.push({
      id: Date.now() + '-dashboard-config',
      type: 'dashboard_config',
      theme: 'slate',
      content: {
        title: 'Creator Insights Console',
        metric1Title: 'Total Profile Views',
        metric1Value: '2,782 views',
        metric1Trend: '▲ 8.4% monthly scale',
        metric2Title: 'Total Project Likes',
        metric2Value: '550 reactions',
        metric2Trend: 'Synced portfolio blocks',
        metric3Title: 'Feedback Mailbox',
        metric3Value: '3 messages',
        metric3Trend: 'No spam detected',
      },
    });
  }

  return blocksList;
}
