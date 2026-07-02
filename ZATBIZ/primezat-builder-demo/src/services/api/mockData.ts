// Static mock definitions for offline simulation sandbox mode

export function getMockReservations(projectId: number) {
  return [
    {
      id: 2001,
      projectId: projectId,
      customerName: 'Robert Downey',
      customerEmail: 'robert@gmail.com',
      customerPhone: '+91 98765 11111',
      bookingDate: '2026-06-10',
      bookingTime: '19:30',
      numberOfGuests: 4,
      tableNumber: 'Table 4',
      status: 'Confirmed',
      notes: 'Prefer window seat, celebrating anniversary.',
      createdAt: new Date().toISOString()
    },
    {
      id: 2002,
      projectId: projectId,
      customerName: 'Scarlett Johansson',
      customerEmail: 'scarlett@gmail.com',
      customerPhone: '+91 98765 22222',
      bookingDate: '2026-06-11',
      bookingTime: '20:00',
      numberOfGuests: 2,
      tableNumber: 'Table 2',
      status: 'Pending',
      notes: 'Gluten-free menu choices preferred.',
      createdAt: new Date().toISOString()
    }
  ];
}

export function getDefaultProjectBlocks(id: number, isRestaurant: boolean, baseUrl: string) {
  return [
    {
      id: 'mock-header',
      type: 'header',
      theme: isRestaurant ? 'sunset' : 'slate',
      content: {
        companyName: isRestaurant ? 'The Gourmet Kitchen' : 'ZATBIZ Shop',
        logoIcon: isRestaurant ? '🍕' : '🛍️',
        layout: 'left-logo',
        links: [
          { label: 'Home', url: '#' },
          { label: 'Products', url: '#products' },
          { label: 'Log In', url: `/preview/${id}/login` }
        ]
      }
    },
    {
      id: 'mock-hero',
      type: 'hero',
      theme: isRestaurant ? 'sunset' : 'deepblue',
      content: {
        title: isRestaurant ? 'Savor Gourmet Craft Dining' : 'Spring Boot Backend is Offline',
        subtitle: isRestaurant 
          ? 'Gourmet plates, wood-fired pizzas, and fresh seasonal ingredients selected by our master chefs.'
          : `The visual site builder is running in sandbox mode because Next.js could not connect to ${baseUrl}. Run your Spring Boot REST application to enable live syncing.`,
        imageUrl: isRestaurant 
          ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
        btn1Text: isRestaurant ? 'Book Table' : 'View Storefront Catalog',
        btn2Text: isRestaurant ? 'View Food Menu' : 'Configure Local Server'
      }
    },
    {
      id: 'mock-products',
      type: 'products',
      theme: isRestaurant ? 'sunset' : 'slate',
      content: {
        title: isRestaurant ? 'Signature Chef Specialities' : 'Featured Store Products',
        subtitle: isRestaurant ? 'Mouth-watering plates prepared fresh' : 'Simulated products list'
      }
    },
    {
      id: 'mock-login-config',
      type: 'login_config',
      theme: isRestaurant ? 'sunset' : 'slate',
      content: {
        title: isRestaurant ? 'Restaurant Staff Portal' : 'Client Secure Portal',
        subtitle: isRestaurant 
          ? 'Sign in to manage kitchen orders, table bookings, and food menus.'
          : 'Enter your credentials to enter the storefront preview workspace.',
        btnText: isRestaurant ? 'Open Restaurant Dashboard' : 'Sign In to Dashboard',
        logoIcon: isRestaurant ? '🍕' : '🛍️',
        illustrationUrl: isRestaurant 
          ? '/images/restaurant_login_illustration.png'
          : '/images/website_creator_illustration.png'
      }
    },
    {
      id: 'mock-footer',
      type: 'footer',
      theme: 'slate',
      content: {
        text: isRestaurant ? '© 2026 The Gourmet Kitchen. Powered by ZATBIZ.' : '© 2026 ZATBIZ Sandbox Workspace. Client-side simulation active.',
        layout: 'simple'
      }
    }
  ];
}

export function getMockProducts(projectId: number, shopNiche: string, template: string): any[] {
  if (template === 'restaurant') {
    return [
      {
        id: 101,
        name: 'Wood-Fired Margherita Pizza',
        description: 'Authentic Neapolitan sourdough, fresh mozzarella, organic tomato sauce, fragrant basil leaves, extra virgin olive oil drizzle.',
        price: 14.50,
        category: 'Pizzas',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Size: Regular, Large; Crust: Thin Crust, Cheese Burst',
        stock: 999
      },
      {
        id: 102,
        name: 'Gourmet Double Cheese Burger',
        description: 'Juicy prime beef double patty, sharp cheddar cheese, butter lettuce, heirloom tomato, secret bistro sauce on a toasted brioche bun.',
        price: 12.99,
        category: 'Burgers',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Temp: Medium Rare, Well Done; Add-on: Bacon, Avocado',
        stock: 999
      },
      {
        id: 103,
        name: 'Truffle Tagliatelle Carbonara',
        description: 'Fresh egg pasta tossed with creamy egg yolk, Pecorino Romano, guanciale, and finished with fresh shaved Italian black truffles.',
        price: 19.50,
        category: 'Pastas',
        imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Portion: Lunch, Dinner',
        stock: 999
      },
      {
        id: 104,
        name: 'Avocado Quinoa Green Salad',
        description: 'Organic quinoa, Hass avocado, cherry tomatoes, English cucumber, baby spinach, tossed in house lemon-herb vinaigrette.',
        price: 11.00,
        category: 'Salads',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Dressing: Lemon Vinaigrette, Creamy Caesar',
        stock: 999
      },
      {
        id: 105,
        name: 'Molten Chocolate Lava Cake',
        description: 'Rich dark chocolate cake with a warm liquid chocolate center, served with vanilla bean ice cream and fresh raspberries.',
        price: 8.50,
        category: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Vanilla Scoop: Single, Double',
        stock: 999
      },
      {
        id: 106,
        name: 'Fresh Mint Mojito Mocktail',
        description: 'Muddled fresh mint leaves, lime wedges, organic sugar cane syrup, topped with sparkling soda and crushed ice.',
        price: 6.00,
        category: 'Beverages',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Sweetness: Regular, Less Sweet',
        stock: 999
      }
    ];
  }

  if (shopNiche === 'cloth' || shopNiche === 'fashion_men' || shopNiche === 'fashion_women' || shopNiche === 'fashion_kids' || shopNiche === 'fashion_footwear') {
    if (shopNiche === 'fashion_men') {
      return [
        {
          id: 1011,
          name: 'Oversized Hoodie',
          description: 'Discover the latest trends in fashion. Premium quality, perfect fit, just for you.',
          price: 1299.00,
          originalPrice: 1999.00,
          discount: '35%',
          category: "Men's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 25, variants: 'Size: S, M, L, XL; Color: Lavender'
        },
        {
          id: 1012,
          name: 'Floral Summer Dress',
          description: 'Flowing ankle-length chiffon maxi dress with delicate floral prints, V-neckline, and an adjustable waist-tie.',
          price: 1499.00,
          originalPrice: 2299.00,
          discount: '35%',
          category: "Women's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 30, variants: 'Size: S, M, L; Color: Floral'
        },
        {
          id: 1013,
          name: 'Linen Shirt',
          description: 'Classic lightweight linen button-down shirt with a relaxed tailored fit, perfect for casual outings.',
          price: 1099.00,
          originalPrice: 1699.00,
          discount: '35%',
          category: "Men's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Size: S, M, L, XL; Color: Olive Green'
        },
        {
          id: 1014,
          name: 'Slim Fit Jeans',
          description: 'Premium stretch denim slim-fit jeans featuring a mid-rise waist and classic five-pocket construction.',
          price: 1399.00,
          originalPrice: 2099.00,
          discount: '33%',
          category: "Men's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 20, variants: 'Size: 30, 32, 34, 36; Color: Light Blue'
        },
        {
          id: 1015,
          name: 'Bomber Jacket',
          description: 'Sleek black lightweight bomber jacket with ribbed cuffs, zip closure, and side utility pockets.',
          price: 1799.00,
          originalPrice: 2699.00,
          discount: '33%',
          category: "Men's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 12, variants: 'Size: M, L, XL; Color: Black'
        }
      ];
    } else if (shopNiche === 'fashion_women') {
      return [
        {
          id: 1021,
          name: 'Elegant Floral Maxi Dress',
          description: 'Flowing ankle-length chiffon maxi dress with delicate floral prints, V-neckline, and an adjustable waist-tie.',
          price: 2499.00,
          category: "Women's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Size: S, M, L'
        },
        {
          id: 1022,
          name: 'Designer Leather Handbag',
          description: 'Structured top-grain leather shoulder bag with gold-tone hardware and multiple organizational compartments.',
          price: 3499.00,
          category: "Women's Accessories",
          imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 10, variants: 'Color: Tan Brown, Matte Black'
        },
        {
          id: 1023,
          name: 'Cotton Casual Blazer',
          description: 'Modern open-front lightweight cotton blend blazer with notched lapels and front patch pockets.',
          price: 1999.00,
          category: "Women's Clothing",
          imageUrl: 'https://images.unsplash.com/photo-1548624149-f7b3e0c0df4a?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 12, variants: 'Size: S, M, L; Color: Pastel Pink, Ivory'
        }
      ];
    } else if (shopNiche === 'fashion_kids') {
      return [
        {
          id: 1031,
          name: 'Cute Cartoon Cotton Hoodie',
          description: 'Soft brushed fleece pullover hoodie for children featuring fun cartoon character ear extensions on the hood.',
          price: 899.00,
          category: "Kids Wear",
          imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 40, variants: 'Age: 2-3Y, 4-5Y, 6-7Y; Color: Yellow, Sky Blue'
        },
        {
          id: 1032,
          name: 'Kids Denim Dungarees',
          description: 'Classic durable kids denim dungarees with adjustable shoulder straps and side button fasteners.',
          price: 1199.00,
          category: "Kids Wear",
          imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 20, variants: 'Age: 3-4Y, 5-6Y, 7-8Y'
        },
        {
          id: 1033,
          name: 'Soft Cotton Sleepwear Set',
          description: 'Breathable organic cotton matching pajama and long sleeve top set with whimsical space constellation print.',
          price: 799.00,
          category: "Kids Wear",
          imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 35, variants: 'Age: 1-2Y, 3-4Y, 5-6Y'
        }
      ];
    } else if (shopNiche === 'fashion_footwear') {
      return [
        {
          id: 1041,
          name: 'Premium Running Sneakers',
          description: 'High-performance athletic sneakers with reactive foam cushioning and mesh breathability grids.',
          price: 2999.00,
          category: "Footwear",
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Size: UK 7, UK 8, UK 9, UK 10; Color: Sport Red, Jet Black'
        },
        {
          id: 1042,
          name: 'Classic Leather Loafers',
          description: 'Hand-burnished genuine leather slip-on loafers with cushioned leather insoles and durable rubber outsoles.',
          price: 3999.00,
          category: "Footwear",
          imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 12, variants: 'Size: UK 8, UK 9, UK 10; Color: Tan Brown, Dark Cherry'
        }
      ];
    } else {
      return [
        {
          id: 101,
          name: 'Vintage Denim Jacket',
          description: 'Heavyweight washed indigo denim jacket with a soft shearling lining and classic brass button enclosures.',
          price: 89.99,
          category: 'Outerwear',
          imageUrl: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Size: S, M, L, XL; Color: Vintage Blue, Faded Black',
          stock: 15
        },
        {
          id: 102,
          name: 'Cotton Floral Summer Dress',
          description: 'Lightweight, breathable organic cotton dress with a waist-tie belt and a beautiful hand-painted floral motif.',
          price: 54.99,
          category: 'Dresses',
          imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Size: XS, S, M, L',
          stock: 12
        },
        {
          id: 103,
          name: 'Classic Graphic Crewneck Tee',
          description: 'Soft combed cotton t-shirt featuring a minimalist screen-printed abstract art illustration on the front chest.',
          price: 24.99,
          category: 'T-Shirts',
          imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Size: S, M, L, XL; Color: Cotton White, Slate Grey',
          stock: 45
        }
      ];
    }
  }

  if (shopNiche === 'grocery' || shopNiche === 'grocery_fruits' || shopNiche === 'grocery_vegetables' || shopNiche === 'grocery_essential') {
    if (shopNiche === 'grocery_fruits') {
      return [
        {
          id: 2011,
          name: 'Fresh Organic Gala Red Apples (1kg)',
          description: 'Fresh, sweet Gala red apples picked from certified pesticide-free orchards.',
          price: 180.00,
          category: 'Fruits',
          imageUrl: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 50, variants: 'Pack: 1kg Bag, 2kg Carton'
        },
        {
          id: 2012,
          name: 'Sweet Seedless Green Grapes (500g)',
          description: 'Juicy, sweet green seedless grapes packed under hygienic standards.',
          price: 120.00,
          category: 'Fruits',
          imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 40, variants: 'Pack: 500g punnet'
        },
        {
          id: 2013,
          name: 'Premium Alphonso Mangoes (1 Dozen)',
          description: 'Naturally ripened, extremely aromatic and sweet hand-picked Alphonso mangoes.',
          price: 850.00,
          category: 'Fruits',
          imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Pack: 1 Dozen Box'
        }
      ];
    } else if (shopNiche === 'grocery_vegetables') {
      return [
        {
          id: 2021,
          name: 'Fresh Organic Tomatoes (1kg)',
          description: 'Heirloom vine-ripened organic red tomatoes with excellent firmness and flavor.',
          price: 60.00,
          category: 'Vegetables',
          imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a010c129fa6?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 60, variants: 'Weight: 1kg'
        },
        {
          id: 2022,
          name: 'Tender Green Broccoli (1 Piece)',
          description: 'Fresh, crunch-filled premium green broccoli crowns, highly rich in fibers and vitamins.',
          price: 90.00,
          category: 'Vegetables',
          imageUrl: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 25, variants: 'Size: Single piece (approx 350g)'
        },
        {
          id: 2023,
          name: 'Fresh Organic Potatoes (1kg)',
          description: 'Premium quality organic soil potatoes ideal for baking, frying, and curries.',
          price: 40.00,
          category: 'Vegetables',
          imageUrl: 'https://images.unsplash.com/photo-1518977676601-b51482b04115?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 100, variants: 'Weight: 1kg'
        }
      ];
    } else if (shopNiche === 'grocery_essential') {
      return [
        {
          id: 2031,
          name: 'Farm Fresh Whole Milk (1L)',
          description: 'Pasteurized whole organic cow milk rich in vitamin D, sourced from local pastured cows.',
          price: 68.00,
          category: 'Daily Essentials',
          imageUrl: 'https://images.unsplash.com/photo-1584263343329-74f157f461b8?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 45, variants: 'Type: Whole Milk, Low Fat Milk'
        },
        {
          id: 2032,
          name: 'Multi-Grain Sourdough Bread (400g)',
          description: 'High-fiber freshly baked multi-grain bread loaf containing organic oats, barley, and seeds.',
          price: 45.00,
          category: 'Daily Essentials',
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Slice: Sliced, Sourdough Loaf'
        },
        {
          id: 2033,
          name: 'Organic Farm Eggs (Pack of 12)',
          description: 'Free-range brown chicken eggs rich in omega-3 and proteins, delivered secure.',
          price: 95.00,
          category: 'Daily Essentials',
          imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 20, variants: 'Pack: 12 Eggs tray'
        }
      ];
    } else {
      return [
        {
          id: 201,
          name: 'Organic Gala Red Apples (1kg)',
          description: 'Fresh, crisp, and sweet organic red Gala apples harvested daily from certified local eco-orchards.',
          price: 4.99,
          category: 'Fruits & Vegetables',
          imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Pack: 1kg Bag, 2kg Carton',
          stock: 80
        },
        {
          id: 202,
          name: 'Whole Wheat Country Sourdough',
          description: 'Freshly baked bakery bread, naturally leavened, with a thick dark crust and a soft, tangy airy crumb.',
          price: 3.49,
          category: 'Bakery & Bread',
          imageUrl: 'https://images.unsplash.com/photo-1506617498336-d8d30030072e?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Slice: Sliced, Unsliced',
          stock: 15
        },
        {
          id: 203,
          name: 'Farm Fresh Organic Milk (1L)',
          description: 'Creamy, pasteurized whole organic cow milk rich in calcium and vitamins, sourced from grass-fed cows.',
          price: 2.99,
          category: 'Dairy & Eggs',
          imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Type: Whole Milk, Skimmed Milk',
          stock: 35
        }
      ];
    }
  }

  if (shopNiche === 'electronics' || shopNiche === 'electronics_mobile' || shopNiche === 'electronics_laptop' || shopNiche === 'electronics_accessories' || shopNiche === 'electronics_smartwatch') {
    if (shopNiche === 'electronics_mobile') {
      return [
        {
          id: 3011,
          name: 'Flagship 5G Smartphone',
          description: 'Ultramodern smartphone with 6.7" OLED display, 108MP triple camera system, and 5000mAh long battery life.',
          price: 64999.00,
          category: "Mobiles",
          imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Color: Cosmic Gray, Midnight Blue; Storage: 256GB'
        },
        {
          id: 3012,
          name: 'Ultra Thin Protective Phone Case',
          description: 'Shock-proof silicone case with sleek matte finish and raised bezels for screen and camera protection.',
          price: 499.00,
          category: "Accessories",
          imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 50, variants: 'Device: Pro Max Model, Standard Model'
        }
      ];
    } else if (shopNiche === 'electronics_laptop') {
      return [
        {
          id: 3021,
          name: 'Premium Ultrabook 14"',
          description: 'Super-thin laptop with high resolution IPS display, Octa-Core processor, and 16GB RAM for productivity.',
          price: 84999.00,
          category: "Laptops",
          imageUrl: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 10, variants: 'RAM: 16GB DDR5, 32GB DDR5; Storage: 512GB SSD'
        },
        {
          id: 3022,
          name: 'High Performance Gaming Laptop',
          description: 'Immersive gaming setup with powerful graphics card, 144Hz screen refresh rate, and advanced dual-cooling vents.',
          price: 114999.00,
          category: "Laptops",
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 5, variants: 'GPU: RTX 4060, RTX 4070'
        }
      ];
    } else if (shopNiche === 'electronics_accessories') {
      return [
        {
          id: 3031,
          name: 'Noise Cancelling Wireless Headphones',
          description: 'Active hybrid noise cancelling over-ear headphones with premium memory foam earmuffs and high-fidelity sound.',
          price: 8999.00,
          category: "Accessories",
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 25, variants: 'Color: Charcoal Grey, Pure White'
        },
        {
          id: 3032,
          name: 'Ergonomic Wireless Mouse',
          description: 'Optical mouse featuring quiet clicks, thumb scroll wheel, and customizable DPI settings for high precision.',
          price: 1499.00,
          category: "Accessories",
          imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 30, variants: 'Color: Graphite Black, Pearl White'
        }
      ];
    } else if (shopNiche === 'electronics_smartwatch') {
      return [
        {
          id: 3041,
          name: 'GPS Sport Smartwatch',
          description: 'Heart rate monitoring, fitness tracker, blood oxygen sensor, and standalone GPS route tracking.',
          price: 18999.00,
          category: "Smart Watches",
          imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 12, variants: 'Strap: Sports Silicone, Leather Strap'
        },
        {
          id: 3042,
          name: 'Sleek Fitness Tracker Band',
          description: 'Minimalist active fitness band tracking steps, sleep cycles, water intake, and high heart rate alerts.',
          price: 3499.00,
          category: "Smart Watches",
          imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 20, variants: 'Color: Mint Green, Onyx Black'
        }
      ];
    } else {
      return [
        {
          id: 301,
          name: 'Pro Noise-Cancelling Headphones',
          description: 'Active hybrid noise-cancelling wireless over-ear headphones with 40 hours of battery life and high-res audio drivers.',
          price: 149.99,
          category: 'Audio',
          imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Color: Charcoal Black, Platinum Silver',
          stock: 14
        },
        {
          id: 302,
          name: 'RGB Mechanical Gaming Keyboard',
          description: 'Compact 75% hot-swappable mechanical keyboard with premium linear red switches and customizable RGB backlighting.',
          price: 89.99,
          category: 'Peripherals',
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Switch: Red Linear, Brown Tactile',
          stock: 8
        }
      ];
    }
  }

  if (shopNiche === 'pet_food' || shopNiche === 'pet_accessories' || shopNiche === 'pet_medicines') {
    if (shopNiche === 'pet_food') {
      return [
        {
          id: 4011,
          name: 'Premium Chicken & Rice Dry Dog Food (3kg)',
          description: 'Complete nutritional dry food balanced with vitamins, fibers, and high-protein chicken for dogs.',
          price: 1299.00,
          category: "Pet Food",
          imageUrl: 'https://images.unsplash.com/photo-1589721062230-fb10c85c2c7e?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 40, variants: 'Age: Puppy, Adult'
        },
        {
          id: 4012,
          name: 'Salmon in Gravy Wet Cat Food (Pack of 12)',
          description: 'Delicious salmon chunks in thick savory gravy formulated to keep cats active and healthy.',
          price: 790.00,
          category: "Pet Food",
          imageUrl: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 30, variants: 'Flavour: Salmon, Tuna'
        }
      ];
    } else if (shopNiche === 'pet_accessories') {
      return [
        {
          id: 4021,
          name: 'Durable Nylon Dog Harness',
          description: 'No-pull heavy-duty nylon harness with padded breathable mesh lining and reflective strips.',
          price: 599.00,
          category: "Accessories",
          imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 25, variants: 'Size: S, M, L; Color: Bright Orange, Neon Green'
        },
        {
          id: 4022,
          name: 'Soft Fleece Cushioned Pet Bed',
          description: 'Ultra-plush fleece pet bed with elevated rims to support comfortable headrest and sleep.',
          price: 1499.00,
          category: "Accessories",
          imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Size: M, L'
        }
      ];
    } else {
      return [
        {
          id: 4031,
          name: 'Tick & Flea Prevention Drops (Pack of 3)',
          description: 'Vet-recommended topical treatment drops to protect your dogs from fleas, ticks, and lice.',
          price: 849.00,
          category: "Medicines",
          imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 20, variants: 'Pet Weight: 10-20kg, 20-40kg'
        },
        {
          id: 4032,
          name: 'Multi-Vitamin Supplement Syrup (200ml)',
          description: 'Daily nutritional health syrup containing calcium, minerals, and essential vitamins for growth.',
          price: 349.00,
          category: "Medicines",
          imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 15, variants: 'Pack: Single bottle'
        }
      ];
    }
  }

  if (shopNiche === 'books_education' || shopNiche === 'books_novels' || shopNiche === 'books_ebook' || shopNiche === 'books') {
    if (shopNiche === 'books_education') {
      return [
        {
          id: 5011,
          name: 'High School Physics Textbook',
          description: 'Comprehensive guide covering mechanics, quantum theory, electricity, and thermodynamics.',
          price: 699.00,
          category: "Education Books",
          imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 50, variants: 'Binding: Paperback, Hardcover'
        },
        {
          id: 5012,
          name: 'Master Data Structures & Algorithms',
          description: 'Complete syllabus with code implementations in Java, C++, and Python for engineering students.',
          price: 899.00,
          category: "Education Books",
          imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 35, variants: 'Edition: 5th Edition'
        }
      ];
    } else if (shopNiche === 'books_novels') {
      return [
        {
          id: 5021,
          name: 'The Shadow of the Wind',
          description: 'A gripping gothic mystery and romance novel set in post-war Barcelona about a forgotten book.',
          price: 499.00,
          category: "Novels",
          imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 12, variants: 'Type: Paperback'
        },
        {
          id: 5022,
          name: 'Classic Sci-Fi Odyssey',
          description: 'Special hardcover edition of the iconic science fiction masterpiece detailing interstellar space travel.',
          price: 799.00,
          category: "Novels",
          imageUrl: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 10, variants: 'Edition: Hardcover Collector Edition'
        }
      ];
    } else if (shopNiche === 'books_ebook') {
      return [
        {
          id: 5031,
          name: 'Digital Mastery in UI/UX Design (E-Book)',
          description: 'Downloadable e-book containing advanced design principles, wireframing guidelines, and user psychology.',
          price: 299.00,
          category: "E-books",
          imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 999, variants: 'Format: PDF, E-pub'
        },
        {
          id: 5032,
          name: 'Startup Launchpad Manual (E-Book)',
          description: 'Practical workbook detailing seed funding raising, product-market fit, and team operations.',
          price: 199.00,
          category: "E-books",
          imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
          projectId, available: true, stock: 999, variants: 'Format: E-pub, Kindle'
        }
      ];
    } else {
      return [
        {
          id: 401,
          name: 'Best-selling Novel Fiction',
          description: 'Award-winning narrative fiction book from the stationery & literature nest.',
          price: 29.99,
          category: 'Literature',
          imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Format: Paperback, Hardcover',
          stock: 25
        },
        {
          id: 402,
          name: 'Premium Leather Journal',
          description: 'Handcrafted thick paper diary book bound in dark oil-tanned leather hides.',
          price: 45.00,
          category: 'Stationery',
          imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
          projectId: projectId,
          available: true,
          variants: 'Style: Lined Pages, Blank Pages',
          stock: 18
        }
      ];
    }
  }

  // Generic fallback for other niches
  if (shopNiche) {
    const capitalizedNiche = shopNiche.charAt(0).toUpperCase() + shopNiche.slice(1);
    return [
      {
        id: 401,
        name: `Mock Premium ${capitalizedNiche} Item 1`,
        description: `High-quality ${shopNiche} catalog item configured during the workspace setup wizard.`,
        price: 29.99,
        category: `${capitalizedNiche} Essentials`,
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Type: Standard, Premium',
        stock: 25
      },
      {
        id: 402,
        name: `Mock Premium ${capitalizedNiche} Item 2`,
        description: `Elegant ${shopNiche} product designed to elevate your visual lifestyle catalog.`,
        price: 45.00,
        category: `${capitalizedNiche} Collection`,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
        projectId: projectId,
        available: true,
        variants: 'Size: Medium, Large',
        stock: 18
      }
    ];
  }

  // Default fallback mug/tee
  return [
    {
      id: 1,
      name: 'Mock Premium Coffee Mug',
      description: 'Sturdy ceramic mug with a splash of gradient color.',
      price: 18.99,
      category: 'General Storefront',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
      projectId: projectId,
      available: true,
      variants: 'Color: Ceramic White, Charcoal Black',
      stock: 25
    },
    {
      id: 2,
      name: 'Mock Graphic Cotton Tee',
      description: 'Minimalist designer tee made from organic combed cotton.',
      price: 28.00,
      category: 'General Storefront',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
      projectId: projectId,
      available: true,
      variants: 'Size: S, M, L, XL',
      stock: 12
    }
  ];
}

export function getDefaultCoupons(projectId: number) {
  return [
    { id: 1, projectId, code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minOrderAmount: 0, active: true },
    { id: 2, projectId, code: 'FLAT50', discountType: 'fixed', discountValue: 50, minOrderAmount: 200, active: true }
  ];
}

export function getDefaultCategories(projectId: number) {
  return [
    { id: 1, projectId, name: "Shirt" },
    { id: 2, projectId, name: "Pants" },
    { id: 3, projectId, name: "Footwear" }
  ];
}

export function getDefaultBrands(projectId: number) {
  return [
    { id: 1, projectId, name: "Nike" },
    { id: 2, projectId, name: "Adidas" },
    { id: 3, projectId, name: "Puma" }
  ];
}
