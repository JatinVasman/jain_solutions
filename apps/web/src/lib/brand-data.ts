/**
 * Jain Solutions — Structured Brand & Manufacturer Configuration
 * Defines brands associated with equipment categories, official company links,
 * and normalization helpers for multi-brand category filtering.
 */

export interface BrandItem {
  id: string; // Normalized unique brand identifier (e.g. 'hikvision', 'cp-plus')
  name: string; // Formatted brand display name
  websiteUrl: string; // Official manufacturer website
  description?: string; // Brief manufacturer overview
}

export const ALL_BRANDS: BrandItem[] = [
  // ── CCTV Cameras & Surveillance ───────────────────────────────────────
  {
    id: 'hikvision',
    name: 'Hikvision',
    websiteUrl: 'https://www.hikvision.com/',
    description: 'World-leading IoT solutions provider with video as its core competency.',
  },
  {
    id: 'cp-plus',
    name: 'CP PLUS',
    websiteUrl: 'https://www.cpplusworld.com/',
    description: 'Leading surveillance and security systems brand across India and globally.',
  },
  {
    id: 'dahua',
    name: 'Dahua',
    websiteUrl: 'https://www.dahuasecurity.com/',
    description: 'World-leading video-centric smart IoT solution and service provider.',
  },
  {
    id: 'prama',
    name: 'Prama',
    websiteUrl: 'https://www.pramaindia.in/',
    description: 'Pioneering indigenous security brand offering Made in India surveillance tech.',
  },
  {
    id: 'axis-communications',
    name: 'Axis Communications',
    websiteUrl: 'https://www.axis.com/',
    description: 'Network camera pioneer enabling a smarter and safer world with network solutions.',
  },
  {
    id: 'bosch',
    name: 'Bosch',
    websiteUrl: 'https://www.boschsecurity.com/',
    description: 'Global supplier of innovative security, safety, and communications systems.',
  },
  {
    id: 'hanwha-vision',
    name: 'Hanwha Vision',
    websiteUrl: 'https://www.hanwhavision.com/',
    description: 'Global vision solution provider with advanced optical design and image processing.',
  },

  // ── Networking Equipment ──────────────────────────────────────────────
  {
    id: 'cisco',
    name: 'Cisco',
    websiteUrl: 'https://www.cisco.com/',
    description: 'Worldwide leader in networking, enterprise switches, routers, and cybersecurity.',
  },
  {
    id: 'tp-link',
    name: 'TP-Link',
    websiteUrl: 'https://www.tp-link.com/',
    description: 'Global provider of reliable networking devices, Omada SDN, and Wi-Fi gear.',
  },
  {
    id: 'd-link',
    name: 'D-Link',
    websiteUrl: 'https://www.dlink.com/',
    description: 'Global leader in designing and manufacturing networking and connectivity solutions.',
  },
  {
    id: 'netgear',
    name: 'NETGEAR',
    websiteUrl: 'https://www.netgear.com/',
    description: 'Turn ideas into innovative networking products that connect people and power businesses.',
  },
  {
    id: 'ubiquiti',
    name: 'Ubiquiti',
    websiteUrl: 'https://ui.com/',
    description: 'Simplifying IT with UniFi enterprise software, high-density Wi-Fi, and routing switches.',
  },
  {
    id: 'mikrotik',
    name: 'MikroTik',
    websiteUrl: 'https://mikrotik.com/',
    description: 'Latvian manufacturer of RouterBOARD hardware and RouterOS routing systems.',
  },
  {
    id: 'hpe-aruba',
    name: 'HPE Aruba Networking',
    websiteUrl: 'https://www.arubanetworks.com/',
    description: 'Secure, intelligent edge-to-cloud networking solutions for enterprise scale.',
  },
  {
    id: 'ruijie-networks',
    name: 'Ruijie Networks',
    websiteUrl: 'https://www.ruijienetworks.com/',
    description: 'Leading ICT infrastructure and industry cloud solution provider.',
  },

  // ── Storage Devices & NAS ─────────────────────────────────────────────
  {
    id: 'synology',
    name: 'Synology',
    websiteUrl: 'https://www.synology.com/',
    description: 'Dedicated to centralized data management, cloud NAS, and robust backup ecosystems.',
  },
  {
    id: 'qnap',
    name: 'QNAP',
    websiteUrl: 'https://www.qnap.com/',
    description: 'Comprehensive network attached storage and video surveillance solutions.',
  },
  {
    id: 'western-digital',
    name: 'Western Digital',
    websiteUrl: 'https://www.westerndigital.com/',
    description: 'Pioneering storage technologies, WD Red NAS drives, and high-capacity flash arrays.',
  },
  {
    id: 'seagate',
    name: 'Seagate',
    websiteUrl: 'https://www.seagate.com/',
    description: 'Global leader in mass data storage infrastructure and IronWolf enterprise NAS HDDs.',
  },
  {
    id: 'dell',
    name: 'Dell',
    websiteUrl: 'https://www.dell.com/',
    description: 'Enterprise server hardware, PowerVault storage arrays, and precision workstations.',
  },
  {
    id: 'hpe',
    name: 'HPE',
    websiteUrl: 'https://www.hpe.com/',
    description: 'Edge-to-cloud platform company powering enterprise servers and high-resilience storage.',
  },

  // ── Cables & Connectors ───────────────────────────────────────────────
  {
    id: 'commscope',
    name: 'CommScope',
    websiteUrl: 'https://www.commscope.com/',
    description: 'Global network infrastructure provider with Systimax and Uniprise structured cabling.',
  },
  {
    id: 'belden',
    name: 'Belden',
    websiteUrl: 'https://www.belden.com/',
    description: 'Signal transmission solutions and mission-critical enterprise cabling.',
  },
  {
    id: 'finolex',
    name: 'Finolex',
    websiteUrl: 'https://finolex.com/',
    description: 'India’s foremost manufacturer of telecom, optic fiber, and networking cables.',
  },
  {
    id: 'polycab',
    name: 'Polycab',
    websiteUrl: 'https://polycab.com/',
    description: 'Leading wires, cables, and fast-moving electrical and data goods manufacturer in India.',
  },
  {
    id: 'molex',
    name: 'Molex',
    websiteUrl: 'https://www.molex.com/',
    description: 'Global supplier of advanced electronic, optic fiber, and copper connectivity solutions.',
  },

  // ── Power Supplies, UPS & Inverters ───────────────────────────────────
  {
    id: 'apc',
    name: 'APC',
    websiteUrl: 'https://www.apc.com/',
    description: 'Flagship brand of Schneider Electric for uninterruptible power supplies and IT physical infrastructure.',
  },
  {
    id: 'eaton',
    name: 'Eaton',
    websiteUrl: 'https://www.eaton.com/',
    description: 'Intelligent power management solutions that improve uptime and energy efficiency.',
  },
  {
    id: 'vertiv',
    name: 'Vertiv',
    websiteUrl: 'https://www.vertiv.com/',
    description: 'Architects of continuity delivering critical infrastructure for data centers and communications.',
  },
  {
    id: 'numeric',
    name: 'Numeric',
    websiteUrl: 'https://www.numericups.com/',
    description: 'Legrand group company and top UPS manufacturer in India for industrial reliability.',
  },
  {
    id: 'luminous',
    name: 'Luminous',
    websiteUrl: 'https://www.luminousindia.com/',
    description: 'Trusted Indian brand for solar power systems, heavy-duty inverters, and battery storage.',
  },
  {
    id: 'microtek',
    name: 'Microtek',
    websiteUrl: 'https://www.microtek.in/',
    description: 'Leading power electronics brand known for pure sine wave inverters and UPS units.',
  },

  // ── Computer Accessories ──────────────────────────────────────────────
  {
    id: 'hp',
    name: 'HP',
    websiteUrl: 'https://www.hp.com/',
    description: 'Global technology company providing business PCs, USB-C docks, and enterprise accessories.',
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    websiteUrl: 'https://www.lenovo.com/',
    description: 'ThinkPad ecosystem docks, high-res monitors, and enterprise workspace accessories.',
  },
  {
    id: 'logitech',
    name: 'Logitech',
    websiteUrl: 'https://www.logitech.com/',
    description: 'Innovative personal workspace solutions, MX Master precision tools, and webcams.',
  },
  {
    id: 'asus',
    name: 'ASUS',
    websiteUrl: 'https://www.asus.com/',
    description: 'Creator displays, multi-port docking stations, and commercial hardware.',
  },
  {
    id: 'belkin',
    name: 'Belkin',
    websiteUrl: 'https://www.belkin.com/',
    description: 'California-inspired connectivity leader for Thunderbolt docks, cables, and fast chargers.',
  },
  {
    id: 'ugreen',
    name: 'UGREEN',
    websiteUrl: 'https://www.ugreen.com/',
    description: 'High-quality electronics accessories, GaN fast charging stations, and multi-display adapters.',
  },
];

/**
 * Structured Mapping of Existing Category Slugs to Brand Identifiers
 */
export const CATEGORY_BRAND_MAP: Record<string, string[]> = {
  // CCTV Cameras & Surveillance
  'cctv-surveillance': [
    'hikvision',
    'cp-plus',
    'dahua',
    'prama',
    'axis-communications',
    'bosch',
    'hanwha-vision',
  ],

  // Networking Equipment
  'networking-equipment': [
    'cisco',
    'tp-link',
    'd-link',
    'netgear',
    'ubiquiti',
    'mikrotik',
    'hpe-aruba',
    'ruijie-networks',
  ],

  // Routers & Switches
  'routers-switches': [
    'cisco',
    'tp-link',
    'd-link',
    'netgear',
    'ubiquiti',
    'mikrotik',
    'hpe-aruba',
  ],

  // Storage Devices & NAS
  'storage-devices': [
    'synology',
    'qnap',
    'western-digital',
    'seagate',
    'dell',
    'hpe',
  ],

  // Cables & Connectors
  'cables-connectors': [
    'commscope',
    'd-link',
    'belden',
    'finolex',
    'polycab',
    'molex',
  ],

  // Power Supplies, UPS & Inverters
  'power-supplies': [
    'apc',
    'eaton',
    'vertiv',
    'numeric',
    'luminous',
    'microtek',
  ],

  // Computer Accessories
  'computer-accessories': [
    'dell',
    'hp',
    'lenovo',
    'logitech',
    'asus',
    'belkin',
    'ugreen',
  ],
};

/**
 * Route / Slug Aliases mapping common category variations to the canonical slug
 */
export const CATEGORY_ALIASES: Record<string, string> = {
  'cctv-cameras': 'cctv-surveillance',
  'cctv': 'cctv-surveillance',
  'surveillance': 'cctv-surveillance',
  'cctv-surveillance': 'cctv-surveillance',
  'networking': 'networking-equipment',
  'networking-equipment': 'networking-equipment',
  'routers': 'routers-switches',
  'switches': 'routers-switches',
  'routers-switches': 'routers-switches',
  'storage': 'storage-devices',
  'storage-devices': 'storage-devices',
  'nas': 'storage-devices',
  'cables': 'cables-connectors',
  'connectors': 'cables-connectors',
  'cables-connectors': 'cables-connectors',
  'power': 'power-supplies',
  'power-supplies': 'power-supplies',
  'ups': 'power-supplies',
  'inverters': 'power-supplies',
  'accessories': 'computer-accessories',
  'computer-accessories': 'computer-accessories',
};

/**
 * Brand name / string normalization to Brand ID
 */
export function normalizeBrandId(rawBrand?: string | null): string {
  if (!rawBrand) return '';
  const lower = rawBrand.trim().toLowerCase();

  // Known direct overrides
  if (lower === 'schneider electric' || lower === 'apc by schneider electric' || lower === 'apc') {
    return 'apc';
  }
  if (lower === 'dell technologies' || lower === 'dell') {
    return 'dell';
  }
  if (lower === 'cp plus' || lower === 'cpplus' || lower === 'cp-plus') {
    return 'cp-plus';
  }
  if (lower === 'axis' || lower === 'axis communications') {
    return 'axis-communications';
  }
  if (lower === 'hanwha' || lower === 'hanwha vision') {
    return 'hanwha-vision';
  }
  if (lower === 'tp-link' || lower === 'tplink') {
    return 'tp-link';
  }
  if (lower === 'd-link' || lower === 'dlink') {
    return 'd-link';
  }
  if (lower === 'hpe aruba' || lower === 'hpe aruba networking' || lower === 'aruba') {
    return 'hpe-aruba';
  }
  if (lower === 'ruijie' || lower === 'ruijie networks') {
    return 'ruijie-networks';
  }
  if (lower === 'western digital' || lower === 'wd') {
    return 'western-digital';
  }

  // Check matching in ALL_BRANDS
  const exact = ALL_BRANDS.find(
    (b) => b.id === lower || b.name.toLowerCase() === lower
  );
  if (exact) return exact.id;

  // Generic fallback: slugify
  return lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Retrieves configured brands for a given category slug
 */
export function getBrandsForCategory(categorySlug: string): BrandItem[] {
  const canonical = CATEGORY_ALIASES[categorySlug] || categorySlug;
  const brandIds = CATEGORY_BRAND_MAP[canonical];

  if (!brandIds) {
    // If category has no specific mapping or is 'all', return all unique brands
    return ALL_BRANDS;
  }

  return brandIds
    .map((id) => ALL_BRANDS.find((b) => b.id === id))
    .filter((b): b is BrandItem => Boolean(b));
}

/**
 * Look up brand details by ID or Name
 */
export function getBrandById(idOrName?: string | null): BrandItem | undefined {
  if (!idOrName) return undefined;
  const norm = normalizeBrandId(idOrName);
  return ALL_BRANDS.find((b) => b.id === norm || b.name.toLowerCase() === idOrName.toLowerCase());
}

/**
 * Look up human-friendly display name for a brand identifier
 */
export function getBrandDisplayName(idOrName?: string | null): string {
  if (!idOrName) return '';
  const brand = getBrandById(idOrName);
  return brand ? brand.name : idOrName;
}

/**
 * Return all registered brands sorted alphabetically
 */
export function getAllBrands(): BrandItem[] {
  return [...ALL_BRANDS].sort((a, b) => a.name.localeCompare(b.name));
}
