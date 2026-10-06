/**
 * STRUCTURAL DEMO DATA — PHASE 2
 * Clearly labeled mock definitions used solely to render information architecture.
 * NOT real production/customer data.
 */

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  itemCount: number;
  icon: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  location: string;
  dailyRate: number;
  weeklyRate: number;
  securityDeposit: number;
  availability: 'available' | 'booked' | 'unavailable';
  rating: number;
  ratingCount: number;
  description: string;
  specs: Record<string, string>;
  owner: {
    name: string;
    verified: boolean;
    rating: number;
  };
}

export interface LocationItem {
  city: string;
  state: string;
  hubCount: number;
  activeRentals: number;
}

export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-power',
    slug: 'power',
    name: 'Power & Energy',
    description: 'High-capacity inverters, backup batteries, silent generators & solar kits',
    itemCount: 142,
    icon: '⚡',
  },
  {
    id: 'cat-electronics',
    slug: 'electronics',
    name: 'Electronics & IT',
    description: 'Workstations, laptops, 4K monitors, projectors & conference setups',
    itemCount: 215,
    icon: '💻',
  },
  {
    id: 'cat-cameras',
    slug: 'cameras',
    name: 'Cameras & Audio',
    description: 'Cinema cameras, prime lenses, studio lighting & wireless microphones',
    itemCount: 98,
    icon: '📷',
  },
  {
    id: 'cat-vehicles',
    slug: 'vehicles',
    name: 'Vehicles & Fleet',
    description: 'Utility pickups, cargo vans, electric two-wheelers & transport trailers',
    itemCount: 76,
    icon: '🚚',
  },
  {
    id: 'cat-tools',
    slug: 'tools',
    name: 'Tools & Hardware',
    description: 'Rotary drills, welding units, high-pressure washers & tile cutters',
    itemCount: 310,
    icon: '🔧',
  },
  {
    id: 'cat-machinery',
    slug: 'machinery',
    name: 'Heavy Machinery',
    description: 'Scissor lifts, forklifts, earth excavators & concrete mixers',
    itemCount: 45,
    icon: '🚜',
  },
  {
    id: 'cat-events',
    slug: 'events',
    name: 'Event Equipment',
    description: 'Line-array speakers, stage trusses, marquee canopies & banquet lights',
    itemCount: 180,
    icon: '🎪',
  },
  {
    id: 'cat-furniture',
    slug: 'furniture',
    name: 'Furniture & Decor',
    description: 'Ergonomic office seating, executive desks, display booths & staging sets',
    itemCount: 165,
    icon: '🛋️',
  },
];

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'p-1',
    slug: 'pure-sine-wave-inverter-5kva',
    name: '5 kVA Pure Sine Wave Inverter System',
    category: 'Power & Energy',
    categorySlug: 'power',
    location: 'South Delhi Hub, New Delhi',
    dailyRate: 1200,
    weeklyRate: 6500,
    securityDeposit: 5000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 34,
    description:
      'Heavy-duty 5kVA pure sine wave inverter paired with dual 220Ah tubular batteries. Ideal for continuous event backup, film shoots, or temporary commercial installations.',
    specs: {
      Capacity: '5000 VA / 4000 W',
      'Battery Type': '2x 220Ah Lead-Acid Tubular',
      Waveform: 'Pure Sine Wave',
      'Runtime (Full Load)': 'Up to 4.5 Hours',
    },
    owner: {
      name: 'Apex Power Solutions',
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: 'p-2',
    slug: 'sony-fx3-cinema-camera-package',
    name: 'Sony FX3 Full-Frame Cinema Camera Kit',
    category: 'Cameras & Audio',
    categorySlug: 'cameras',
    location: 'Bandra West, Mumbai',
    dailyRate: 3500,
    weeklyRate: 19000,
    securityDeposit: 15000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 52,
    description:
      'Complete production-ready kit including Sony FX3 camera body, XLR top handle, 24-70mm GM II lens, 4x batteries, and 2x 160GB CFexpress cards.',
    specs: {
      Sensor: 'Full-Frame 12.1 MP Exmor R CMOS',
      'Max Resolution': '4K UHD up to 120p',
      'Color Profile': 'S-Cinetone, S-Log3',
      'Included Lens': 'FE 24-70mm f/2.8 GM II',
    },
    owner: {
      name: 'CineGear Rentals Mumbai',
      verified: true,
      rating: 5.0,
    },
  },
  {
    id: 'p-3',
    slug: 'electric-scissor-lift-10m',
    name: '10-Meter Electric Self-Propelled Scissor Lift',
    category: 'Heavy Machinery',
    categorySlug: 'machinery',
    location: 'Peenya Industrial Area, Bengaluru',
    dailyRate: 4800,
    weeklyRate: 26000,
    securityDeposit: 20000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 19,
    description:
      'Zero-emission electric scissor lift suitable for indoor ceiling installations, warehouse maintenance, and facility repairs.',
    specs: {
      'Working Height': '10.0 Meters (32.8 ft)',
      'Platform Capacity': '230 kg (2 Operators)',
      'Power Source': '24V Electric Battery (Non-marking tires)',
      'Drive Speed': '3.5 km/h',
    },
    owner: {
      name: 'Southern Lift & Plant Hire',
      verified: true,
      rating: 4.8,
    },
  },
  {
    id: 'p-4',
    slug: 'epson-eb-pu2010b-10000-lumens-projector',
    name: 'Epson 10,000 Lumens 3LCD Laser Projector',
    category: 'Electronics & IT',
    categorySlug: 'electronics',
    location: 'HITEC City, Hyderabad',
    dailyRate: 6500,
    weeklyRate: 34000,
    securityDeposit: 25000,
    availability: 'booked',
    rating: 4.9,
    ratingCount: 27,
    description:
      'High-brightness large-venue laser projector with motorized standard-throw zoom lens for corporate events and outdoor mapping.',
    specs: {
      Brightness: '10,000 ISO Lumens',
      'Native Resolution': 'WUXGA (1920x1200) with 4K Enhancement',
      'Light Source': 'Solid-State Laser (20,000 hours)',
      Connectivity: '3G-SDI, HDBaseT, HDMI 2.0',
    },
    owner: {
      name: 'VisualEdge AV Hire',
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: 'p-5',
    slug: 'tata-ace-gold-cargo-pickup',
    name: 'Tata Ace Gold Utility Delivery Van',
    category: 'Vehicles & Fleet',
    categorySlug: 'vehicles',
    location: 'Okhla Phase III, New Delhi',
    dailyRate: 1500,
    weeklyRate: 8500,
    securityDeposit: 8000,
    availability: 'available',
    rating: 4.7,
    ratingCount: 41,
    description:
      'Reliable 750kg payload mini truck with covered cargo box for material shifting, event freight, and short-distance logistics.',
    specs: {
      'Payload Capacity': '750 kg',
      'Fuel Type': 'Diesel / BS6',
      'Cargo Bay': '7.2 ft x 4.8 ft (Covered Canopy)',
      Permit: 'State Commercial Goods Permit',
    },
    owner: {
      name: 'NCR Fleet Services',
      verified: true,
      rating: 4.7,
    },
  },
  {
    id: 'p-6',
    slug: 'honda-eu70is-silent-inverter-generator',
    name: 'Honda EU70is 7kVA Silent Inverter Generator',
    category: 'Power & Energy',
    categorySlug: 'power',
    location: 'Koramangala, Bengaluru',
    dailyRate: 2200,
    weeklyRate: 12000,
    securityDeposit: 10000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 68,
    description:
      'Ultra-silent fuel-injected portable inverter generator providing clean, computer-safe electricity for sensitive electronics.',
    specs: {
      'Max Output': '7000 VA',
      'Noise Level': '52 dB(A) at 7m',
      'Fuel Tank': '19.2 Liters (Runs up to 12 hours)',
      'Electric Start': 'Yes with Remote Key',
    },
    owner: {
      name: 'Bangalore Power Rentals',
      verified: true,
      rating: 4.9,
    },
  },
];

export const LOCATIONS: LocationItem[] = [
  { city: 'New Delhi & NCR', state: 'Delhi NCR', hubCount: 14, activeRentals: 420 },
  { city: 'Mumbai', state: 'Maharashtra', hubCount: 18, activeRentals: 580 },
  { city: 'Bengaluru', state: 'Karnataka', hubCount: 16, activeRentals: 510 },
  { city: 'Hyderabad', state: 'Telangana', hubCount: 11, activeRentals: 340 },
  { city: 'Chennai', state: 'Tamil Nadu', hubCount: 9, activeRentals: 280 },
  { city: 'Pune', state: 'Maharashtra', hubCount: 8, activeRentals: 230 },
  { city: 'Ahmedabad', state: 'Gujarat', hubCount: 7, activeRentals: 190 },
  { city: 'Kolkata', state: 'West Bengal', hubCount: 6, activeRentals: 165 },
];

export const JOB_LISTINGS: JobItem[] = [
  {
    id: 'job-1',
    title: 'Hub Operations Manager',
    department: 'Logistics & Supply Chain',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    experience: '3-5 years',
    description:
      'Lead day-to-day equipment intake, quality inspections, maintenance scheduling, and outbound dispatch operations at our central regional hub.',
  },
  {
    id: 'job-2',
    title: 'Senior Electronics / Equipment Technician',
    department: 'Technical Operations',
    location: 'New Delhi & NCR',
    type: 'Full-time',
    experience: '4+ years',
    description:
      'Diagnose, calibrate, and service rental inventory across power electronics, inverters, projection systems, and stage equipment.',
  },
  {
    id: 'job-3',
    title: 'Marketplace Partner Development Lead',
    department: 'Business Development',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    experience: '2-4 years',
    description:
      'Onboard and build long-term relationships with regional equipment owners, fleet operators, and commercial rental houses.',
  },
  {
    id: 'job-4',
    title: 'Customer Experience & Booking Specialist',
    department: 'Operations',
    location: 'Remote (India)',
    type: 'Full-time',
    experience: '1-3 years',
    description:
      'Coordinate custom multi-category rental enquiries, schedule delivery windows, and assist customers with booking logistics.',
  },
];
