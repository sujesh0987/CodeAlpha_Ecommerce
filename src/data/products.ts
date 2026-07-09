import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'walkin-pyro-runner',
    name: 'Walkin Pyro Runner',
    tagline: 'Ignite your stride with high-performance cushioning',
    price: 4999,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508180589062-f1e13d5f0235?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#FF6B00', '#1A1A1A', '#FFFFFF'],
    colorNames: ['Blaze Orange', 'Stealth Black', 'Hyper White'],
    description: 'Engineered for those who thrive on speed. The Walkin Pyro Runner features responsive foam technology that returns energy with every step. Its breathable mesh upper keeps your feet cool, while the signature orange branding adds a high-octane flare to your running routine.',
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    isFeatured: true,
    isNewArrival: true,
    reviews: [
      { id: 'rev-1', userName: 'Aarav Mehta', rating: 5, comment: 'Absolutely incredible comfort. The Blaze Orange is bright and looks premium. Best running shoes I have owned!', date: '2026-06-15' },
      { id: 'rev-2', userName: 'Ananya Sharma', rating: 4, comment: 'Very lightweight and perfect for morning jogs. Fits perfectly in UK Size 7.', date: '2026-06-20' },
      { id: 'rev-3', userName: 'Rohan Gupta', rating: 5, comment: 'Worth every rupee. The cushioning feels cloud-like.', date: '2026-07-02' }
    ]
  },
  {
    id: 'walkin-court-apex',
    name: 'Walkin Zenith Court',
    tagline: 'Retro court design meets modern street culture',
    price: 5999,
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#FFFFFF', '#1A1A1A', '#FF6B00'],
    colorNames: ['Hyper White', 'Stealth Black', 'Blaze Orange'],
    description: 'Inspired by the courts of the 90s, the Walkin Zenith Court delivers maximum stability and a commanding street presence. Crafted with durable leather overlays, premium micro-perforations, and high-contrast orange stitched decals, this high-top keeps you locked in on and off the hardcourt.',
    rating: 4.9,
    reviewsCount: 98,
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      { id: 'rev-4', userName: 'Kabir Dev', rating: 5, comment: 'The premium leather feel is unmatched. An absolute head-turner on the court.', date: '2026-05-18' },
      { id: 'rev-5', userName: 'Meera Nair', rating: 5, comment: 'Awesome fit and beautiful high-top ankle support. Walkin has killed it with this design.', date: '2026-06-02' }
    ]
  },
  {
    id: 'walkin-shadow-street',
    name: 'Walkin Shadow Street',
    tagline: 'Low-profile design for effortless daily styling',
    price: 3499,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#1A1A1A', '#FFFFFF', '#FF6B00'],
    colorNames: ['Stealth Black', 'Hyper White', 'Blaze Orange'],
    description: 'Understated yet unforgettable. Walkin Shadow Street is our answer to minimalist luxury. With a premium brushed suede panels and contrasting orange insoles, it is built to slide under tracksuits, denim, or tailor-made pants effortlessly.',
    rating: 4.6,
    reviewsCount: 215,
    stock: 40,
    isBestSeller: true,
    reviews: [
      { id: 'rev-6', userName: 'Siddharth Roy', rating: 5, comment: 'Perfect daily sneaker. Affordable and incredibly durable.', date: '2026-06-25' },
      { id: 'rev-7', userName: 'Pooja Iyer', rating: 4, comment: 'Sleek looking, though the suede requires a bit of care. Highly recommended!', date: '2026-07-01' }
    ]
  },
  {
    id: 'walkin-aero-trainer',
    name: 'Walkin Aero Trainer',
    tagline: 'Ultralight workout companion with adaptive support',
    price: 3999,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508180589062-f1e13d5f0235?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [7, 8, 9, 10, 11],
    colors: ['#FFFFFF', '#FF6B00', '#1A1A1A'],
    colorNames: ['Hyper White', 'Blaze Orange', 'Stealth Black'],
    description: 'Engineered for gym floors and high-intensity sessions. The Walkin Aero Trainer utilizes a specialized heel cup for stability during heavy lifts, coupled with a flexible, lightweight knit upper that breathes under tension.',
    rating: 4.5,
    reviewsCount: 88,
    stock: 12,
    isNewArrival: true,
    reviews: [
      { id: 'rev-8', userName: 'Vikram Singh', rating: 4, comment: 'Very stable flat sole. Perfect for deadlifts and squats, plus looks super dope.', date: '2026-06-11' }
    ]
  },
  {
    id: 'walkin-volt-basketball',
    name: 'Walkin Volt Court Pro',
    tagline: 'High-octane performance on and off the court',
    price: 6999,
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#FF6B00', '#FFFFFF', '#1A1A1A'],
    colorNames: ['Blaze Orange', 'Hyper White', 'Stealth Black'],
    description: 'Designed for elite ballers. Featuring a high-grip rubber compound and robust strap system, the Volt Court Pro ensures seamless direction changes. Stamped with Walkin 3D rubber details in orange, they command court authority.',
    rating: 4.7,
    reviewsCount: 74,
    stock: 15,
    isFeatured: true,
    reviews: [
      { id: 'rev-9', userName: 'Dhruv Jha', rating: 5, comment: 'Incredible grip. The traction is top notch, best court shoes on the market for this price range.', date: '2026-07-04' }
    ]
  },
  {
    id: 'walkin-carbon-stealth',
    name: 'Walkin Carbon Stealth',
    tagline: 'Premium lightweight Carbon plate speed shoe',
    price: 7999,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1508180589062-f1e13d5f0235?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1508180589062-f1e13d5f0235?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#1A1A1A', '#FF6B00'],
    colorNames: ['Stealth Black', 'Blaze Orange'],
    description: 'The pinnacle of marathon engineering. Built with an internal full-length carbon fiber plate and dual-density nitro-foam. This carbon marvel delivers extreme propulsive spring while keeping the weight close to zero.',
    rating: 5.0,
    reviewsCount: 56,
    stock: 8,
    isNewArrival: true,
    reviews: [
      { id: 'rev-10', userName: 'Pranav Nair', rating: 5, comment: 'Shaved 2 minutes off my 5k personal best. This carbon plate is pure magic!', date: '2026-07-05' }
    ]
  },
  {
    id: 'walkin-classic-retro',
    name: 'Walkin Classic Canvas',
    tagline: 'Veneer-soft canvas with rugged rubber soles',
    price: 2499,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#1A1A1A', '#FFFFFF', '#FF6B00'],
    colorNames: ['Stealth Black', 'Hyper White', 'Blaze Orange'],
    description: 'An timeless vintage silhouette designed for simplicity. Reinforced canvas upper, vulcanized custom orange rubber trim, and classic lace locks. This is the shoe that matches anything in your closet, constructed for everyday resilience.',
    rating: 4.4,
    reviewsCount: 320,
    stock: 50,
    reviews: [
      { id: 'rev-11', userName: 'Kunal Sen', rating: 4, comment: 'Super casual, fits like a glove. Really love the subtle orange stitching details.', date: '2026-06-29' }
    ]
  },
  {
    id: 'walkin-apex-trainer',
    name: 'Walkin Apex Crosstrainer',
    tagline: 'High-density stability for heavyweight lifting',
    price: 4599,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#1A1A1A', '#FF6B00', '#FFFFFF'],
    colorNames: ['Stealth Black', 'Blaze Orange', 'Hyper White'],
    description: 'Master any cross-training or lifting challenge. Walkin Apex offers full TPU heel wraps and flat slip-resistant outsoles. Built with tear-resistant ballistic mesh, it holds up against rope climbs and rigorous training.',
    rating: 4.6,
    reviewsCount: 65,
    stock: 14,
    isBestSeller: true,
    reviews: [
      { id: 'rev-12', userName: 'Riya Patel', rating: 5, comment: 'Super robust! Love doing kettlebell work and circuits in these. Extremely stable.', date: '2026-06-18' }
    ]
  }
];

export const COUPONS = [
  { code: 'WALKIN20', discountType: 'percentage', value: 20, minPurchase: 3000 },
  { code: 'STEPUP15', discountType: 'percentage', value: 15, minPurchase: 2000 },
  { code: 'FIRSTWALK', discountType: 'fixed', value: 500, minPurchase: 2500 }
];
