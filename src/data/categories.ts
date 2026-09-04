import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-sofas',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Sculptural silhouettes, down-feather cushioning, and premium Belgian linen or bouclé upholstery.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85',
    itemCount: 4,
    room: 'living-room'
  },
  {
    id: 'cat-beds',
    name: 'Beds',
    slug: 'beds',
    description: 'Architectural platform beds crafted in solid American oak, walnut, and tactile upholstered headboards.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85',
    itemCount: 3,
    room: 'bedroom'
  },
  {
    id: 'cat-dining',
    name: 'Dining',
    slug: 'dining',
    description: 'Statement dining tables carved from solid oak, smoked ash, and Italian travertine stone.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=85',
    itemCount: 3,
    room: 'dining-room'
  },
  {
    id: 'cat-chairs',
    name: 'Chairs',
    slug: 'chairs',
    description: 'Occasional lounge chairs and ergonomic dining seats balancing organic curves with artisan joinery.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85',
    itemCount: 4,
    room: 'living-room'
  },
  {
    id: 'cat-tables',
    name: 'Tables',
    slug: 'tables',
    description: 'Minimalist low coffee tables, nested consoles, and side monoliths in raw natural marble.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=85',
    itemCount: 3,
    room: 'living-room'
  },
  {
    id: 'cat-storage',
    name: 'Storage',
    slug: 'storage',
    description: 'Reeded oak credenzas, floating media consoles, and seamless tambour-door sideboards.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85',
    itemCount: 3,
    room: 'living-room'
  },
  {
    id: 'cat-decor',
    name: 'Decor',
    slug: 'decor',
    description: 'Sculptural alabaster lighting, textured wool rugs, and hand-cast bronze vessels.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85',
    itemCount: 3,
    room: 'living-room'
  }
];

export const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Curated sanctuaries of comfort, tactile warmth, and conversational proportions.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Restful minimalist spaces anchored by low-profile timber beds and tactile linens.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    slug: 'dining-room',
    description: 'Generous gathering tables sculpted in monolith stone and enduring solid hardwoods.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'home-office',
    name: 'Home Office',
    slug: 'home-office',
    description: 'Intentional workspaces engineered for serene focus and refined tactile pleasure.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    slug: 'outdoor',
    description: 'Weathered teak and quick-dry rope seating designed for effortless alfresco lounging.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
  }
];
