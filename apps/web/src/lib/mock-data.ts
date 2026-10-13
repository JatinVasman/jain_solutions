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
  location?: string;
  dailyRate: number;
  weeklyRate: number;
  securityDeposit: number;
  availability: 'available' | 'booked' | 'unavailable';
  rating: number;
  ratingCount: number;
  description: string;
  specs: Record<string, string>;
  image?: string;
  galleryImages?: string[];
  badge?: string;
  highlights?: string[];
  brand?: string;
  originalDailyRate?: number;
  discountBadge?: string;
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
    dailyRate: 750,
    weeklyRate: 3800,
    securityDeposit: 6000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 48,
    image: '/products/cctv-system-kit.jpg',
    galleryImages: [
      '/products/cctv-system-kit.jpg',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    ],
    brand: 'Hikvision',
    badge: 'Popular Choice',
    originalDailyRate: 890,
    description:
      'Commercial 4K Ultra-HD AcuSense turret camera system with smart human/vehicle motion detection, motorized varifocal lens, and infrared night vision.',
    highlights: [
      'AcuSense AI with real-time target classification',
      'Motorized 2.8-12mm varifocal zoom lens',
      'Full IP67 weatherproof and IK10 vandal resistance',
      'H.265+ ultra-bandwidth reduction codec',
    ],
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
    dailyRate: 1600,
    weeklyRate: 8500,
    securityDeposit: 12000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 62,
    image: '/products/gigabit-network-switch.jpg',
    galleryImages: [
      '/products/gigabit-network-switch.jpg',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    ],
    brand: 'Cisco',
    badge: 'Enterprise Core',
    originalDailyRate: 1850,
    description:
      'Enterprise-grade Layer 3 managed network switch with 48 gigabit PoE+ ports (740W power budget) and 4x 10G SFP+ uplink ports.',
    highlights: [
      '740W PoE+ budget for dense IP device deployment',
      '4x 10G SFP+ high-capacity fiber uplinks',
      'Full Layer 3 dynamic routing & VLAN management',
      'Redundant power supply architecture',
    ],
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
    dailyRate: 650,
    weeklyRate: 3400,
    securityDeposit: 5000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 39,
    image: '/products/enterprise-wifi-router.jpg',
    galleryImages: [
      '/products/enterprise-wifi-router.jpg',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    ],
    brand: 'TP-Link',
    badge: 'Ultra Fast',
    description:
      'Ultra-fast Wi-Fi 6 router delivering up to 6 Gbps wireless bandwidth, 2.5 Gbps WAN port, and 8 high-gain antennas with beamforming.',
    highlights: [
      'Wi-Fi 6 speeds up to 5952 Mbps aggregate throughput',
      '2.5G multi-gig WAN port for high-speed fiber lines',
      '8 external high-gain antennas with beamforming',
      'Powerful 1.8 GHz quad-core 64-bit CPU',
    ],
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
    dailyRate: 1900,
    weeklyRate: 9800,
    securityDeposit: 15000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 31,
    image: '/products/nas-storage.jpg',
    galleryImages: [
      '/products/nas-storage.jpg',
      'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
    ],
    brand: 'Synology',
    badge: 'High Security',
    description:
      'High-performance 4-bay rackmount network attached storage populated with enterprise Seagate IronWolf drives and dual M.2 NVMe SSD caching.',
    highlights: [
      '32TB enterprise storage configured in hardware RAID',
      'Dual M.2 NVMe caching for zero-latency file transfers',
      'Automated scheduled encrypted snapshots',
      'Compatible with Windows, Mac, and Linux environments',
    ],
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
    dailyRate: 400,
    weeklyRate: 2100,
    securityDeposit: 3000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 54,
    image: '/products/cat6a-ethernet-cable.jpg',
    galleryImages: [
      '/products/cat6a-ethernet-cable.jpg',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
    ],
    brand: 'CommScope',
    badge: 'Certified Copper',
    description:
      'Pure copper shielded Cat6A cable reel tested to 500MHz. Includes 50x shielded toolless RJ45 connectors, crimper, and cable verifier.',
    highlights: [
      'Certified 10-Gigabit ethernet transmission up to 100m',
      'Heavy-duty LSZH jacket with individual foil shielding',
      'Complete field termination toolkit included',
      'Passed Fluke DSX-8000 frequency certification',
    ],
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
    dailyRate: 1400,
    weeklyRate: 7200,
    securityDeposit: 10000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 42,
    image: '/products/ups-system.jpg',
    galleryImages: [
      '/products/ups-system.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=800&q=80',
    ],
    brand: 'Schneider Electric',
    badge: 'Mission Critical',
    description:
      'Rackmount 3000VA / 2700W online uninterruptible power supply providing clean sine wave backup power for mission-critical IT infrastructure.',
    highlights: [
      '2700W clean pure sine wave battery output',
      'Smart LCD diagnostic screen with runtime calculations',
      'Switched outlet groups for non-critical load shedding',
      'Network management card for remote SNMP monitoring',
    ],
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
    dailyRate: 450,
    weeklyRate: 2400,
    securityDeposit: 4000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 26,
    image: '/products/computer-accessories.jpg',
    galleryImages: [
      '/products/computer-accessories.jpg',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
    ],
    brand: 'Dell Technologies',
    badge: 'Productivity Pro',
    description:
      'Enterprise workstation setup: Thunderbolt 4 dock delivering 130W Power Delivery with dual 4K/60Hz display support, low-profile keyboard and wireless precision mouse.',
    highlights: [
      'Single cable connection for power, display, and peripherals',
      'Supports dual 4K UHD or single 8K 60Hz displays',
      '130W rapid power delivery for demanding workstations',
      'Includes premium aluminum wireless input suite',
    ],
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
    category: 'Power Supplies & Adapters',
    categorySlug: 'power-supplies',
    dailyRate: 1200,
    weeklyRate: 6500,
    securityDeposit: 5000,
    availability: 'available',
    rating: 4.9,
    ratingCount: 34,
    image: '/hero/power-supplies.jpg',
    galleryImages: [
      '/hero/power-supplies.jpg',
      '/products/ups-system.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
    ],
    brand: 'Microtek',
    badge: 'Heavy Duty',
    description:
      'Heavy-duty 5kVA pure sine wave inverter paired with dual 220Ah tubular batteries. Ideal for continuous IT server room backup, film shoots, or temporary commercial installations.',
    highlights: [
      'Robust 5000VA capacity handles heavy inductive equipment',
      'Dual deep-cycle 220Ah tubular batteries included',
      'Smart microcontroller charging prolongs battery life',
      'Zero-buzz pure sine wave protection for sensitive IT gear',
    ],
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
    slug: 'hikvision-4k-ptz-dome-camera-system',
    name: 'Hikvision 4K Ultra-HD PTZ Dome Surveillance Camera',
    category: 'CCTV Cameras & Surveillance',
    categorySlug: 'cctv-surveillance',
    dailyRate: 1200,
    weeklyRate: 6200,
    securityDeposit: 9000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 52,
    image: '/products/cctv-dome-camera.jpg',
    galleryImages: [
      '/products/cctv-dome-camera.jpg',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    ],
    brand: 'Hikvision',
    badge: '360° Pan-Tilt',
    description:
      'Commercial 4K vandal-proof motorized PTZ dome camera with smart 360-degree pan, 4x optical zoom, and ultra-low-light DarkFighter technology.',
    highlights: [
      '360-degree continuous pan rotation with auto-tracking',
      'DarkFighter sensor delivers color images in low light',
      'Vandal-resistant IK10 clear dome with heating element',
      'Integrated PoE+ simplified single-wire cabling',
    ],
    specs: {
      Sensor: '1/2.8" Progressive Scan CMOS',
      'Max Resolution': '4K UHD (3840x2160) at 30fps',
      'Optical Zoom': '4x Optical Zoom (2.8-12mm)',
      Ingress: 'IP66 Weatherproof & IK10 Vandal-Proof',
    },
    owner: {
      name: 'Jain Solutions Surveillance',
      verified: true,
      rating: 5.0,
    },
  },
  {
    id: 'p-3',
    slug: 'dahua-4k-nightcolor-bullet-camera',
    name: 'Dahua 4K NightColor Outdoor Bullet Security Camera',
    category: 'CCTV Cameras & Surveillance',
    categorySlug: 'cctv-surveillance',
    dailyRate: 950,
    weeklyRate: 4800,
    securityDeposit: 7000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 39,
    image: '/products/cctv-bullet-camera.jpg',
    galleryImages: [
      '/products/cctv-bullet-camera.jpg',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    ],
    brand: 'Dahua',
    badge: 'Full Color Night',
    description:
      'Long-range 4K outdoor bullet camera featuring full-color night vision up to 60m, active deterrence siren, and perimeter protection AI analytics.',
    highlights: [
      'Full-color vivid video capture 24 hours a day',
      'Built-in siren and red/blue strobe light for deterrence',
      'Two-way audio intercom functionality',
      'Rugged aerospace aluminum casing',
    ],
    specs: {
      Resolution: '4K Ultra-HD (8 Megapixel)',
      'Night Vision': 'Full-Color Night Vision 60m',
      Audio: 'Built-in Two-Way Mic & Speaker',
      Protection: 'IP67 Weather-Sealed Aluminum Body',
    },
    owner: {
      name: 'Jain Solutions Infrastructure',
      verified: true,
      rating: 4.8,
    },
  },
  {
    id: 'p-4',
    slug: 'enterprise-tri-band-mesh-gateway-router',
    name: 'Enterprise Tri-Band Wi-Fi 6 Mesh Router & Gateway Unit',
    category: 'Routers & Switches',
    categorySlug: 'routers-switches',
    dailyRate: 850,
    weeklyRate: 4400,
    securityDeposit: 6000,
    availability: 'booked',
    rating: 4.9,
    ratingCount: 27,
    image: '/hero/routers-switches.jpg',
    galleryImages: [
      '/hero/routers-switches.jpg',
      '/products/enterprise-wifi-router.jpg',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
    ],
    brand: 'Ubiquiti',
    badge: 'Mesh Ready',
    description:
      'Enterprise-grade multi-WAN Wi-Fi 6 router designed for multi-floor corporate offices and campuses with gigabit throughput and zero handoff.',
    highlights: [
      'Supports 500+ active client devices without throttling',
      'Dedicated third wireless backhaul band',
      'Dual WAN automatic failover for unbroken uptime',
      'Intuitive centralized cloud management',
    ],
    specs: {
      Throughput: 'Up to 5.4 Gbps Aggregate',
      Ports: '2x 2.5G WAN/LAN + 4x Gigabit LAN',
      Capacity: '500+ Concurrent Devices',
      Management: 'Cloud Controller / iOS & Android App',
    },
    owner: {
      name: 'Jain Solutions Tech Hub',
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: 'p-5',
    slug: 'armored-optical-fiber-patch-trunk-bundle',
    name: 'Armored Single-Mode Fiber Optic Trunk Reel (500m)',
    category: 'Cables & Connectors',
    categorySlug: 'cables-connectors',
    dailyRate: 700,
    weeklyRate: 3600,
    securityDeposit: 5000,
    availability: 'available',
    rating: 4.8,
    ratingCount: 41,
    image: '/hero/cables-connectors.jpg',
    galleryImages: [
      '/hero/cables-connectors.jpg',
      '/products/cat6a-ethernet-cable.jpg',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80',
    ],
    brand: 'CommScope',
    badge: 'Armored Fiber',
    description:
      'Tactical military-grade armored single-mode 12-core fiber optic cable reel pre-terminated with LC duplex connectors for high-bandwidth trunk links.',
    highlights: [
      'Stainless steel spiral crush-proof inner armor',
      'Pre-terminated with factory-polished LC Duplex connections',
      'Lightweight deployable hand reel with braking mechanism',
      'Ultra-low attenuation under 0.36 dB/km',
    ],
    specs: {
      Length: '500 Meters Tactical Deployable Reel',
      Core: '12-Core OS2 Single-Mode 9/125um',
      Armor: 'Stainless Steel Spiral Armor & PU Jacket',
      Attenuation: '<0.36 dB/km at 1310nm',
    },
    owner: {
      name: 'Jain Solutions Cabling Services',
      verified: true,
      rating: 4.8,
    },
  },
  {
    id: 'p-6',
    slug: 'enterprise-8-bay-rackmount-cloud-nas-array',
    name: 'Enterprise 8-Bay Rackmount Cloud NAS Storage Array',
    category: 'Storage Devices',
    categorySlug: 'storage-devices',
    dailyRate: 2400,
    weeklyRate: 12500,
    securityDeposit: 18000,
    availability: 'available',
    rating: 5.0,
    ratingCount: 68,
    image: '/hero/storage-devices.jpg',
    galleryImages: [
      '/hero/storage-devices.jpg',
      '/products/nas-storage.jpg',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?w=800&q=80',
    ],
    brand: 'QNAP',
    badge: '10G Ready',
    description:
      'High-availability 2U rackmount 8-bay NAS with dual 10GbE SFP+ ports, hardware encryption engine, and enterprise hot-swappable enterprise SATA/SAS bays.',
    highlights: [
      'Massive 64TB raw capacity for multi-user shared storage',
      'Dual 10-Gigabit SFP+ ports deliver up to 2000 MB/s read speeds',
      'Dual redundant 300W hot-plug power supplies',
      'Comprehensive backup integration with AWS, Azure & Google Cloud',
    ],
    specs: {
      Capacity: '64TB Raw (8x 8TB Enterprise HDD)',
      Network: 'Dual 10GbE SFP+ & Dual 2.5GbE RJ45',
      RAM: '32GB DDR4 ECC Memory (Upgradable to 64GB)',
      Redundancy: 'Redundant 300W Dual Power Supplies',
    },
    owner: {
      name: 'Jain Solutions Storage Depot',
      verified: true,
      rating: 5.0,
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
