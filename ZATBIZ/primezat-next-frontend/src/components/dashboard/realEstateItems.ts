export interface RealEstateSeedItem {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  desc: string;
}

export function getInitialNichesForSubcategory(subcategoryName: string): string[] {
  const subLower = subcategoryName.toLowerCase().trim();
  if (subLower.includes('agency')) return ['Residential', 'Property Dealer'];
  if (subLower.includes('dealer')) {
    if (subLower.includes('apartment') || subLower.includes('flat')) return ['Residential', 'Rental'];
    if (subLower.includes('villa') || subLower.includes('bungalow')) return ['Luxury', 'Residential'];
    if (subLower.includes('plot') || subLower.includes('land')) return ['Builder', 'Property Dealer'];
    if (subLower.includes('farm')) return ['Luxury', 'Residential'];
    if (subLower.includes('office')) return ['Commercial', 'Rental'];
    return ['Residential', 'Property Dealer'];
  }
  if (subLower.includes('builder')) return ['Builder'];
  if (subLower.includes('construction')) return ['Builder'];
  if (subLower.includes('residential')) return ['Residential', 'Builder'];
  if (subLower.includes('commercial')) return ['Commercial'];
  if (subLower.includes('luxury')) return ['Luxury', 'Residential'];
  if (subLower.includes('independent house')) return ['Residential'];
  if (subLower.includes('industrial')) return ['Commercial'];
  if (subLower.includes('warehouse') || subLower.includes('factory')) return ['Commercial'];
  if (subLower.includes('coworking') || subLower.includes('co-working')) return ['Commercial', 'Rental'];
  if (subLower.includes('rental')) {
    if (subLower.includes('vacation')) return ['Rental', 'Luxury'];
    return ['Rental'];
  }
  if (subLower.includes('pg') || subLower.includes('hostel')) return ['Rental'];
  if (subLower.includes('student')) return ['Rental'];
  if (subLower.includes('consultant')) {
    if (subLower.includes('investment')) return ['Commercial', 'Property Dealer'];
    return ['Property Dealer'];
  }
  if (subLower.includes('management')) return ['Rental', 'Commercial'];
  if (subLower.includes('interior')) return ['Residential', 'Commercial'];
  if (subLower.includes('architecture')) return ['Builder'];
  if (subLower.includes('valuation')) return ['Property Dealer'];
  if (subLower.includes('franchise')) return ['Property Dealer', 'Commercial'];
  if (subLower.includes('smart city')) return ['Builder', 'Commercial'];
  
  return ['Residential'];
}

export function generate10SubcategoryItems(subcategoryName: string): RealEstateSeedItem[] {
  const subLower = subcategoryName.toLowerCase().trim();

  // Helper lists of images
  const VILLA_IMGS = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502005229762-fc1b2d812ca5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80'
  ];

  const APARTMENT_IMGS = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&auto=format&fit=crop&q=80'
  ];

  const COMMERCIAL_IMGS = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&auto=format&fit=crop&q=80'
  ];

  const LAND_IMGS = [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80'
  ];

  const SERVICE_IMGS = [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521791136368-1a9b82753043?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80'
  ];

  const INTERIOR_IMGS = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617806118233-18e1db207faf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80'
  ];

  const CONSTRUCTION_IMGS = [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80'
  ];

  // 1. Real Estate Agency
  if (subLower.includes('real estate agency')) {
    return [
      { name: 'Meadowview Premium Villa', price: 12000000, category: 'Residential', imageUrl: VILLA_IMGS[0], desc: 'Elegant 4 BHK luxury villa in prime gated community, 2800 sqft, garden lawn, modular kitchen.' },
      { name: 'Skyline Heights Penthouse', price: 25000000, category: 'Residential', imageUrl: APARTMENT_IMGS[0], desc: 'Exquisite 3 BHK penthouse with panoramic city views, private sky-deck, smart automated controls.' },
      { name: 'Urban Comfort 2 BHK Flat', price: 7500000, category: 'Residential', imageUrl: APARTMENT_IMGS[1], desc: 'Modern 2 BHK apartment near local metro transit hubs, semi-furnished, 24/7 security layout.' },
      { name: 'Greenfield Suburban Duplex', price: 18000000, category: 'Residential', imageUrl: VILLA_IMGS[1], desc: 'Spacious 4 BHK family duplex home with front porch yard, nearby premium international schools.' },
      { name: 'Downtown Studio Suite', price: 4500000, category: 'Residential', imageUrl: APARTMENT_IMGS[2], desc: 'Compact fully-furnished studio apartment, perfect for young executives, gym and pool access.' },
      { name: 'CreekSide Waterfront Duplex', price: 32000000, category: 'Residential', imageUrl: VILLA_IMGS[2], desc: 'Luxury 3 BHK duplex facing the riverfront, private jetty access, premium Italian flooring.' },
      { name: 'Oakwood Cozy Row House', price: 6000000, category: 'Residential', imageUrl: VILLA_IMGS[3], desc: 'Charming 2 BHK independent row house in peaceful residential layout, clear title deeds.' },
      { name: 'Elite automated 3 BHK Apartment', price: 15000000, category: 'Residential', imageUrl: APARTMENT_IMGS[3], desc: 'High-end 3 BHK apartment, pre-installed smart-home features, solar energy backups.' },
      { name: 'Amber Hill Farm Estate', price: 40000000, category: 'Residential', imageUrl: VILLA_IMGS[4], desc: 'Gorgeous countryside weekend farmhouse estate, swimming pool, organic fruit orchards.' },
      { name: 'Parkside Semi-Furnished Flat', price: 8500000, category: 'Residential', imageUrl: APARTMENT_IMGS[4], desc: '3 BHK flat overlooking central park, excellent natural light ventilation, dedicated parking slots.' }
    ];
  }

  // 2. Property Dealer
  if (subLower.includes('property dealer')) {
    return [
      { name: 'Sector 15 Residential Plot', price: 5000000, category: 'Plot', imageUrl: LAND_IMGS[0], desc: 'Premium 1200 sqft residential building plot, construction-ready, clean municipal verification.' },
      { name: 'High-Footfall Retail Shop', price: 9000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[0], desc: 'Ground floor retail shop space in busy shopping district market, excellent tenant potential.' },
      { name: 'Ready-to-move 2 BHK Apartment', price: 5500000, category: 'Residential', imageUrl: APARTMENT_IMGS[5], desc: 'Completely finished 2 BHK flat, modular fittings, immediate registry and possession.' },
      { name: 'Independent 3 BHK House', price: 8000000, category: 'Residential', imageUrl: VILLA_IMGS[5], desc: 'Double-story standalone house in green neighborhood, borewell and corporation water taps.' },
      { name: 'MIDC Zone Industrial Plot', price: 15000000, category: 'Commercial', imageUrl: LAND_IMGS[1], desc: 'Spacious industrial zone plot, heavy vehicle access road front, power substation nearby.' },
      { name: 'Suburban Budget 1 BHK', price: 2800000, category: 'Residential', imageUrl: APARTMENT_IMGS[6], desc: 'Affordable starter apartment, local markets and transit points within walking distances.' },
      { name: 'Agricultural Fertile Land (1 Acre)', price: 4000000, category: 'Land', imageUrl: LAND_IMGS[2], desc: 'Highly fertile soil land package near highway, borewell connection, ideal for farm retreat.' },
      { name: 'Tech Park Commercial Cabin', price: 12000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[1], desc: 'Modern fully-furnished office cabin floor in premium business park, high monthly rental yields.' },
      { name: 'Central Park View Duplex', price: 11000000, category: 'Residential', imageUrl: VILLA_IMGS[6], desc: 'Beautiful 3 BHK duplex home with scenic park views, private terrace deck and gardens.' },
      { name: 'Active Rental Income Shop', price: 6500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[2], desc: 'Pre-leased commercial outlet shop with active tenant bank branch, assured monthly returns.' }
    ];
  }

  // 3. Property Builder
  if (subLower.includes('property builder') || subLower.includes('builder')) {
    return [
      { name: 'Elite Towers Phase 1 (2BHK)', price: 6500000, category: 'Builder', imageUrl: APARTMENT_IMGS[7], desc: 'Pre-launch bookings for premium high-rise apartments, customizable floor plans.' },
      { name: 'Elite Towers Phase 1 (3BHK)', price: 9500000, category: 'Builder', imageUrl: APARTMENT_IMGS[8], desc: 'Spacious 3 BHK under-construction flat, high quality branded fixtures, luxury club access.' },
      { name: 'Green Meadows Villa Booking', price: 16000000, category: 'Builder', imageUrl: VILLA_IMGS[7], desc: 'Pre-booking open for luxury modern independent villas, private pool options available.' },
      { name: 'Premium Semi-Finished Row House', price: 11000000, category: 'Builder', imageUrl: VILLA_IMGS[8], desc: 'Under construction row house, brickwork completed, customizable electrical and tiling packages.' },
      { name: 'Royal Arcade Commercial Studio', price: 3500000, category: 'Builder', imageUrl: COMMERCIAL_IMGS[3], desc: 'Modern studio commercial unit in prime shopping arcade project, booking starting now.' },
      { name: 'Grand Horizon Penthouse (4BHK)', price: 28000000, category: 'Builder', imageUrl: APARTMENT_IMGS[9], desc: 'Exclusive top-floor sky mansion penthouse project booking, private terrace infinity pool.' },
      { name: 'Smart Tech 3 BHK Apartment', price: 12500000, category: 'Builder', imageUrl: APARTMENT_IMGS[0], desc: 'Eco-conscious smart residential flat project with solar roofing, rainwater harvests.' },
      { name: 'Gated Duplex Community Phase 2', price: 14500000, category: 'Builder', imageUrl: VILLA_IMGS[9], desc: 'Independent 4 BHK duplex unit bookings, integrated clubhouse, sports courts.' },
      { name: 'Prime Corporate Plaza Floor', price: 8500000, category: 'Builder', imageUrl: COMMERCIAL_IMGS[4], desc: 'Pre-leased retail or office shell-and-core space in upcoming business plaza complex.' },
      { name: 'Eco-Green Energy Flat', price: 7800000, category: 'Builder', imageUrl: APARTMENT_IMGS[1], desc: 'Energy star rated 2 BHK apartment building project, zero emissions design standards.' }
    ];
  }

  // 4. Construction Company
  if (subLower.includes('construction company') || subLower.includes('construction')) {
    return [
      { name: 'Residential Construction - Basic Package', price: 1500000, category: 'Service', imageUrl: CONSTRUCTION_IMGS[0], desc: 'End-to-end basic residential building services (per 1000 sqft), brick structure and basic tiling.' },
      { name: 'Residential Construction - Premium Package', price: 2800000, category: 'Service', imageUrl: CONSTRUCTION_IMGS[1], desc: 'High-end home building package, premium marble floors, designer modular kitchens, luxury bathroom fittings.' },
      { name: 'Modern Kitchen Remodeling', price: 250000, category: 'Service', imageUrl: INTERIOR_IMGS[0], desc: 'Complete teardown and renovation of kitchen, chimneys, acrylic cabinets and granite counters.' },
      { name: 'Structural Design & Blueprints', price: 80000, category: 'Service', imageUrl: SERVICE_IMGS[0], desc: 'Certified civil engineer design calculations, column-beam maps, and municipal approval layouts.' },
      { name: 'Bathroom Restoration & Plumbing', price: 120000, category: 'Service', imageUrl: INTERIOR_IMGS[1], desc: 'Complete bathroom floor leakproofing, replacement of pipes and premium sanitary fixtures.' },
      { name: 'Exterior Facade & Painting Package', price: 150000, category: 'Service', imageUrl: CONSTRUCTION_IMGS[2], desc: 'Weatherproof high-grade exterior texture painting, wall repairs and scaffolding erections.' },
      { name: 'Foundation Pouring & Ground Civil Works', price: 400000, category: 'Service', imageUrl: CONSTRUCTION_IMGS[3], desc: 'Heavy machinery site excavation, deep footing casting, anti-termite foundation chemical coatings.' },
      { name: 'Reinforced Concrete Slab Casting', price: 300000, category: 'Service', imageUrl: CONSTRUCTION_IMGS[4], desc: 'Slab reinforcement steel layouts and ready-mix concrete pouring for roof extensions.' },
      { name: 'Interior Wall Modification & Masonry', price: 180000, category: 'Service', imageUrl: CONSTRUCTION_IMGS[5], desc: 'Removing internal partition walls and erecting lightweight aerated concrete blocks.' },
      { name: 'Corporate Office Fit-out Services', price: 850000, category: 'Service', imageUrl: COMMERCIAL_IMGS[5], desc: 'Complete corporate construction fitting, glass partition setups, network wiring and suspended ceilings.' }
    ];
  }

  // 5. Residential Projects
  if (subLower.includes('residential projects') || subLower.includes('residential')) {
    return [
      { name: 'Vista Meadows - 2 BHK Comfort', price: 7000000, category: 'Residential', imageUrl: APARTMENT_IMGS[2], desc: 'Premium 2 BHK apartment unit in standard tower, landscaping garden view.' },
      { name: 'Vista Meadows - 3 BHK Premium', price: 10500000, category: 'Residential', imageUrl: APARTMENT_IMGS[3], desc: 'Spacious 3 BHK apartment, private balcony deck, modular kitchen fixtures.' },
      { name: 'Skyline Residences - Luxury 3 BHK', price: 14000000, category: 'Residential', imageUrl: APARTMENT_IMGS[4], desc: 'Premium apartment layout featuring double-glazed window layouts, modular wardrobe.' },
      { name: 'Parkland Heights - Budget 1 BHK', price: 3800000, category: 'Residential', imageUrl: APARTMENT_IMGS[5], desc: 'Cozy and compact 1 BHK, active hot water solar systems, proximity to market hubs.' },
      { name: 'Oasis Duplexes - Executive 4 BHK', price: 21000000, category: 'Residential', imageUrl: VILLA_IMGS[0], desc: 'Elegant independent villa layout, private swimming pool, double-car parking porch.' },
      { name: 'Whispering Palms - Villa Plot', price: 6000000, category: 'Residential', imageUrl: LAND_IMGS[3], desc: 'Fully leveled residential plot in premium layout, landscaped roads, active water pipelines.' },
      { name: 'Riverfront Towers - Smart 2 BHK', price: 8500000, category: 'Residential', imageUrl: APARTMENT_IMGS[6], desc: 'Modernist smart home integrated 2 BHK apartment overlooking gorgeous riverside boardwalks.' },
      { name: 'Urban Nest - Studio Apartment', price: 3200000, category: 'Residential', imageUrl: APARTMENT_IMGS[7], desc: 'Fully furnished studio unit, high rent generation profile, active concierge facilities.' },
      { name: 'Heritage Enclave - Traditional Rowhouse', price: 9500000, category: 'Residential', imageUrl: VILLA_IMGS[1], desc: 'Classical brick design 3 BHK row house, independent water bore, open roof terrace.' },
      { name: 'Sapphire Mansions - Elite 5 BHK', price: 39000000, category: 'Residential', imageUrl: VILLA_IMGS[2], desc: 'Waterfront luxury estate, home theater rooms, modular kitchen with pantry space.' }
    ];
  }

  // 6. Commercial Real Estate
  if (subLower.includes('commercial real estate') || subLower.includes('commercial')) {
    return [
      { name: 'High-Street Mall Retail Showroom', price: 35000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[6], desc: 'Double height glass front showroom, high footfalls, central air conditioning system.' },
      { name: 'Grade-A Corporate Office Floor', price: 21000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[7], desc: 'Fully carpeted open floor plan layout, conference zones, fire safety sprinklers.' },
      { name: 'Ground Floor Retail Shop Outlet', price: 12000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[8], desc: 'High visibility street level shop, ideal for franchise brands, medical clinics.' },
      { name: 'Logistics Distribution Depot', price: 48000000, category: 'Commercial', imageUrl: LAND_IMGS[4], desc: 'Large scale distribution facility with multiple loading bays, heavy concrete flooring.' },
      { name: 'Fully Furnished Coworking Floor', price: 75000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[9], desc: 'Premium workspace layout, 12 private cabins, meeting rooms, cafeteria area.' },
      { name: 'Boutique Commercial Showroom', price: 18000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[0], desc: 'Stylishly designed shop space in luxury market zone, suitable for designer brands.' },
      { name: 'IT Office Cabin Workspace', price: 4500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[1], desc: 'Small plug-and-play business cabin, glass windows, high speed fiber wifi ports.' },
      { name: 'Rooftop Restaurant Commercial Space', price: 29000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[2], desc: 'Elite top floor commercial space with open air terrace dining license permissions.' },
      { name: 'Medical Clinic Consulting Suite', price: 6500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[3], desc: 'Soundproofed doctor consulting suite rooms, waiting lounge areas, washroom attachments.' },
      { name: 'Banks Premium Institution Space', price: 16000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[4], desc: 'Strongroom concrete wall vault provisions, high-security glass panes pre-installed.' }
    ];
  }

  // 7. Luxury Property Agency
  if (subLower.includes('luxury')) {
    return [
      { name: 'The Grand Chateau Mansion', price: 95000000, category: 'Luxury', imageUrl: VILLA_IMGS[3], desc: 'Exquisite 6 BHK estate, private landscaped gardens, heated indoor pool, cellar.' },
      { name: 'Infinity Sky-Penthouse Suite', price: 120000000, category: 'Luxury', imageUrl: APARTMENT_IMGS[8], desc: 'Elite triplex penthouse, floor-to-ceiling glass layout, infinity rooftop deck pool.' },
      { name: 'The Riviera Private Beach Villa', price: 150000000, category: 'Luxury', imageUrl: VILLA_IMGS[4], desc: 'Waterfront contemporary villa with direct access to private sand beach strips.' },
      { name: 'Tuscan Style 5 BHK Villa', price: 82000000, category: 'Luxury', imageUrl: VILLA_IMGS[5], desc: 'Classic European design manor, handmade clay tiling, private wine vineyard yards.' },
      { name: 'Sky-Mansion Duplex Suite', price: 105000000, category: 'Luxury', imageUrl: APARTMENT_IMGS[9], desc: 'Ultra luxury duplex, Italian marble interior, automated home command panels.' },
      { name: 'Heritage Colonial Manor Estate', price: 78000000, category: 'Luxury', imageUrl: VILLA_IMGS[6], desc: 'Restored colonial style estate, high ceilings, expansive teak wood wrap verandas.' },
      { name: 'Contemporary Minimalist Glass Villa', price: 69000000, category: 'Luxury', imageUrl: VILLA_IMGS[7], desc: 'Stunning designer home, concrete steel cantilever structures, natural rock finishes.' },
      { name: 'Cliff-side Sea View Manor', price: 140000000, category: 'Luxury', imageUrl: VILLA_IMGS[8], desc: 'Stellar ocean views, private elevator, infinity pool hanging over the ocean cliff.' },
      { name: 'The Sanctuary Forest Lodge Estate', price: 55000000, category: 'Luxury', imageUrl: VILLA_IMGS[9], desc: 'Private wooden villa estate inside a gated nature sanctuary, eco-luxe features.' },
      { name: 'Championship Golf Course Facing Villa', price: 110000000, category: 'Luxury', imageUrl: VILLA_IMGS[0], desc: 'Elite villa backing directly onto a championship golf green course layout.' }
    ];
  }

  // 8. Apartment & Flat Dealer
  if (subLower.includes('apartment') || subLower.includes('flat')) {
    return [
      { name: 'Cozy Studio Apartment Unit', price: 3000000, category: 'Residential', imageUrl: APARTMENT_IMGS[0], desc: 'Compact studio flat, modular drop-down bed space, modular kitchen alcove.' },
      { name: 'Modern 1 BHK Starter Flat', price: 4200000, category: 'Residential', imageUrl: APARTMENT_IMGS[1], desc: 'Perfect starter flat for small families, gas pipeline hookups, balcony area.' },
      { name: 'Elegant 2 BHK Family Apartment', price: 6800000, category: 'Residential', imageUrl: APARTMENT_IMGS[2], desc: 'Spacious flat in premium high-rise society, children play park access.' },
      { name: 'Deluxe 3 BHK Family Apartment', price: 9800000, category: 'Residential', imageUrl: APARTMENT_IMGS[3], desc: 'Three side open corner apartment, modular storage wardrobes, dry balcony area.' },
      { name: 'Premium 3 BHK Rooftop Penthouse', price: 17500000, category: 'Residential', imageUrl: APARTMENT_IMGS[4], desc: 'Top floor penthouses, wooden sun-deck patio, gorgeous skyline lookouts.' },
      { name: 'Luxury 4 BHK Duplex Flat', price: 24000000, category: 'Residential', imageUrl: APARTMENT_IMGS[5], desc: 'Double floor layout, private internal staircase, luxury sanitary items.' },
      { name: 'Semi-Furnished 2 BHK Corner Flat', price: 7200000, category: 'Residential', imageUrl: APARTMENT_IMGS[6], desc: 'East-facing flat, modular kitchen, chimney, wardrobes and lighting pre-installed.' },
      { name: 'High-Rise 2 BHK City View Apartment', price: 8000000, category: 'Residential', imageUrl: APARTMENT_IMGS[7], desc: '20th floor apartment, glass railings, stellar night view of the city.' },
      { name: 'Budget-Friendly 2 BHK Flat', price: 4800000, category: 'Residential', imageUrl: APARTMENT_IMGS[8], desc: 'Affordable family apartment in suburbs, public transit stations nearby.' },
      { name: 'Serviced 1 BHK Suite Flat', price: 5200000, category: 'Residential', imageUrl: APARTMENT_IMGS[9], desc: 'Fully furnished serviced suite, hotel-like concierge services, high Airbnb returns.' }
    ];
  }

  // 9. Villa & Bungalow Dealer
  if (subLower.includes('villa') || subLower.includes('bungalow')) {
    return [
      { name: 'Spanish Revival 3 BHK Villa', price: 19000000, category: 'Residential', imageUrl: VILLA_IMGS[1], desc: 'Stucco walls, arched doorways, private backyard courtyard with fountain features.' },
      { name: 'Royal Heritage 4 BHK Bungalow', price: 27500000, category: 'Residential', imageUrl: VILLA_IMGS[2], desc: 'Classic red brick bungalow design, wide wooden balconies, landscaped front lawns.' },
      { name: 'Contemporary Minimalist Villa', price: 32000000, category: 'Residential', imageUrl: VILLA_IMGS[3], desc: 'Modern geometric villa layout, open glass panel facades, private sun lounger decks.' },
      { name: 'Tropical Oasis Pool Bungalow', price: 29000000, category: 'Residential', imageUrl: VILLA_IMGS[4], desc: 'Lush greenery surroundings, outdoor pool pavilion, gazebo structure.' },
      { name: 'Classic Colonial Style Bungalow', price: 24000000, category: 'Residential', imageUrl: VILLA_IMGS[5], desc: 'Standalone bungalow layout, high vaulted ceilings, large porticos and porches.' },
      { name: 'Smart Home Luxury 5 BHK Villa', price: 41000000, category: 'Residential', imageUrl: VILLA_IMGS[6], desc: 'Voice controlled home features, energy efficient heat pumps, solar arrays.' },
      { name: 'Scenic Lakeview 3 BHK Bungalow', price: 18000000, category: 'Residential', imageUrl: VILLA_IMGS[7], desc: 'Peaceful location overlooking a lake, wooden veranda deck, boat dock.' },
      { name: 'Modernist Glass Facade Villa', price: 38000000, category: 'Residential', imageUrl: VILLA_IMGS[8], desc: 'Premium architectural design, imported steel girders, open atrium courtyard.' },
      { name: 'Countryside Stone Bungalow', price: 15000000, category: 'Residential', imageUrl: VILLA_IMGS[9], desc: 'Rustic stone construction, cozy wood fireplace hearths, private farm lands.' },
      { name: 'Championship Golf 4 BHK Villa', price: 45000000, category: 'Residential', imageUrl: VILLA_IMGS[0], desc: 'Exclusive villa backing directly onto a championship golf green course layout.' }
    ];
  }

  // 10. Independent House Dealer
  if (subLower.includes('independent house') || subLower.includes('house')) {
    return [
      { name: 'Cozy 2 BHK Independent Rowhouse', price: 5500000, category: 'Residential', imageUrl: VILLA_IMGS[1], desc: 'Standalone row house with ground floor garage parking, independent terrace.' },
      { name: 'Spacious 3 BHK Duplex House', price: 8500000, category: 'Residential', imageUrl: VILLA_IMGS[2], desc: 'Double floor family house, separate living and dining zones, modular fitting.' },
      { name: 'Traditional 3 BHK Standalone House', price: 7000000, category: 'Residential', imageUrl: VILLA_IMGS[3], desc: 'Independent home layout, small private yard, solid teakwood window frames.' },
      { name: 'Modern 4 BHK Multi-Story House', price: 12000000, category: 'Residential', imageUrl: VILLA_IMGS[4], desc: 'Triple story independent house layout, separate rental flat unit on ground floor.' },
      { name: 'Corner Plot Independent Villa', price: 9500000, category: 'Residential', imageUrl: VILLA_IMGS[5], desc: 'Premium corner house, high boundary security wall, lawn and borewell pumps.' },
      { name: 'Budget 2 BHK Ground Floor House', price: 4000000, category: 'Residential', imageUrl: VILLA_IMGS[6], desc: 'Independent unit on ground floor, perfect for senior citizens, low maintenance.' },
      { name: 'Luxury Duplex with Private Terrace', price: 14500000, category: 'Residential', imageUrl: VILLA_IMGS[7], desc: 'High-end 4 BHK independent duplex, marble stairs, glass railing balconies.' },
      { name: 'Contemporary Suburban House', price: 7800000, category: 'Residential', imageUrl: VILLA_IMGS[8], desc: 'Modern concrete styling, open layout plan kitchen, close to public transit.' },
      { name: 'Standalone Yard House (3 BHK)', price: 8800000, category: 'Residential', imageUrl: VILLA_IMGS[9], desc: 'Family home featuring a front yard garden, fruit trees, concrete driveway.' },
      { name: 'Semi-Furnished Independent House', price: 6200000, category: 'Residential', imageUrl: VILLA_IMGS[0], desc: '2 BHK home, pre-installed kitchen shelves, safety grilles on all windows.' }
    ];
  }

  // 11. Plot & Land Dealer
  if (subLower.includes('plot') || subLower.includes('land')) {
    return [
      { name: 'Premium 1200 sqft Residential Plot', price: 2500000, category: 'Plot', imageUrl: LAND_IMGS[0], desc: 'Level ground plot in upcoming township layout, pre-laid sewage and water lines.' },
      { name: 'Corner Gated Layout Plot (1500 sqft)', price: 3500000, category: 'Plot', imageUrl: LAND_IMGS[1], desc: 'Corner location plot in secure gated layout, security guard kiosk at entry.' },
      { name: 'Main Road Commercial Plot', price: 8500000, category: 'Plot', imageUrl: LAND_IMGS[2], desc: 'Highly visible commercial plot, ideal for constructing banks, malls or clinics.' },
      { name: '10,000 sqft Industrial Plot', price: 12000000, category: 'Plot', imageUrl: LAND_IMGS[3], desc: 'Spacious industrial zone plot, heavy vehicle access, electricity grid line.' },
      { name: 'Scenic Farmland Plot - 0.5 Acre', price: 1800000, category: 'Plot', imageUrl: LAND_IMGS[4], desc: 'Fenced agricultural plot, fertile red soil, borewell pump pre-installed.' },
      { name: 'Beachfront Villa Plot Layout', price: 9500000, category: 'Plot', imageUrl: LAND_IMGS[5], desc: 'Premium coastal plot for constructing sea-facing luxury holiday homes.' },
      { name: 'Premium 2400 sqft Villa Plot', price: 5500000, category: 'Plot', imageUrl: LAND_IMGS[6], desc: 'Large plot size, wide internal asphalt roads, children play parks.' },
      { name: 'Suburban Budget Plot Package', price: 1500000, category: 'Plot', imageUrl: LAND_IMGS[7], desc: 'Affordable plot package in developing residential sectors, immediate registry.' },
      { name: 'Agricultural Land Parcel (2 Acres)', price: 5000000, category: 'Land', imageUrl: LAND_IMGS[8], desc: 'Large agricultural land parcel near river, fertile silt soils, clear titles.' },
      { name: 'Warehousing Industrial Plot', price: 9000000, category: 'Plot', imageUrl: LAND_IMGS[9], desc: 'Perfect plot layout for industrial warehouse sheds, close to national highways.' }
    ];
  }

  // 12. Farm House Dealer
  if (subLower.includes('farm house') || subLower.includes('farmhouse')) {
    return [
      { name: 'Rustic Countryside 2 BHK Farmhouse', price: 8500000, category: 'Residential', imageUrl: VILLA_IMGS[3], desc: 'Charming farmhouse with wood-paneled walls, spacious brick fire stove kitchen.' },
      { name: 'Luxury 3 BHK Farmhouse with Pool', price: 16000000, category: 'Residential', imageUrl: VILLA_IMGS[4], desc: 'Modern farmhouse estate, private outdoor pool, wooden sun terrace decks.' },
      { name: 'Organic Farm Retreat & Orchard', price: 19500000, category: 'Residential', imageUrl: VILLA_IMGS[5], desc: 'Farmhouse surrounded by mango orchards, drip irrigation systems pre-installed.' },
      { name: 'Weekend Cabin on 0.5 Acre Green Plot', price: 5500000, category: 'Residential', imageUrl: VILLA_IMGS[6], desc: 'Compact log cabin escape, stone wall borders, solar panels, barbecue deck.' },
      { name: 'Modern Farm Villa & Lawn Gardens', price: 22000000, category: 'Residential', imageUrl: VILLA_IMGS[7], desc: 'Stylishly designed farm villa, glass walls, large green manicured lawns.' },
      { name: 'Heritage Brick Farmhouse Estate', price: 12500000, category: 'Residential', imageUrl: VILLA_IMGS[8], desc: 'Authentic retro brick styling, clay tile roofing, deep shaded sit-outs.' },
      { name: 'Eco-Retreat Solar Powered Farmhouse', price: 14000000, category: 'Residential', imageUrl: VILLA_IMGS[9], desc: 'Self-sufficient farmhouse, rainwater collection, bio-gas digester installation.' },
      { name: 'Premium 4 BHK Ranch Estate', price: 31000000, category: 'Residential', imageUrl: VILLA_IMGS[0], desc: 'Large scale ranch house, private horse stables, wooden fence boundaries.' },
      { name: 'Riverside Holiday Cottage Cabin', price: 7500000, category: 'Residential', imageUrl: VILLA_IMGS[1], desc: 'Cozy holiday escape cottage with direct access to river stream, wooden deck.' },
      { name: 'Vineyard Farmhouse Manor', price: 45000000, category: 'Residential', imageUrl: VILLA_IMGS[2], desc: 'Elite luxury villa, private grape vineyard sections, stone wine cellar.' }
    ];
  }

  // 13. Industrial Property
  if (subLower.includes('industrial')) {
    return [
      { name: 'Heavy Manufacturing Industrial Plant', price: 85000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[0], desc: 'Large factory complex, overhead gantry cranes, heavy industrial power loads.' },
      { name: 'MIDC Industrial Shed (5,000 sqft)', price: 18000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[1], desc: 'Pre-fabricated steel structural shed, concrete flooring, loading docks.' },
      { name: 'Industrial Plot for Processing Unit', price: 22000000, category: 'Commercial', imageUrl: LAND_IMGS[3], desc: 'Level terrain plot in industrial estate, chemical waste pipeline connection.' },
      { name: 'Steel Fabrication Workshop Facility', price: 29000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[2], desc: 'Operating workshop facility, high fire safety setups, exhaust blowers.' },
      { name: 'Pharma Grade-A Processing Plant', price: 65000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[3], desc: 'Completely dust-free sterile processing facility, epoxy flooring layouts.' },
      { name: 'Assembly Line Factory Complex', price: 41000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[4], desc: 'Double floor layout, conveyor line layouts, executive office chambers.' },
      { name: 'Chemical Zone Industrial Plot', price: 15000000, category: 'Commercial', imageUrl: LAND_IMGS[4], desc: 'Approved plot for category-1 industrial chemical manufacturing setups.' },
      { name: 'Heavy Machinery Garage & Yard', price: 24000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[5], desc: 'Enclosed garage compound for truck servicing, hydraulic lift pits.' },
      { name: 'Food Processing Certified Facility', price: 58000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[6], desc: 'Government agency compliant processing setup, stainless steel layouts.' },
      { name: 'Multi-use Heavy Industrial Estate', price: 92000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[7], desc: 'Massive scale industrial estate, security towers, dedicated power bank.' }
    ];
  }

  // 14. Warehouse & Factory
  if (subLower.includes('warehouse') || subLower.includes('factory')) {
    return [
      { name: 'Cold Storage Warehouse Facility', price: 38000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[0], desc: 'Advanced sub-zero cold room units, computerized climate tracking.' },
      { name: 'Logistics Distribution Warehouse', price: 55000000, category: 'Commercial', imageUrl: LAND_IMGS[5], desc: 'E-commerce logistics warehouse, 10 automated shutter loading dock bays.' },
      { name: 'Light Manufacturing Factory Shed', price: 19000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[8], desc: 'Structural brick factory structure, heavy sheet iron roof structure.' },
      { name: 'Fulfillment Center Warehouse', price: 72000000, category: 'Commercial', imageUrl: LAND_IMGS[6], desc: 'Massive high-volume storage space, pre-installed smart packing conveyor lines.' },
      { name: 'Industrial Storage Locker Complex', price: 12000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[1], desc: 'Multi-room commercial lock and key warehouse chambers for rental.' },
      { name: 'Heavy Duty Crane Factory Shed', price: 46000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[9], desc: 'Factory structural bay with tracks for 20-ton overhead gantry cranes.' },
      { name: 'Multi-tier Racking Warehouse Space', price: 28000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[2], desc: 'Ready-installed high pallet racking frames, forklift battery stations.' },
      { name: 'Clean Room Packaging Factory', price: 34000000, category: 'Commercial', imageUrl: CONSTRUCTION_IMGS[0], desc: 'Controlled air pressure clean rooms, pharmaceutical packaging lines.' },
      { name: 'Transit Logistics Warehouse Hub', price: 22000000, category: 'Commercial', imageUrl: LAND_IMGS[7], desc: 'High highway connectivity transport warehouse, large truck yard plots.' },
      { name: 'Commercial Godown & Storage Unit', price: 9500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[3], desc: 'Medium budget storage warehouse close to regional railway parcel hubs.' }
    ];
  }

  // 15. Office Space Dealer
  if (subLower.includes('office')) {
    return [
      { name: 'Fully Furnished 10-Seater Office', price: 3500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[4], desc: 'Plug and play setup, workstations, manager desk, wifi router.' },
      { name: 'Corporate Office Floor (5000 sqft)', price: 42000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[5], desc: 'Grade-A building floor, glass panels, central HVAC cooling systems.' },
      { name: 'Executive Private Office Cabin', price: 1500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[6], desc: 'Bespoke design cabin inside business plaza, corporate card access entry.' },
      { name: 'Startup Office Space (25 work Desks)', price: 9500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[7], desc: 'Spacious workspace layout, private manager rooms, conference room.' },
      { name: 'Premium Glass Facade IT Office', price: 18000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[8], desc: 'Ultra-modern office structure, soundproofed glass panels, high server room.' },
      { name: 'Low-Cost Business Office Unit', price: 2500000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[9], desc: 'Compact office setup, perfect for local accounting or legal professionals.' },
      { name: 'Corporate Conference & Meeting Hub', price: 4000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[0], desc: 'Meeting board rooms, pre-installed projector and smart presentation screens.' },
      { name: 'Penthouse Office Executive Suite', price: 15000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[1], desc: 'Luxury top-floor office, panoramic windows, attached executive bathroom.' },
      { name: 'Medical & Dental Clinic Office Suite', price: 6000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[2], desc: 'Sanitary wall finishes, plumbing lines pre-routed to patient cabin dental chairs.' },
      { name: 'Shared Office Unit for Freelancers', price: 1800000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[3], desc: 'Divided cabin structure, reception area, common visitor sitting lobby.' }
    ];
  }

  // 16. Co-working Space Provider
  if (subLower.includes('coworking') || subLower.includes('co-working')) {
    return [
      { name: 'Single Day Hot Desk Pass', price: 500, category: 'Pass', imageUrl: COMMERCIAL_IMGS[4], desc: 'Flexible shared hot-desk desk space access, high-speed fiber internet and coffee.' },
      { name: 'Monthly Dedicated Desk Plan', price: 8500, category: 'Subscription', imageUrl: COMMERCIAL_IMGS[5], desc: 'Your own fixed desk space, ergonomic chair, locking drawers, mail address.' },
      { name: 'Private 4-Seater Team Cabin', price: 32000, category: 'Rental', imageUrl: COMMERCIAL_IMGS[6], desc: 'Enclosed soundproofed office cabin layout, whiteboard, secure door card locks.' },
      { name: 'Private 10-Seater Team Suite', price: 75000, category: 'Rental', imageUrl: COMMERCIAL_IMGS[7], desc: 'Spacious workspace for startups, internal manager desk, high filing cabinets.' },
      { name: 'Conference Board Room (PerHour)', price: 1500, category: 'Booking', imageUrl: COMMERCIAL_IMGS[8], desc: 'Premium presentation room, smart screen, audio tele-conferencing blocks.' },
      { name: 'Weekly Flexi Desk Access Pass', price: 3500, category: 'Pass', imageUrl: COMMERCIAL_IMGS[9], desc: '7 days access to open lounge desk areas, printing scanning credits.' },
      { name: 'Virtual Office Address & Mail Box', price: 2500, category: 'Subscription', imageUrl: SERVICE_IMGS[1], desc: 'Corporate business address registry, mail package receiving services.' },
      { name: 'Dedicated Creator Media Studio', price: 18000, category: 'Booking', imageUrl: INTERIOR_IMGS[2], desc: 'Acoustically treated sound recording studio, podcast mics, ring lighting panels.' },
      { name: 'Seminar & Event Hall Daily Pass', price: 25000, category: 'Booking', imageUrl: COMMERCIAL_IMGS[0], desc: 'Large open theater seating room, audio system, projector and podium.' },
      { name: 'Private Phone Booth Call Pass', price: 5000, category: 'Subscription', imageUrl: COMMERCIAL_IMGS[1], desc: 'Monthly booking package for single sound-isolated booths for client sales calls.' }
    ];
  }

  // 17. Property Rental Agency
  if (subLower.includes('property rental agency') || subLower.includes('rental-agency')) {
    return [
      { name: 'Cozy 1 BHK Rental Apartment near Metro', price: 18000, category: 'Rental', imageUrl: APARTMENT_IMGS[0], desc: 'Semi-furnished rental apartment, modular kitchen, immediate tenancy checks.' },
      { name: 'Spacious 2 BHK Family Rental Flat', price: 28000, category: 'Rental', imageUrl: APARTMENT_IMGS[1], desc: 'Spacious family flat inside standard society, children playground block.' },
      { name: 'Fully Furnished 3 BHK Rental Flat', price: 45000, category: 'Rental', imageUrl: APARTMENT_IMGS[2], desc: 'Luxury furniture items, sofa set, beds, smart TV and washing machine.' },
      { name: '3 BHK Gated Community Rental Villa', price: 65000, category: 'Rental', imageUrl: VILLA_IMGS[0], desc: 'Independent duplex villa layout on monthly lease, modular kitchen yard.' },
      { name: 'Budget 1 Room Kitchen (1RK) Flat', price: 10000, category: 'Rental', imageUrl: APARTMENT_IMGS[3], desc: 'Affordable studio room flat layout, perfect for bachelor student lodging.' },
      { name: 'High-Street Commercial Shop Lease', price: 50000, category: 'Rental', imageUrl: COMMERCIAL_IMGS[0], desc: 'High footfall shop retail space, lease agreement minimum 3 years.' },
      { name: 'Furnished Office Cabin Monthly Rent', price: 22000, category: 'Rental', imageUrl: COMMERCIAL_IMGS[1], desc: 'Plug and play office space, utility bills included in rent packages.' },
      { name: 'Executive Studio Apartment Rent', price: 20000, category: 'Rental', imageUrl: APARTMENT_IMGS[4], desc: 'Stylishly designed flat, modern interior layout, close to tech parks.' },
      { name: 'Independent 2 BHK Suburban Rental', price: 25000, category: 'Rental', imageUrl: VILLA_IMGS[1], desc: '独立 duplex house on rental lease, standalone parking, rooftop terrace.' },
      { name: 'Student Flatshare Rental Bed Space', price: 15000, category: 'Rental', imageUrl: APARTMENT_IMGS[5], desc: 'Rent a private room in shared 3 BHK apartment, high wifi systems.' }
    ];
  }

  // 18. Vacation Rental Agency
  if (subLower.includes('vacation')) {
    return [
      { name: 'Beachfront Cozy Cottage (Per Night)', price: 6500, category: 'Stay', imageUrl: VILLA_IMGS[2], desc: 'Charming coastal cottage, sea-facing deck porch, direct sand access.' },
      { name: 'Mountain View Alpine Cabin Stay', price: 8000, category: 'Stay', imageUrl: VILLA_IMGS[3], desc: 'Alpine A-frame wooden cabin, fireplace hearth, outdoor hot-tub jacuzzi.' },
      { name: 'Luxury Backwater Houseboat Stay', price: 12000, category: 'Stay', imageUrl: VILLA_IMGS[4], desc: 'Cruising house boat suite, chef prepared meals included, deck views.' },
      { name: 'Private Pool Holiday Villa Stay', price: 18000, category: 'Stay', imageUrl: VILLA_IMGS[5], desc: 'Large 4 BHK villa package, private swimming pool, barbecue grill garden.' },
      { name: 'Forest Edge Glamping Dome Night', price: 5000, category: 'Stay', imageUrl: VILLA_IMGS[6], desc: 'Geodesic dome tent under the stars, premium bed, transparent canopy panel.' },
      { name: 'Heritage Homestay Bed & Breakfast', price: 4000, category: 'Stay', imageUrl: VILLA_IMGS[7], desc: '100-year old traditional house room, organic home cooked breakfast.' },
      { name: 'City Skyline Penthouse Stay', price: 7500, category: 'Stay', imageUrl: APARTMENT_IMGS[0], desc: 'Airbnb apartment, chic retro styling, walkable to central tourist sites.' },
      { name: 'Riverside Log Cabin Stay', price: 3500, category: 'Stay', imageUrl: VILLA_IMGS[8], desc: 'Rustic log cabin close to national park trailheads, firepit garden.' },
      { name: 'Desert Oasis Luxury Tent Stay', price: 9000, category: 'Stay', imageUrl: VILLA_IMGS[9], desc: 'Glamping tent layout, camel safari booking included, folk music dinners.' },
      { name: 'Panoramic Cliff-side Sea Villa Stay', price: 22000, category: 'Stay', imageUrl: VILLA_IMGS[0], desc: 'Elite villa suite, private infinity pool hanging over sunset ocean views.' }
    ];
  }

  // 19. PG & Hostel Management
  if (subLower.includes('pg') || subLower.includes('hostel')) {
    return [
      { name: 'Single Occupancy AC PG Room', price: 15000, category: 'PG', imageUrl: APARTMENT_IMGS[0], desc: 'Private room inside corporate PG layout, attached bath, 3 daily meals included.' },
      { name: 'Double Sharing AC PG Bed Space', price: 9500, category: 'PG', imageUrl: APARTMENT_IMGS[1], desc: 'Shared room bed, separate cupboards, high-speed wifi, laundry services.' },
      { name: 'Triple Sharing Student PG Bed', price: 6500, category: 'PG', imageUrl: APARTMENT_IMGS[2], desc: 'Budget accommodation, shared study lounge, mess food catering.' },
      { name: 'Working Professional PG Studio', price: 20000, category: 'PG', imageUrl: APARTMENT_IMGS[3], desc: 'Elite studio suite, modular pantry kitchen, desk, housekeeping.' },
      { name: 'Student Hostel Bunk Bed Space', price: 5500, category: 'Hostel', imageUrl: APARTMENT_IMGS[4], desc: 'Co-living hostel bed near major institutes, study library access.' },
      { name: 'Budget Non-AC Single Room PG', price: 8000, category: 'PG', imageUrl: APARTMENT_IMGS[5], desc: 'Affordable single room, shared bathroom utility, cleaning checklist.' },
      { name: 'Luxury Girls PG Single Suite', price: 14000, category: 'PG', imageUrl: APARTMENT_IMGS[6], desc: 'Secure girls hostel PG unit, biometric access doors, warden supervision.' },
      { name: 'Boys Hostel Shared Room Bed', price: 6000, category: 'Hostel', imageUrl: APARTMENT_IMGS[7], desc: 'Comfortable shared room, gym and recreational games room access.' },
      { name: 'Corporate Executive Long-Stay PG', price: 18000, category: 'PG', imageUrl: APARTMENT_IMGS[8], desc: 'High quality studio accommodation, corporate laundry, buffet meals.' },
      { name: 'Deluxe Guest Suite Daily Pass', price: 1500, category: 'PG', imageUrl: APARTMENT_IMGS[9], desc: 'Short stay guest room accommodation, available for visiting parents.' }
    ];
  }

  // 20. Student Accommodation
  if (subLower.includes('student')) {
    return [
      { name: 'University Flatshare Private Room', price: 11000, category: 'Student', imageUrl: APARTMENT_IMGS[0], desc: 'Private lockable room inside shared 3 BHK student apartment, shared kitchen.' },
      { name: 'Campus Shared Dormitory Bed', price: 5000, category: 'Student', imageUrl: APARTMENT_IMGS[1], desc: 'Bunk bed inside student dormitory house, laundry room access.' },
      { name: 'Compact Studio Flat for Students', price: 16000, category: 'Student', imageUrl: APARTMENT_IMGS[2], desc: 'Independent studio apartment unit, study desk, utility bills package.' },
      { name: '2 BHK Shared Student Apartment', price: 24000, category: 'Student', imageUrl: APARTMENT_IMGS[3], desc: 'Entire 2 BHK flat lease, ideal for 3-4 flatmates, modular kitchen.' },
      { name: 'Budget Bunk Bed Co-Living Dorm', price: 45000, category: 'Student', imageUrl: APARTMENT_IMGS[4], desc: 'Affordable bunk bed, game console lounge, cafeteria access.' },
      { name: 'Single PG Room near College Hub', price: 9500, category: 'Student', imageUrl: APARTMENT_IMGS[5], desc: 'Single student room, study lamp, wardrobe and breakfast included.' },
      { name: 'Premium Student Suite with Study Desk', price: 13500, category: 'Student', imageUrl: APARTMENT_IMGS[6], desc: 'Ergonomic chair study corner, bookshelves, high speed wifi routers.' },
      { name: 'Flatshare Shared Master Bed Space', price: 8000, category: 'Student', imageUrl: APARTMENT_IMGS[7], desc: 'Large master bedroom shared between 2 students, attached bathroom.' },
      { name: 'Off-Campus Student Housing Bed', price: 6000, category: 'Student', imageUrl: APARTMENT_IMGS[8], desc: 'Clean bed layout, student shuttle bus service to campus doors.' },
      { name: 'Library-Adjacent Student Cabin Room', price: 7000, category: 'Student', imageUrl: APARTMENT_IMGS[9], desc: 'Quiet residential room near university main libraries, green neighborhood.' }
    ];
  }

  // 21. Real Estate Consultant
  if (subLower.includes('real estate consultant')) {
    return [
      { name: 'Home Buyer Consulting Session', price: 2500, category: 'Consulting', imageUrl: SERVICE_IMGS[0], desc: '1-on-1 advisor matching for property layouts, budget planning, developer track audits.' },
      { name: 'Legal Property Title Verification', price: 15000, category: 'Legal Service', imageUrl: SERVICE_IMGS[1], desc: 'Comprehensive checking of deed titles, ownership histories, property encumbrance checks.' },
      { name: 'Market Value Appraisal Report', price: 7500, category: 'Service', imageUrl: SERVICE_IMGS[2], desc: 'Certified pricing evaluation of houses or commercial shop properties, area rate check.' },
      { name: 'Property Portfolio Audit', price: 12000, category: 'Consulting', imageUrl: SERVICE_IMGS[3], desc: 'Reviewing client property holdings, yield improvements, buy/sell timeline plans.' },
      { name: 'Commercial Lease Negotiation', price: 20000, category: 'Legal Service', imageUrl: SERVICE_IMGS[4], desc: 'Drafting commercial tenant lease contracts, lock-in clauses and rent hikes adjustments.' },
      { name: 'Real Estate Tax Structuring Session', price: 5000, category: 'Consulting', imageUrl: SERVICE_IMGS[5], desc: 'Advisory on capital gain tax exemptions, section-54 benefits, property wealth tax.' },
      { name: 'RERA Compliance Advisory Session', price: 8500, category: 'Consulting', imageUrl: SERVICE_IMGS[6], desc: 'Helping builders register layouts under RERA agency rules, document prep checks.' },
      { name: 'Premium Investment Deal Sourcing', price: 25000, category: 'Consulting', imageUrl: SERVICE_IMGS[7], desc: 'Custom matching profile of high returns commercial properties and distress sales.' },
      { name: 'Property Registration Drafting', price: 10000, category: 'Legal Service', imageUrl: SERVICE_IMGS[8], desc: 'Drafting of sale deeds, power of attorneys, registry office appointments setup.' },
      { name: 'NRI Buying Assistance Package', price: 18000, category: 'Consulting', imageUrl: SERVICE_IMGS[9], desc: 'End-to-end buying facilitation for NRI clients, power of attorney audits, local banking.' }
    ];
  }

  // 22. Property Investment Consultant
  if (subLower.includes('investment')) {
    return [
      { name: 'Portfolio Design Consultation', price: 10000, category: 'Consulting', imageUrl: SERVICE_IMGS[0], desc: 'Bespoke design of property investments, balance between capital gains and rentals.' },
      { name: 'Commercial Shop High-Yield Sourcing', price: 35000, category: 'Service', imageUrl: SERVICE_IMGS[1], desc: 'Sourcing of commercial shops with 7-9% rental yields, corporate lease options.' },
      { name: 'Fractional Ownership Advisory Session', price: 15000, category: 'Consulting', imageUrl: SERVICE_IMGS[2], desc: 'Guide to invest in Grade-A office spaces via fractional ownership schemes.' },
      { name: 'REITs vs Physical Property Advisory', price: 8000, category: 'Consulting', imageUrl: SERVICE_IMGS[3], desc: 'Comparative study session matching risk profiles of REIT assets and land.' },
      { name: 'Land Development ROI Projections', price: 50000, category: 'Service', imageUrl: SERVICE_IMGS[4], desc: 'Financial modeling of residential land layout plotting returns, building costs.' },
      { name: 'Capital Gains Tax Saving Consultation', price: 12000, category: 'Consulting', imageUrl: SERVICE_IMGS[5], desc: 'Plan tax-saving routes using Capital Gains bonds and property reinvestments.' },
      { name: 'Project Risk Valuation Audit', price: 18000, category: 'Service', imageUrl: SERVICE_IMGS[6], desc: 'Auditing under-construction builder project timelines, financing, RERA logs.' },
      { name: 'Joint Venture Commercial Sourcing', price: 45000, category: 'Service', imageUrl: SERVICE_IMGS[7], desc: 'Structuring builder-landlord joint development agreements, profit-split shares.' },
      { name: 'Rental Yield Optimization Audit', price: 15000, category: 'Service', imageUrl: SERVICE_IMGS[8], desc: 'Assessing your vacant apartments, proposing interior upgrade models to boost rents.' },
      { name: 'Real Estate Wealth Management Blueprint', price: 25000, category: 'Consulting', imageUrl: SERVICE_IMGS[9], desc: 'Multi-generational real estate holding plans, inheritance structuring, asset trusts.' }
    ];
  }

  // 23. Property Management Company
  if (subLower.includes('management')) {
    return [
      { name: 'Basic Residential Property Management', price: 3500, category: 'Monthly Pack', imageUrl: SERVICE_IMGS[0], desc: 'Monthly upkeep checks, lightbulb replacements, coordinator for utility bills.' },
      { name: 'Full-Service Tenant Placement Pack', price: 10000, category: 'Service', imageUrl: SERVICE_IMGS[1], desc: 'Marketing your flat, executing background tenant checks, tenancy contracts.' },
      { name: 'Monthly Rent Collection Service', price: 1500, category: 'Monthly Pack', imageUrl: SERVICE_IMGS[2], desc: 'Automated monthly rent collection, issuing rent receipts, default notices.' },
      { name: '24/7 Emergency Repairs & Plumbing', price: 5000, category: 'Monthly Pack', imageUrl: SERVICE_IMGS[3], desc: 'Subscribed 24/7 coordinator for immediate pipe bursts, electrical shortcuts.' },
      { name: 'Vacation Home Management Pack', price: 8000, category: 'Monthly Pack', imageUrl: SERVICE_IMGS[4], desc: 'Management of Airbnb rentals, guest checkins, professional laundry and cleanup.' },
      { name: 'Commercial Plaza Association Management', price: 25000, category: 'Monthly Pack', imageUrl: SERVICE_IMGS[5], desc: 'Facility management of corporate offices, parking, escalator systems upkeep.' },
      { name: 'Property Safety & Status Inspection', price: 2500, category: 'Service', imageUrl: SERVICE_IMGS[6], desc: 'In-depth inspection, structural cracks review, paint health checks.' },
      { name: 'Lawn Care & Exterior Maintenance', price: 4000, category: 'Monthly Pack', imageUrl: SERVICE_IMGS[7], desc: 'Garden landscaping, fence paints, moss clearing of driveways.' },
      { name: 'Eviction Legal Coordination Service', price: 15000, category: 'Service', imageUrl: SERVICE_IMGS[8], desc: 'Managing legal notifications and court hearings for default tenants.' },
      { name: 'End-to-End NRI Property Care Pack', price: 30000, category: 'Annual Pack', imageUrl: SERVICE_IMGS[9], desc: 'Annual checks, taxes filed, vacant apartment keys management, regular updates.' }
    ];
  }

  // 24. Interior Design Company
  if (subLower.includes('interior')) {
    return [
      { name: 'Living Room Space Layout Plan', price: 45000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[0], desc: '2D layouts, paint palette card matching, lighting locations blueprint.' },
      { name: 'Modular Kitchen Design & 3D Model', price: 35000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[1], desc: 'Custom cabinets sizing, chimneys layout, pull-out storage shelves.' },
      { name: 'Master Bedroom Aesthetic Decor Pack', price: 60000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[2], desc: 'Acoustics checks, bed headboard layouts, sliding wardrobe layouts.' },
      { name: 'Full Home Color & Lighting Consult', price: 15000, category: 'Consulting', imageUrl: INTERIOR_IMGS[3], desc: 'Selecting color themes, warm/cool LED lighting layout plans.' },
      { name: 'Commercial Office Fit-Out Interior Styling', price: 120000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[4], desc: 'Workstation alignments, reception branding graphics, cabin designs.' },
      { name: 'Custom Furniture Sourcing Assistant', price: 25000, category: 'Consulting', imageUrl: INTERIOR_IMGS[5], desc: 'Accompanying client to timber markets, furniture manufacturers selection.' },
      { name: 'Kids Bedroom Theme Design', price: 40000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[6], desc: 'Creative decals layouts, bunk beds blueprints, study tables spacing.' },
      { name: 'Bathroom Luxury Renovation Layout', price: 30000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[7], desc: 'Shower cubicle spacing, stone flooring design, hot tub fits.' },
      { name: '3D Room Renderings (Per Room)', price: 12000, category: 'Design Pack', imageUrl: INTERIOR_IMGS[8], desc: 'Photo-realistic 3D rendering views showing final textures and lightings.' },
      { name: 'Turnkey Luxury Villa Interior Decor', price: 450000, category: 'Project Pack', imageUrl: INTERIOR_IMGS[9], desc: 'Complete home design, material sourcing, on-site supervision.' }
    ];
  }

  // 25. Architecture Firm
  if (subLower.includes('architecture')) {
    return [
      { name: '2D Floor Plan Layout Design', price: 25000, category: 'Drafting', imageUrl: INTERIOR_IMGS[6], desc: 'Precision building drawings, room wall dimensions, door window lists.' },
      { name: '3D Building Exterior Model', price: 55000, category: 'Modeling', imageUrl: INTERIOR_IMGS[7], desc: 'Modern facade lookups, material textures renderings, front gate views.' },
      { name: 'Structural Load Calculations', price: 40000, category: 'Engineering', imageUrl: CONSTRUCTION_IMGS[0], desc: 'Steel bar reinforcement thickness requirements, pillar placements maps.' },
      { name: 'Eco-Green House Architecture Plan', price: 85000, category: 'Drafting', imageUrl: INTERIOR_IMGS[8], desc: 'Passive solar heating alignments, rainwater collection tanks sizing.' },
      { name: 'Building Municipal Approvals File', price: 35000, category: 'Drafting', imageUrl: SERVICE_IMGS[1], desc: 'Preparing standard blueprint prints matching local zoning laws.' },
      { name: 'Landscape & Courtyard Architecture', price: 30000, category: 'Drafting', imageUrl: VILLA_IMGS[3], desc: 'Pool layouts, backyard sit-outs, garden fountain layouts plans.' },
      { name: 'Historic Renovation Concept Architecture', price: 95000, category: 'Modeling', imageUrl: VILLA_IMGS[4], desc: 'Restoring historic structures while maintaining safety codes.' },
      { name: 'Commercial Plaza Architectural Blueprint', price: 250000, category: 'Drafting', imageUrl: COMMERCIAL_IMGS[5], desc: 'Large scale building layout, parking basements, elevator shafts.' },
      { name: 'Electrical & Plumbing Layout Drawings', price: 18000, category: 'Drafting', imageUrl: INTERIOR_IMGS[9], desc: 'Wall piping lines, power distribution boxes locations plans.' },
      { name: 'Modern Villa Custom Architectural Concept', price: 150000, category: 'Drafting', imageUrl: VILLA_IMGS[5], desc: 'High-end designer villa concept, double height living rooms plans.' }
    ];
  }

  // 26. Home Loan Consultant
  if (subLower.includes('loan')) {
    return [
      { name: 'Home Loan Eligibility score Check', price: 1500, category: 'Audit', imageUrl: SERVICE_IMGS[0], desc: 'Checking bank scores, debt-to-income checks, advising adjustments.' },
      { name: 'Interest Rate Comparison Audit', price: 1000, category: 'Audit', imageUrl: SERVICE_IMGS[1], desc: 'Compiling latest home loan schemes from 15 top commercial banks.' },
      { name: 'Bank Balance Transfer Processing', price: 5000, category: 'Service', imageUrl: SERVICE_IMGS[2], desc: 'Processing paperwork to transfer loans to low interest options.' },
      { name: 'NRI Loan Documentation Advisory', price: 8500, category: 'Consulting', imageUrl: SERVICE_IMGS[3], desc: 'Document checks for foreign residents buying property locally.' },
      { name: 'Commercial Property Loan File Processing', price: 15000, category: 'Service', imageUrl: SERVICE_IMGS[4], desc: 'Drafting files for purchasing retail shops, warehouses or office spaces.' },
      { name: 'Low-Income / No-Doc Loan Sourcing', price: 10000, category: 'Service', imageUrl: SERVICE_IMGS[5], desc: 'Alternate banking checks for self-employed professionals.' },
      { name: 'Pre-Approved Loan File Processing', price: 3000, category: 'Service', imageUrl: SERVICE_IMGS[6], desc: 'Speedy filing to secure bank loan sanctions before property deals.' },
      { name: 'Government Loan Subsidy Sourcing', price: 2500, category: 'Service', imageUrl: SERVICE_IMGS[7], desc: 'Applying for central interest subsidies for first time buyers.' },
      { name: 'Mortgage Loan against Property Setup', price: 12000, category: 'Service', imageUrl: SERVICE_IMGS[8], desc: 'Securing liquidity by mortgaging commercial or residential plots.' },
      { name: 'Joint Home Loan Tax Benefit Plan', price: 2000, category: 'Consulting', imageUrl: SERVICE_IMGS[9], desc: 'Structuring loan shares between partners to maximize tax benefits.' }
    ];
  }

  // 27. Property Valuation Company
  if (subLower.includes('valuation')) {
    return [
      { name: 'Government Certified Valuation Report', price: 8500, category: 'Certified Val', imageUrl: SERVICE_IMGS[0], desc: 'Official report for court disputes, stamp duty evaluations.' },
      { name: 'Land Surveying & Boundary Report', price: 12000, category: 'Service', imageUrl: LAND_IMGS[0], desc: 'Physical site coordinates mapping using high precision equipment.' },
      { name: 'Home Resale Valuation Appraisal', price: 5000, category: 'Service', imageUrl: SERVICE_IMGS[1], desc: 'Checking flat resale values based on age and local market data.' },
      { name: 'Bank Mortgage Valuation Certification', price: 7500, category: 'Certified Val', imageUrl: SERVICE_IMGS[2], desc: 'Certified asset checks for bank loan guarantees.' },
      { name: 'Rental Yield & Fair Rent Assessment', price: 4000, category: 'Service', imageUrl: SERVICE_IMGS[3], desc: 'Assessing maximum fair rentals based on local amenities.' },
      { name: 'Capital Gains Tax Valuation Report', price: 10000, category: 'Certified Val', imageUrl: SERVICE_IMGS[4], desc: 'Determining property values on historical dates for tax calculations.' },
      { name: 'Commercial Complex Asset Valuation', price: 35000, category: 'Certified Val', imageUrl: COMMERCIAL_IMGS[0], desc: 'Comprehensive financial appraisal of corporate malls or offices.' },
      { name: 'Insurance Replacement Cost Assessment', price: 9000, category: 'Service', imageUrl: SERVICE_IMGS[5], desc: 'Calculating building reconstruction costs for property insurance policies.' },
      { name: 'Gift Deed Valuation & Certified Audit', price: 6000, category: 'Certified Val', imageUrl: SERVICE_IMGS[6], desc: 'Valuation files for property transfer deeds between relatives.' },
      { name: 'Judicial Property Valuation Audit', price: 15000, category: 'Certified Val', imageUrl: SERVICE_IMGS[7], desc: 'Expert court witness property evaluations, document checking.' }
    ];
  }

  // 28. Real Estate Franchise
  if (subLower.includes('franchise')) {
    return [
      { name: 'Franchise Starter Package - Silver', price: 250000, category: 'Franchise Package', imageUrl: COMMERCIAL_IMGS[0], desc: 'Starter brand rights, local agent portal setup, regional training materials.' },
      { name: 'Franchise Expansion Package - Gold', price: 500000, category: 'Franchise Package', imageUrl: COMMERCIAL_IMGS[1], desc: 'Premium rights, advanced CRM with lead systems, dedicated manager support.' },
      { name: 'Lead Generation CRM Integration', price: 50000, category: 'Franchise Service', imageUrl: SERVICE_IMGS[0], desc: 'Pre-set CRM dashboard setup, automated buyer SMS alerts.' },
      { name: 'Local Broker Recruitment & Training Kit', price: 25000, category: 'Franchise Service', imageUrl: SERVICE_IMGS[1], desc: 'Operational manuals, video tutorials, hiring tests templates.' },
      { name: 'Regional Marketing Collaterals Starter Kit', price: 35000, category: 'Franchise Service', imageUrl: SERVICE_IMGS[2], desc: 'Templates for pamphlets, site banners, visiting cards.' },
      { name: 'Exclusive Territory Licensing Rights', price: 150000, category: 'Franchise Package', imageUrl: COMMERCIAL_IMGS[2], desc: 'Zero competition guarantee in your select municipal district zone.' },
      { name: 'Corporate Website & Local SEO Pack', price: 40000, category: 'Franchise Service', imageUrl: SERVICE_IMGS[3], desc: 'Custom local site section development, local Google map rankings setup.' },
      { name: 'Operations Manual & SOPs', price: 15000, category: 'Franchise Service', imageUrl: SERVICE_IMGS[4], desc: 'Standard operating rules for property verification, deals processing.' },
      { name: 'Franchise Annual Renewal Sourcing', price: 60000, category: 'Franchise Service', imageUrl: SERVICE_IMGS[5], desc: 'Annual audit, website domain extensions, training certifications updates.' },
      { name: 'Multi-Office Network Hub Package', price: 800000, category: 'Franchise Package', imageUrl: COMMERCIAL_IMGS[3], desc: 'Franchise rights to set up 3 offices in the metropolitan city.' }
    ];
  }

  // 29. Smart City Developer
  if (subLower.includes('smart city') || subLower.includes('smartcity')) {
    return [
      { name: 'IoT Smart Grid Township Landscape Blueprint', price: 180000, category: 'Smart Solutions', imageUrl: LAND_IMGS[0], desc: 'Design layout for smart water grid, automated solar panels street light networks.' },
      { name: 'Eco-Township Smart Drainage Design', price: 150000, category: 'Smart Solutions', imageUrl: LAND_IMGS[1], desc: 'Layout for smart flood drainage pipelines, rainwater storage grid integration.' },
      { name: 'Automated Smart Traffic Flow Blueprint', price: 95000, category: 'Smart Solutions', imageUrl: COMMERCIAL_IMGS[0], desc: 'Design of smart vehicle cameras sensors grids to optimize traffic signal timings.' },
      { name: 'Solar Grid Infrastructure Planning', price: 220000, category: 'Smart Solutions', imageUrl: LAND_IMGS[2], desc: 'Cabling blueprints to link rooftop house solar to community grid batteries.' },
      { name: 'Smart City High-Tech Security Grid', price: 160000, category: 'Smart Solutions', imageUrl: COMMERCIAL_IMGS[1], desc: 'Facial recognition camera location maps, automated fire sensors alarms grid.' },
      { name: 'Zero-Waste Management Community Layout', price: 125000, category: 'Smart Solutions', imageUrl: LAND_IMGS[3], desc: 'Smart rubbish bins, composting facility coordinates, waste logistics layouts.' },
      { name: 'Smart Park IoT Landscaping Sourcing', price: 85000, category: 'Smart Solutions', imageUrl: LAND_IMGS[4], desc: 'Irrigation soil moisture sensors network, smart public wifi nodes.' },
      { name: 'Smart Home Automation Standards Sourcing', price: 50000, category: 'Smart Solutions', imageUrl: VILLA_IMGS[0], desc: 'Guidelines for builder electrical wiring to support automated appliances.' },
      { name: 'Connected Community Fiber Grid Layout', price: 75000, category: 'Smart Solutions', imageUrl: LAND_IMGS[5], desc: 'Broadband optical fiber path underground routing layouts for township houses.' },
      { name: 'Smart City Masterplan Consulting Session', price: 300000, category: 'Smart Solutions', imageUrl: COMMERCIAL_IMGS[2], desc: 'Comprehensive urban design consulting session with smart cities architects.' }
    ];
  }

  // Fallback / default properties
  return [
    { name: 'Meadowview Family Villa', price: 7500000, category: 'Residential', imageUrl: VILLA_IMGS[0], desc: 'Spacious 4 BHK family villa, 2400 sqft, garden-facing lawn, modular kitchen.' },
    { name: 'Oakwood Suburban Home', price: 5000000, category: 'Residential', imageUrl: VILLA_IMGS[1], desc: 'Cozy 3 BHK independent house, 1800 sqft, nearby parks and school districts.' },
    { name: 'Apex Plaza Office Space', price: 25000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[0], desc: 'Premium multi-office commercial floor, 3200 sqft, centralized AC, security.' },
    { name: 'Metropolitan Retail Spot', price: 18000000, category: 'Commercial', imageUrl: COMMERCIAL_IMGS[1], desc: 'High footfall street-level retail shop outlet, 1200 sqft, glass display front.' },
    { name: 'Skyline Heights Apartment', price: 35000, category: 'Rental', imageUrl: APARTMENT_IMGS[0], desc: 'Semi-furnished 2 BHK rental flat, modular fittings, 24/7 security.' },
    { name: 'Greenfield Cozy Studio', price: 20000, category: 'Rental', imageUrl: APARTMENT_IMGS[1], desc: 'Fully furnished 1 BHK studio space, modern amenities, close to public transit.' },
    { name: 'Riverfront Township Plot', price: 4000000, category: 'Builder', imageUrl: LAND_IMGS[0], desc: 'Construction-ready plots in premium gated community layout.' },
    { name: 'Agent Brokerage Consultation Pass', price: 500, category: 'Property Dealer', imageUrl: SERVICE_IMGS[0], desc: 'Book a 1-on-1 session with our certified real estate broker.' },
    { name: 'The Sapphire Estate Mansion', price: 85000000, category: 'Luxury', imageUrl: VILLA_IMGS[2], desc: 'Exquisite 6 BHK luxury mansion, private swimming pool, home theatre.' },
    { name: 'Oceanview Panoramic Penthouse', price: 62000000, category: 'Luxury', imageUrl: APARTMENT_IMGS[2], desc: 'Elite 4 BHK penthouse, rooftop terrace deck, automated smart systems.' }
  ];
}
