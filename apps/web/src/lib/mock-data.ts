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
  descriptor?: string;
  image?: string;
  badge?: string;
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
  image?: string;
  brand?: string;
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
  salaryRange?: string;
  tags?: string[];
  postedDate?: string;
  featured?: boolean;
}


export const HERO_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-cctv',
    slug: 'cctv-surveillance',
    name: 'CCTV Cameras & Surveillance',
    descriptor: '4K IP & PTZ Systems',
    description: 'Commercial dome & bullet cameras, NVR recording units & 24/7 AI-powered night vision optics',
    itemCount: 184,
    icon: '📹',
    image: '/hero/cctv-cameras.jpg',
    badge: 'Popular',
  },
  {
    id: 'cat-networking',
    slug: 'networking-equipment',
    name: 'Networking Equipment',
    descriptor: 'PoE+ Managed Switches',
    description: 'Enterprise rackmount gigabit switches, patch panels, optical SFP+ transceivers & hardware firewalls',
    itemCount: 240,
    icon: '🌐',
    image: '/hero/networking-equipment.jpg',
    badge: 'Enterprise',
  },
  {
    id: 'cat-routers',
    slug: 'routers-switches',
    name: 'Routers & Switches',
    descriptor: 'Wi-Fi 6 & L3 Core',
    description: 'High-throughput dual-band Wi-Fi 6 routers, mesh systems & enterprise edge routing gateways',
    itemCount: 165,
    icon: '📡',
    image: '/hero/routers-switches.jpg',
    badge: 'High Speed',
  },
  {
    id: 'cat-cables',
    slug: 'cables-connectors',
    name: 'Cables & Connectors',
    descriptor: 'Cat6A, Fiber & Patch',
    description: 'Shielded Cat6/Cat7 ethernet reels, single-mode fiber patch cables & gold-plated RJ45 connectors',
    itemCount: 320,
    icon: '🔌',
    image: '/hero/cables-connectors.jpg',
    badge: 'Certified',
  },
  {
    id: 'cat-storage',
    slug: 'storage-devices',
    name: 'Storage Devices',
    descriptor: 'NVMe SSDs & NAS RAID',
    description: 'Ultra-fast PCIe Gen4 NVMe drives, multi-bay enterprise NAS systems & redundant backup arrays',
    itemCount: 110,
    icon: '💾',
    image: '/hero/storage-devices.jpg',
    badge: 'Ultra Fast',
  },
  {
    id: 'cat-accessories',
    slug: 'computer-accessories',
    name: 'Computer Accessories',
    descriptor: 'Docks, Hubs & Keyboards',
    description: 'Thunderbolt 4 USB-C multi-display docks, mechanical keyboards, precision mice & ergonomic mounts',
    itemCount: 280,
    icon: '🖥️',
    image: '/hero/computer-accessories.jpg',
    badge: 'Productivity',
  },
  {
    id: 'cat-power-supplies',
    slug: 'power-supplies',
    name: 'Power Supplies & Adapters',
    descriptor: 'Online UPS & SMPS',
    description: 'Pure sine wave rackmount UPS systems, industrial surge suppressors & regulated power units',
    itemCount: 95,
    icon: '⚡',
    image: '/hero/power-supplies.jpg',
    badge: '24/7 Power',
  },
];

export const CATEGORIES: CategoryItem[] = [
  ...HERO_CATEGORIES,
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
    id: 'p-cctv',
    slug: 'hikvision-4k-ip-surveillance-matrix',
    name: 'Hikvision 4K Ultra-HD AcuSense IP Turret & NVR System',
    category: 'CCTV Cameras & Surveillance',
    categorySlug: 'cctv-surveillance',
    location: 'Central IT Hub, New Delhi',
    dailyRate: 750,
    weeklyRate: 3800,
    securityDeposit: 6000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 48,
    image: '/hero/cctv-cameras.jpg',
    brand: 'Hikvision',
    description:
      'Commercial 4K Ultra-HD AcuSense turret camera system with smart human/vehicle motion detection, motorized varifocal lens, and infrared night vision.',
    specs: {
      Resolution: '4K Ultra-HD (3840x2160)',
      Optics: 'Motorized 2.8-12mm Varifocal Lens',
      'Night Vision': 'IR Range up to 50 Meters',
      Ingress: 'IP67 Weatherproof & IK10 Vandal-Resistant',
    },
    owner: {
      name: 'Jain Solutions Infrastructure',
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: 'p-net',
    slug: 'cisco-catalyst-48-port-poe-managed-switch',
    name: 'Cisco Catalyst 48-Port Gigabit PoE+ Managed Switch',
    category: 'Networking Equipment',
    categorySlug: 'networking-equipment',
    location: 'Bandra Kurla Complex, Mumbai',
    dailyRate: 1600,
    weeklyRate: 8500,
    securityDeposit: 12000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 62,
    image: '/hero/networking-equipment.jpg',
    brand: 'Cisco',
    description:
      'Enterprise-grade Layer 3 managed network switch with 48 gigabit PoE+ ports (740W power budget) and 4x 10G SFP+ uplink ports.',
    specs: {
      Ports: '48x Gigabit RJ45 + 4x 10G SFP+',
      'PoE Budget': '740 Watts PoE+ (802.3at)',
      Switching: '176 Gbps Non-Blocking Fabric',
      Management: 'Cisco IOS-XE / Web GUI / CLI',
    },
    owner: {
      name: 'Jain Solutions Enterprise Network',
      verified: true,
      rating: 5.0,
    },
  },
  {
    id: 'p-router',
    slug: 'tp-link-archer-ax6000-enterprise-router',
    name: 'TP-Link Archer AX6000 Wi-Fi 6 Multi-Gigabit Router',
    category: 'Routers & Switches',
    categorySlug: 'routers-switches',
    location: 'HITEC City, Hyderabad',
    dailyRate: 650,
    weeklyRate: 3400,
    securityDeposit: 5000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 39,
    image: '/hero/routers-switches.jpg',
    brand: 'TP-Link',
    description:
      'Ultra-fast Wi-Fi 6 router delivering up to 6 Gbps wireless bandwidth, 2.5 Gbps WAN port, and 8 high-gain antennas with beamforming.',
    specs: {
      Speed: 'Up to 5952 Mbps (4804 Mbps 5GHz + 1148 Mbps 2.4GHz)',
      WAN: '1x 2.5 Gbps Multi-Gigabit Port',
      LAN: '8x Gigabit Ethernet LAN Ports',
      CPU: '1.8 GHz 64-bit Quad-Core Processor',
    },
    owner: {
      name: 'Jain Solutions Tech Hub',
      verified: true,
      rating: 4.8,
    },
  },
  {
    id: 'p-storage',
    slug: 'synology-4-bay-nas-nvme-raid',
    name: 'Synology DiskStation 4-Bay NAS with 4x 8TB Enterprise RAID',
    category: 'Storage Devices',
    categorySlug: 'storage-devices',
    location: 'Indiranagar, Bengaluru',
    dailyRate: 1900,
    weeklyRate: 9800,
    securityDeposit: 15000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 31,
    image: '/hero/storage-devices.jpg',
    brand: 'Synology',
    description:
      'High-performance 4-bay rackmount network attached storage populated with enterprise Seagate IronWolf drives and dual M.2 NVMe SSD caching.',
    specs: {
      Capacity: '32TB Raw (RAID 5 / 6 Configurable)',
      Cache: '2x 1TB Samsung 990 PRO NVMe SSD',
      Network: 'Dual 1GbE with Link Aggregation',
      Memory: '16GB DDR4 ECC RAM',
    },
    owner: {
      name: 'Jain Solutions Storage Depot',
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: 'p-cables',
    slug: 'commscope-cat6a-shielded-305m-cable-bundle',
    name: 'CommScope Cat6A Shielded LSZH Reel (305m) & Tool Kit',
    category: 'Cables & Connectors',
    categorySlug: 'cables-connectors',
    location: 'Okhla Phase III, New Delhi',
    dailyRate: 400,
    weeklyRate: 2100,
    securityDeposit: 3000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 54,
    image: '/hero/cables-connectors.jpg',
    brand: 'D-Link',
    description:
      'Pure copper shielded Cat6A cable reel tested to 500MHz. Includes 50x shielded toolless RJ45 connectors, crimper, and cable verifier.',
    specs: {
      Length: '305 Meters (1000 ft) Pull Box',
      Conductor: '23 AWG Solid Bare Copper',
      Jacket: 'Low Smoke Zero Halogen (LSZH)',
      Standard: 'ANSI/TIA-568.2-D Cat6A Compliant',
    },
    owner: {
      name: 'Jain Solutions Cabling Services',
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: 'p-power',
    slug: 'apc-smart-ups-3000va-rackmount',
    name: 'APC Smart-UPS 3000VA LCD Pure Sine Wave 230V',
    category: 'Power Supplies & Adapters',
    categorySlug: 'power-supplies',
    location: 'Salt Lake Sector V, Kolkata',
    dailyRate: 1400,
    weeklyRate: 7200,
    securityDeposit: 10000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 42,
    image: '/hero/power-supplies.jpg',
    brand: 'Schneider Electric',
    description:
      'Rackmount 3000VA / 2700W online uninterruptible power supply providing clean sine wave backup power for mission-critical IT infrastructure.',
    specs: {
      Output: '3000 VA / 2700 Watts Pure Sine Wave',
      Topology: 'Line-Interactive / Double Conversion',
      Outlets: '8x IEC 320 C13, 1x IEC 320 C19',
      Runtime: 'Approx. 28 min at half load (1350W)',
    },
    owner: {
      name: 'Apex Power Solutions',
      verified: true,
      rating: 5.0,
    },
  },
  {
    id: 'p-acc',
    slug: 'dell-thunderbolt-4-quad-dock-bundle',
    name: 'Dell Thunderbolt 4 Dock & Ergonomic Peripheral Suite',
    category: 'Computer Accessories',
    categorySlug: 'computer-accessories',
    location: 'Shivajinagar, Pune',
    dailyRate: 450,
    weeklyRate: 2400,
    securityDeposit: 4000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 26,
    image: '/hero/computer-accessories.jpg',
    brand: 'Dell Technologies',
    description:
      'Enterprise workstation setup: Thunderbolt 4 dock delivering 130W Power Delivery with dual 4K/60Hz display support, low-profile keyboard and wireless precision mouse.',
    specs: {
      Dock: 'Thunderbolt 4 / 3x USB-A 3.2 / 2x DP 1.4 / 1x HDMI 2.0',
      Power: 'Up to 130W Power Delivery to Laptop',
      Peripherals: 'Aluminum Slim Keyboard & Dual-Mode Laser Mouse',
      Compatibility: 'Windows, macOS, Linux, Ubuntu',
    },
    owner: {
      name: 'Jain Solutions IT Depot',
      verified: true,
      rating: 4.8,
    },
  },
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
    salaryRange: '₹14L - ₹18L CTC',
    tags: ['Hub Logistics', 'Team Lead', 'Fleet QA'],
    postedDate: '2 days ago',
    featured: true,
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
    salaryRange: '₹10L - ₹15L CTC',
    tags: ['Hardware QA', 'Power Systems', 'Calibration'],
    postedDate: '3 days ago',
    featured: true,
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
    salaryRange: '₹12L - ₹16L CTC + Incentives',
    tags: ['B2B Sales', 'Partner Acquisition', 'Fleet Expansion'],
    postedDate: '5 days ago',
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
    salaryRange: '₹6L - ₹9L CTC',
    tags: ['Customer Success', 'Escalations', 'Order Logistics'],
    postedDate: 'Just now',
    description:
      'Coordinate custom multi-category rental enquiries, schedule delivery windows, and assist customers with booking logistics.',
  },
  {
    id: 'job-5',
    title: 'Full Stack Platform Engineer',
    department: 'Engineering & Tech',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experience: '2-5 years',
    salaryRange: '₹18L - ₹26L CTC + ESOPs',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL'],
    postedDate: '1 day ago',
    featured: true,
    description:
      'Build core multi-category rental architecture, real-time inventory reservation engines, and automated billing pipelines.',
  },
  {
    id: 'job-6',
    title: 'Regional Fleet & Field Logistics Associate',
    department: 'Logistics & Supply Chain',
    location: 'Pune, Maharashtra',
    type: 'Full-time',
    experience: '1-3 years',
    salaryRange: '₹5L - ₹8L CTC',
    tags: ['Field Dispatch', 'Hub Ops', 'Driver Coordination'],
    postedDate: '4 days ago',
    description:
      'Supervise on-ground fleet dispatches, rapid return inspections, and last-mile pickup execution across enterprise client sites.',
  },
];
