import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-sorrento-boucle-sofa',
    name: 'Sorrento Curved Bouclé Sofa',
    slug: 'sorrento-curved-boucle-sofa',
    category: 'sofas',
    categoryLabel: 'Sofas',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 145000,
    originalPrice: 168000,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 38,
    shortDescription: 'Organic sculptural curve wrapped in tactile Italian wool bouclé with reinforced kiln-dried beechwood framing.',
    fullDescription: 'The Sorrento Sofa embodies sensual modernism with its sweeping, conversational curve. Designed as an anchor centerpiece for expansive living rooms, it features multi-density high-resilience foam layered with hypoallergenic European goose down feathers. Each piece is hand-tailored with invisible welt seams, providing 360-degree sculptural beauty from every vantage point.',
    materials: ['Italian Textured Wool Bouclé', 'Kiln-Dried European Beechwood', 'Feather Down Blend Core', 'High-Resilience Cold Foam'],
    dimensions: {
      width: '260 cm',
      depth: '115 cm',
      height: '76 cm',
      seatHeight: '43 cm',
      weight: '78 kg'
    },
    colors: [
      { name: 'Oatmeal Bouclé', hex: '#EBE5D8', inStock: true },
      { name: 'Warm Charcoal', hex: '#2F2E2C', inStock: true },
      { name: 'Forest Moss', hex: '#3E4739', inStock: false },
      { name: 'Terracotta Sand', hex: '#BA7A65', inStock: true }
    ],
    sizes: ['3-Seater (240 cm)', '4-Seater Grande (260 cm)', 'Modular Sectional (320 cm)'],
    badges: ['Best Seller', 'New'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Vacuum regularly on low suction with soft upholstery brush attachment. Blot spills immediately with clean dry white cloth; professional dry clean recommended.',
    warranty: '10-Year Structural Frame Warranty, 3-Year Upholstery Warranty',
    leadTime: 'In Stock • Ready to dispatch in 48 hours',
    collectionSlug: 'warm-brutalism',
    collectionName: 'Warm Brutalism'
  },
  {
    id: 'prod-kyoto-walnut-daybed',
    name: 'Kyoto Minimalist Walnut Daybed',
    slug: 'kyoto-minimalist-walnut-daybed',
    category: 'sofas',
    categoryLabel: 'Sofas',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 98000,
    originalPrice: 115000,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 24,
    shortDescription: 'Solid American black walnut platform with hand-woven paper cord bolster cushion in Belgian natural flax linen.',
    fullDescription: 'Drawing inspiration from traditional Japanese sukiya-style joinery, the Kyoto Daybed functions gracefully as a lounge daybed, study bench, or guest seating. The solid American Walnut frame features exposed half-lap corner joints and a natural oil-rubbed satin finish that enhances the rich swirling wood grain over decades of use.',
    materials: ['Solid American Black Walnut', '100% Belgian Washed Flax Linen', 'Natural Latex Core', 'Brass Hardware Accents'],
    dimensions: {
      width: '205 cm',
      depth: '85 cm',
      height: '42 cm',
      seatHeight: '42 cm',
      weight: '48 kg'
    },
    colors: [
      { name: 'Natural Flax Linen', hex: '#DED6C7', inStock: true },
      { name: 'Olive Drab', hex: '#4A5043', inStock: true },
      { name: 'Smoked Ink', hex: '#232323', inStock: true }
    ],
    sizes: ['Single (190 cm)', 'Studio (205 cm)'],
    badges: ['Crafted to Order'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Dust frame with microfiber cloth. Treat walnut with organic beeswax balm once yearly to preserve timber luster.',
    warranty: '15-Year Solid Timber Joinery Guarantee',
    leadTime: 'Crafted to Order • Dispatches in 10-14 days',
    collectionSlug: 'japandi-haven',
    collectionName: 'Japandi Haven'
  },
  {
    id: 'prod-atelier-modular-sectional',
    name: 'Atelier Modular 4-Piece Sectional',
    slug: 'atelier-modular-4-piece-sectional',
    category: 'sofas',
    categoryLabel: 'Sofas',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 215000,
    originalPrice: 245000,
    discountPercentage: 12,
    rating: 5.0,
    reviewCount: 19,
    shortDescription: 'Configurable low-profile modules in vintage washed velvet with extra-deep 105cm feather lounging seats.',
    fullDescription: 'The Atelier system redefines relaxed architectural lounging. Each module can be locked seamlessly together or separated into standalone conversation armchairs and ottomans. Featuring concealed alligator clips beneath the timber plinth and double-stitched French piped seams.',
    materials: ['Performance Belgian Velvet', 'FSC-Certified Solid Larch', 'Memory Foam Base with Goose Down Topper'],
    dimensions: {
      width: '340 cm',
      depth: '175 cm',
      height: '72 cm',
      seatHeight: '40 cm',
      weight: '120 kg'
    },
    colors: [
      { name: 'Warm Taupe Velvet', hex: '#9E9484', inStock: true },
      { name: 'Sable Brown', hex: '#4A3B32', inStock: true },
      { name: 'Pale Sage', hex: '#929B88', inStock: true }
    ],
    sizes: ['3-Piece Standard (280 cm)', '4-Piece Corner Lounge (340 cm)', '5-Piece Grand Layout (420 cm)'],
    badges: ['Best Seller'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Velvet responds beautifully to gentle steaming. Professional steam cleaning recommended annually.',
    warranty: '10-Year Frame & Cushion Resilience Guarantee',
    leadTime: 'In Stock • Dispatches in 3-5 days',
    collectionSlug: 'warm-brutalism',
    collectionName: 'Warm Brutalism'
  },
  {
    id: 'prod-nara-fluted-oak-bed',
    name: 'Nara Fluted Oak Platform Bed',
    slug: 'nara-fluted-oak-bed',
    category: 'beds',
    categoryLabel: 'Beds',
    room: 'bedroom',
    roomLabel: 'Bedroom',
    price: 125000,
    originalPrice: 145000,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 31,
    shortDescription: 'Floating solid white oak frame with an artisan hand-reeded fluted headboard and integrated cantilevered nightstands.',
    fullDescription: 'The Nara Bed establishes architectural serenity in the master suite. Carved from sustainable American White Oak, the headboard features individual three-dimensional fluted dowels that catch indirect light with mesmerizing warmth. Integrated cantilevered nightstands float effortlessly without footprint clutter.',
    materials: ['Solid American White Oak', 'Oak Veneer Headboard Core', 'Solid Birch Slat Spring System'],
    dimensions: {
      width: '235 cm (incl. side tables)',
      depth: '220 cm',
      height: '98 cm',
      seatHeight: '28 cm',
      weight: '92 kg'
    },
    colors: [
      { name: 'Natural White Oak', hex: '#D6C8AF', inStock: true },
      { name: 'Smoked Dark Oak', hex: '#4A3E36', inStock: true },
      { name: 'Bleached Bone Oak', hex: '#EAE5DB', inStock: false }
    ],
    sizes: ['Queen (60" x 78")', 'King (72" x 78")', 'Super King (78" x 84")'],
    badges: ['Best Seller'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Wipe down with soft lint-free cloth. Avoid abrasive chemical wood cleaners.',
    warranty: '12-Year Structural Timber Warranty',
    leadTime: 'In Stock • Ready to dispatch in 48 hours',
    collectionSlug: 'japandi-haven',
    collectionName: 'Japandi Haven'
  },
  {
    id: 'prod-verona-linen-upholstered-bed',
    name: 'Verona Winged Linen Bed',
    slug: 'verona-winged-linen-bed',
    category: 'beds',
    categoryLabel: 'Beds',
    room: 'bedroom',
    roomLabel: 'Bedroom',
    price: 110000,
    rating: 4.8,
    reviewCount: 17,
    shortDescription: 'Gentle curved wingback headboard tailored in heavy slub flax linen with recessed walnut base.',
    fullDescription: 'Designed for quiet luxury, the Verona Winged Bed envelopes you in cocoon-like acoustic calmness. The padded headboard provides supreme ergonomic back support for late-night reading, while the recessed dark walnut perimeter base creates the illusion of gentle levitation.',
    materials: ['Heavy Slub Belgian Linen', 'American Walnut Base', 'Engineered Hardwood Inner Frame', 'Ergonomic Beech Slats'],
    dimensions: {
      width: '200 cm',
      depth: '225 cm',
      height: '115 cm',
      seatHeight: '32 cm',
      weight: '85 kg'
    },
    colors: [
      { name: 'Chalk White', hex: '#F4F2EC', inStock: true },
      { name: 'Warm Putty', hex: '#C7BEB1', inStock: true },
      { name: 'Muted Terracotta', hex: '#B57461', inStock: true }
    ],
    sizes: ['Queen (60" x 78")', 'King (72" x 78")'],
    badges: ['New'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Spot clean linen with mild water-free solvent. Professional upholstery care recommended.',
    warranty: '10-Year Frame Warranty',
    leadTime: 'Crafted to Order • Dispatches in 7-10 days',
    collectionSlug: 'warm-brutalism',
    collectionName: 'Warm Brutalism'
  },
  {
    id: 'prod-brutalist-travertine-table',
    name: 'Brutalist Travertine Dining Table',
    slug: 'brutalist-travertine-dining-table',
    category: 'dining',
    categoryLabel: 'Dining',
    room: 'dining-room',
    roomLabel: 'Dining Room',
    price: 185000,
    originalPrice: 220000,
    discountPercentage: 16,
    rating: 5.0,
    reviewCount: 29,
    shortDescription: 'Solid monolithic Roman travertine table top resting on dual sculptural fluted stone cylinder pedestals.',
    fullDescription: 'A monumental presence for the modern dining space. Quarried in Tivoli, Italy, each table top is meticulously hand-honed with naturally open pores selectively filled with matching resin to create a smooth, dining-ready surface while retaining timeless tactile geological character. Seats 8 to 10 guests comfortably.',
    materials: ['Honed Italian Roman Travertine Stone', 'Steel Reinforced Core Rods', 'Stain-Resistant Matte Nano-Sealant'],
    dimensions: {
      width: '240 cm',
      depth: '105 cm',
      height: '75 cm',
      weight: '210 kg'
    },
    colors: [
      { name: 'Warm Cream Travertine', hex: '#E5DCB8', inStock: true },
      { name: 'Silver Vein Cut', hex: '#BCB6AA', inStock: true }
    ],
    sizes: ['6-Seater (200 cm)', '8-Seater (240 cm)', '10-Seater Banquet (280 cm)'],
    badges: ['Best Seller'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Clean with pH-neutral stone cleaner. Use coasters and trivets for acidic liquids and extreme heat.',
    warranty: 'Lifetime Structural Stone Integrity Guarantee',
    leadTime: 'In Stock • White Glove Installation included across India',
    collectionSlug: 'the-monolith-collection',
    collectionName: 'The Monolith Collection'
  },
  {
    id: 'prod-olsen-solid-ash-table',
    name: 'Olsen Solid Ash Oval Dining Table',
    slug: 'olsen-solid-ash-oval-dining-table',
    category: 'dining',
    categoryLabel: 'Dining',
    room: 'dining-room',
    roomLabel: 'Dining Room',
    price: 135000,
    rating: 4.8,
    reviewCount: 15,
    shortDescription: 'Curvilinear pill-shaped dining table in solid smoked ash wood with tapered splayed architect legs.',
    fullDescription: 'The Olsen Dining Table combines soft organic geometry with high durability. The bullnose bevel table edge feels silky to the touch, and the central pillar architecture gives guests completely unobstructed legroom from every seating angle.',
    materials: ['Solid European Smoked Ash Wood', 'Low-VOC Matte Polyurethane Finish'],
    dimensions: {
      width: '220 cm',
      depth: '100 cm',
      height: '75 cm',
      weight: '68 kg'
    },
    colors: [
      { name: 'Smoked Charcoal Ash', hex: '#343230', inStock: true },
      { name: 'Natural Ash', hex: '#DED3BF', inStock: true },
      { name: 'Cognac Brown', hex: '#634731', inStock: true }
    ],
    sizes: ['6-Seater (190 cm)', '8-Seater (220 cm)'],
    badges: ['New'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Wipe clean with damp cloth and dry immediately. Apply timber oil every two years.',
    warranty: '10-Year Solid Hardwood Guarantee',
    leadTime: 'In Stock • Ready to dispatch in 48 hours',
    collectionSlug: 'heritage-walnut',
    collectionName: 'Heritage Walnut'
  },
  {
    id: 'prod-pierre-leather-lounge-chair',
    name: 'Pierre Lounge Chair in Saddle Leather',
    slug: 'pierre-lounge-chair-saddle-leather',
    category: 'chairs',
    categoryLabel: 'Chairs',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 68000,
    originalPrice: 82000,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 42,
    shortDescription: 'Full-grain Italian vegetable-tanned saddle leather slung across a hand-welded matte bronze steel frame.',
    fullDescription: 'A modern heir to mid-century Scandinavian lounge classics. The Pierre Chair features thick vegetable-tanned Italian saddle leather that will develop an irreplaceable golden honey patina through decades of seating. The deliberate reclined ergonomic pitch provides deep contemplative comfort.',
    materials: ['Italian Vegetable-Tanned Saddle Leather (3.5mm)', 'Hand-Welded Matte Bronze Coated Steel', 'Heavy Nylon Webbing'],
    dimensions: {
      width: '74 cm',
      depth: '82 cm',
      height: '76 cm',
      seatHeight: '39 cm',
      weight: '16 kg'
    },
    colors: [
      { name: 'Cognac Saddle Tan', hex: '#9C5B2B', inStock: true },
      { name: 'Ebony Black', hex: '#1C1C1C', inStock: true },
      { name: 'Espresso Walnut', hex: '#3B2F2F', inStock: true }
    ],
    sizes: ['Standard Lounge'],
    badges: ['Best Seller', '20% Off'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Nourish saddle leather with natural leather conditioner once every six months to prevent dryness.',
    warranty: '10-Year Frame & Leather Stitching Warranty',
    leadTime: 'In Stock • Ships in 24-48 hours',
    collectionSlug: 'heritage-walnut',
    collectionName: 'Heritage Walnut'
  },
  {
    id: 'prod-forma-boucle-dining-chair',
    name: 'Forma Bouclé Dining Chair (Set of 2)',
    slug: 'forma-boucle-dining-chair-set',
    category: 'chairs',
    categoryLabel: 'Chairs',
    room: 'dining-room',
    roomLabel: 'Dining Room',
    price: 46000,
    originalPrice: 52000,
    discountPercentage: 11,
    rating: 4.8,
    reviewCount: 34,
    shortDescription: 'Sculptural barrel back wrapped in high-wear bouclé with solid smoked oak dowel legs.',
    fullDescription: 'Transform dinner conversations into luxurious affairs. The Forma Dining Chair hugs the spine with an unbroken curved backrest that seamlessly continues down to support the elbows, providing support for leisurely 4-hour feasts.',
    materials: ['High-Abrasion Martindale 50,000 Bouclé', 'Solid Smoked White Oak Dowel Legs', 'High-Density Molded Core'],
    dimensions: {
      width: '56 cm',
      depth: '54 cm',
      height: '78 cm',
      seatHeight: '46 cm',
      weight: '9 kg per chair'
    },
    colors: [
      { name: 'Warm Cream Bouclé', hex: '#F0ECE1', inStock: true },
      { name: 'Sand Grey', hex: '#C2BCB0', inStock: true },
      { name: 'Forest Green', hex: '#394635', inStock: true }
    ],
    sizes: ['Set of 2 Chairs', 'Set of 4 Chairs', 'Set of 6 Chairs'],
    badges: ['Best Seller'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Spot clean immediately with clean damp cloth. Protective fabric spray applied prior to delivery.',
    warranty: '5-Year Commercial Grade Structural Warranty',
    leadTime: 'In Stock • Dispatches in 48 hours',
    collectionSlug: 'warm-brutalism',
    collectionName: 'Warm Brutalism'
  },
  {
    id: 'prod-kanso-low-coffee-table',
    name: 'Kanso Low Coffee Table in Smoked Walnut',
    slug: 'kanso-low-coffee-table-smoked-walnut',
    category: 'tables',
    categoryLabel: 'Tables',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 54000,
    originalPrice: 62000,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 22,
    shortDescription: 'Japanese low-profile cocktail table crafted with waterfall solid walnut bookmatched grain edges.',
    fullDescription: 'The Kanso Table sits at an intentional 32cm height, anchoring the living area with calming horizontal proportions. The grain flows continuously across the top down the waterfall leg panels, highlighting the raw timber symmetry.',
    materials: ['Solid American Black Walnut', 'Concealed Steel Tension Rods', 'Zero-VOC Matte Hardwax Oil'],
    dimensions: {
      width: '140 cm',
      depth: '80 cm',
      height: '32 cm',
      weight: '38 kg'
    },
    colors: [
      { name: 'Smoked Walnut', hex: '#443224', inStock: true },
      { name: 'Natural White Oak', hex: '#D6C8AF', inStock: true }
    ],
    sizes: ['Medium (120 cm)', 'Grand (140 cm)'],
    badges: ['New'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Protect with coasters for warm beverages. Buff with clean beeswax every 12 months.',
    warranty: '10-Year Warranty',
    leadTime: 'In Stock • Ready for dispatch',
    collectionSlug: 'heritage-walnut',
    collectionName: 'Heritage Walnut'
  },
  {
    id: 'prod-calacatta-viola-side-table',
    name: 'Calacatta Viola Marble Monolith Table',
    slug: 'calacatta-viola-marble-monolith-table',
    category: 'tables',
    categoryLabel: 'Tables',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 72000,
    rating: 5.0,
    reviewCount: 14,
    shortDescription: 'Sculptural plinth block carved from Italian Calacatta Viola marble with dramatic burgundy and violet veining.',
    fullDescription: 'Every Calacatta Viola Monolith is an unrepeatable work of natural art. Sourced from the historic Apuan Alps quarries in Carrara, Italy, its deep wine-red breccia veins contrast vividly against crisp cream stone. Honed to a velvety matte tactile finish.',
    materials: ['Authentic Italian Calacatta Viola Marble', 'Felt Glides Base'],
    dimensions: {
      width: '40 cm',
      depth: '40 cm',
      height: '48 cm',
      weight: '45 kg'
    },
    colors: [
      { name: 'Calacatta Viola (Burgundy Vein)', hex: '#58373E', inStock: true },
      { name: 'Nero Marquina (Black)', hex: '#1E1E1E', inStock: true }
    ],
    sizes: ['Cube (40 x 40 x 48 cm)', 'Tower (35 x 35 x 65 cm)'],
    badges: ['Crafted to Order'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Sealed against common moisture. Wipe immediately if exposed to acidic oils or citrus.',
    warranty: 'Lifetime Natural Stone Guarantee',
    leadTime: 'Crafted to Order • Dispatches in 7 days',
    collectionSlug: 'the-monolith-collection',
    collectionName: 'The Monolith Collection'
  },
  {
    id: 'prod-nordic-reeded-credenza',
    name: 'Nordic Reeded Oak Credenza',
    slug: 'nordic-reeded-oak-credenza',
    category: 'storage',
    categoryLabel: 'Storage',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 118000,
    originalPrice: 135000,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 27,
    shortDescription: 'Four-door architectural media console with tactile fluted solid oak tambour doors and brass hardware.',
    fullDescription: 'The Nordic Reeded Credenza provides immense media and dining storage while preserving visual lightness. The sliding tambour doors glide silently around curved corners, and the rear contains discreet cable management channels for smart entertainment gear.',
    materials: ['Solid European White Oak', 'Brushed Solid Brass Pulls', 'Blum Soft-Close Internal Hinges'],
    dimensions: {
      width: '200 cm',
      depth: '48 cm',
      height: '68 cm',
      weight: '72 kg'
    },
    colors: [
      { name: 'Natural Light Oak', hex: '#DBCFB8', inStock: true },
      { name: 'Ebonized Black Oak', hex: '#2B2A29', inStock: true }
    ],
    sizes: ['3-Door Compact (160 cm)', '4-Door Grand (200 cm)'],
    badges: ['Best Seller'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Dust tambour slats with soft feather duster or soft brush vacuum attachment.',
    warranty: '10-Year Hardware & Timber Warranty',
    leadTime: 'In Stock • Ready to dispatch in 48 hours',
    collectionSlug: 'japandi-haven',
    collectionName: 'Japandi Haven'
  },
  {
    id: 'prod-sylvan-high-sideboard',
    name: 'Sylvan High Walnut Sideboard',
    slug: 'sylvan-high-walnut-sideboard',
    category: 'storage',
    categoryLabel: 'Storage',
    room: 'dining-room',
    roomLabel: 'Dining Room',
    price: 104000,
    rating: 4.7,
    reviewCount: 16,
    shortDescription: 'Tall minimalist bar and chinaware cabinet with bronze tinted glass shelving and integrated warm LED lighting.',
    fullDescription: 'Elevate evening entertaining. The Sylvan features concealed touch-latch doors that open to reveal warm indirect 2700K lighting, a mirrored bronze back panel, and adjustable tempered glass shelves designed for barware, spirits, and ceremonial dinnerware.',
    materials: ['American Black Walnut', 'Bronze Tinted Safety Glass', 'Warm LED 2700K Lighting', 'Solid Brass Pins'],
    dimensions: {
      width: '110 cm',
      depth: '45 cm',
      height: '145 cm',
      weight: '64 kg'
    },
    colors: [
      { name: 'Warm Walnut', hex: '#483628', inStock: true }
    ],
    sizes: ['Standard High Cabinet'],
    badges: ['New'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Clean glass with vinegar-based glass solution. Wipe timber with dry lint-free cloth.',
    warranty: '7-Year Cabinetry Guarantee',
    leadTime: 'Crafted to Order • Dispatches in 10 days',
    collectionSlug: 'heritage-walnut',
    collectionName: 'Heritage Walnut'
  },
  {
    id: 'prod-alabaster-sculptural-lamp',
    name: 'Alabaster Sculptural Table Lamp',
    slug: 'alabaster-sculptural-table-lamp',
    category: 'decor',
    categoryLabel: 'Decor',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 28000,
    originalPrice: 34000,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 52,
    shortDescription: 'Solid Spanish translucent alabaster cylinder with knurled brass dimmer switch and hand-blown diffuser globe.',
    fullDescription: 'Milled from a single block of natural translucent Spanish alabaster stone, this sculptural luminaire glows with a warm, ethereal interior luminosity. The brass rotary dial provides smooth 1% to 100% dimming to dial in tranquil mood lighting.',
    materials: ['Natural Spanish Translucent Alabaster', 'Solid Knurled Brass Base', 'Cloth-Covered Cord (2.5m)'],
    dimensions: {
      width: '24 cm',
      depth: '24 cm',
      height: '38 cm',
      weight: '7.5 kg'
    },
    colors: [
      { name: 'Translucent Cloud Alabaster', hex: '#F6F3EC', inStock: true },
      { name: 'Amber Veined Alabaster', hex: '#DFCBAC', inStock: true }
    ],
    sizes: ['Standard 38 cm'],
    badges: ['Best Seller', '20% Off'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Gently wipe alabaster surface with clean dry microfiber cloth. Disconnect power before dusting.',
    warranty: '3-Year Electrical Component Warranty',
    leadTime: 'In Stock • Dispatches in 24 hours',
    collectionSlug: 'the-monolith-collection',
    collectionName: 'The Monolith Collection'
  },
  {
    id: 'prod-wabi-ceramic-vessel',
    name: 'Wabi Hand-Thrown Ceramic Vessel Set',
    slug: 'wabi-hand-thrown-ceramic-vessel-set',
    category: 'decor',
    categoryLabel: 'Decor',
    room: 'living-room',
    roomLabel: 'Living Room',
    price: 18500,
    rating: 4.8,
    reviewCount: 39,
    shortDescription: 'Set of two sculptural stoneware vessels hand-thrown with volcanic sand glaze and organic asymmetrical rim.',
    fullDescription: 'Crafted in collaboration with master potters in Puducherry, each stoneware vessel is wheel-thrown using local terracotta blended with raw basaltic sand. The textured volcanic slip glaze forms subtle bubbles and tactile crackles during wood firing.',
    materials: ['High-Fire Basaltic Stoneware Clay', 'Natural Wood-Ash Mineral Slip Glaze'],
    dimensions: {
      width: '28 cm',
      depth: '28 cm',
      height: '36 cm',
      weight: '4.2 kg'
    },
    colors: [
      { name: 'Pumice Sand White', hex: '#EAE5DB', inStock: true },
      { name: 'Volcanic Basalt Black', hex: '#2A2928', inStock: true }
    ],
    sizes: ['Set of 2 Vessels (Tall 36cm + Low 22cm)'],
    badges: ['New'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Watertight interior. Hand wash gently with warm water.',
    warranty: 'Authentic Studio Craftsmanship Certificate',
    leadTime: 'In Stock • Ready to ship',
    collectionSlug: 'japandi-haven',
    collectionName: 'Japandi Haven'
  },
  {
    id: 'prod-solis-teak-outdoor-lounge',
    name: 'Solis Weathered Teak Outdoor Lounge',
    slug: 'solis-weathered-teak-outdoor-lounge',
    category: 'chairs',
    categoryLabel: 'Chairs',
    room: 'outdoor',
    roomLabel: 'Outdoor',
    price: 84000,
    originalPrice: 96000,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 20,
    shortDescription: 'Grade-A plantation teak lounger with quick-dry reticulated foam cushions wrapped in Sunbrella maritime fabric.',
    fullDescription: 'Engineered to withstand tropical monsoon rains and intense coastal sunshine alike. Crafted from high-oil Grade-A plantation teak, it naturally silvers over time into a distinguished platinum grey patina without rotting or warping.',
    materials: ['Grade-A Plantation Heartwood Teak', 'Sunbrella Maritime UV Performance Fabric', 'Reticulated Quick-Drain Foam'],
    dimensions: {
      width: '88 cm',
      depth: '102 cm',
      height: '70 cm',
      seatHeight: '38 cm',
      weight: '24 kg'
    },
    colors: [
      { name: 'Maritime Bone Sunbrella', hex: '#ECE7DD', inStock: true },
      { name: 'Coastal Charcoal', hex: '#373635', inStock: true }
    ],
    sizes: ['Single Lounge Armchair', 'Double Sunbed (160 cm)'],
    badges: ['Crafted to Order'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
    ],
    careInstructions: 'Can be left outdoors year-round. Hose down with water; oil seasonally if warm amber tone is preferred over silvery patina.',
    warranty: '10-Year Weather-Resistant All-Weather Warranty',
    leadTime: 'Crafted to Order • Dispatches in 7-10 days',
    collectionSlug: 'warm-brutalism',
    collectionName: 'Warm Brutalism'
  }
];
