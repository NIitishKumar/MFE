export interface ShowroomLocation {
  id: string;
  city: string;
  neighborhood: string;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  parking: string;
  amenities: string[];
  heroImage: string;
  gallery: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const SHOWROOMS: ShowroomLocation[] = [
  {
    id: 'showroom-bengaluru',
    city: 'Bengaluru',
    neighborhood: 'Indiranagar',
    name: 'Madhav Furnitures Flagship Sanctuary',
    address: '42, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka',
    pincode: '560038',
    phone: '+91 80 4920 8800',
    email: 'indiranagar@madhavfurnitures.in',
    hours: {
      weekdays: '10:30 AM – 8:00 PM (Tuesday – Friday)',
      weekends: '10:00 AM – 8:30 PM (Saturday – Sunday, Closed Mondays)'
    },
    parking: 'Valet parking available at private underground bay entrance.',
    amenities: [
      'Tactile Material & Stone Library (over 200 marble, timber & textile samples)',
      '1:1 Scale Living & Dining Spatial Vignettes',
      'Private Acoustic Consultation Studio for Interior Architects',
      'Complimentary Single-Origin Pour-over Coffee Bar',
      'Dedicated Kid-Friendly Sensory Play Nook'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=85'
    ],
    coordinates: {
      lat: 12.9719,
      lng: 77.6412
    }
  },
  {
    id: 'showroom-mumbai',
    city: 'Mumbai',
    neighborhood: 'Worli',
    name: 'Madhav Furnitures Seafront Gallery',
    address: 'Level 2, The Mills, Senapati Bapat Marg, Lower Parel / Worli, Mumbai, Maharashtra',
    pincode: '400013',
    phone: '+91 22 6829 4400',
    email: 'worli@madhavfurnitures.in',
    hours: {
      weekdays: '11:00 AM – 8:30 PM (Daily)',
      weekends: '10:30 AM – 9:00 PM (Saturday – Sunday)'
    },
    parking: 'Dedicated multi-level mall parking with designated Aura VIP EV charging bays.',
    amenities: [
      'Panoramic 8,000 sq ft Coastal Light Display',
      'Bespoke Upholstery Customization Loft',
      'Architect & Designer Trade Lounge',
      'Curated Architectural Bookshop by Steidl & Phaidon'
    ],
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85'
    ],
    coordinates: {
      lat: 18.9986,
      lng: 72.8258
    }
  }
];

export const FAQS = [
  {
    question: 'How do you calculate shipping across India?',
    answer: 'We provide complimentary White-Glove delivery and professional in-home assembly for all orders above ₹50,000 across tier 1 and tier 2 Indian cities. For orders below ₹50,000, a flat shipping fee of ₹2,500 applies.'
  },
  {
    question: 'What is White-Glove Delivery?',
    answer: 'White-Glove delivery means our certified technicians bring the furniture into the exact room of your choice, uncrate and assemble each piece, place it according to your guidance, and carry away all recyclable packaging materials.'
  },
  {
    question: 'Can I customize dimensions, fabric, or timber finishes?',
    answer: 'Yes. Over 70% of our collection can be customized in bespoke dimensions, custom upholstery (including client-provided COM fabrics), or custom wood stains. You can schedule a consultation online or visit our Bengaluru and Mumbai showrooms.'
  },
  {
    question: 'What warranties are offered on solid wood and stone pieces?',
    answer: 'Our solid hardwoods and natural stones carry a 10 to 15-year structural warranty against joint failures, cracking, or bowing under normal domestic conditions. Upholstery carries a 3-year warranty.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 14-day hassle-free return window for standard catalogue pieces in original condition. Custom made-to-order and bespoke items are non-returnable once production starts, but covered fully by our warranty and damage guarantee.'
  },
  {
    question: 'Can I view the furniture in person before purchasing?',
    answer: 'Absolutely. We encourage customers to experience the scale, comfort, and tactile finishes in person at our flagship sanctuaries in Indiranagar, Bengaluru and Worli, Mumbai. You can book an appointment online for a dedicated interior specialist walkthrough.'
  }
];
