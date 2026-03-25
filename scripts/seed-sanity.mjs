/**
 * Sanity Content Seed Script — Direct REST API
 * Seeds the Voicify CMS with all website content
 *
 * Usage: SANITY_TOKEN=<token> node scripts/seed-sanity.mjs
 */

const PROJECT_ID = '3uqiyfh2';
const DATASET = 'production';
const API_VERSION = '2025-03-24';
const TOKEN = process.env.SANITY_TOKEN || '';

if (!TOKEN) {
  console.error('Error: Set SANITY_TOKEN environment variable');
  process.exit(1);
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

async function seed(mutations) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('API Error:', JSON.stringify(data, null, 2));
    process.exit(1);
  }
  return data;
}

function doc(obj) {
  return { createOrReplace: obj };
}

// Build all mutations
const mutations = [
  // ─── SITE SETTINGS ─────────────────────────────
  doc({
    _id: 'siteSettings', _type: 'siteSettings',
    contactInfo: { address: '117 Kendrick St, Suite 300, Needham, MA 02494', phone: '888-910-6525', email: 'info@voicify.com', linkedin: 'https://linkedin.com/company/voicifysoftware/' },
    complianceBadges: [
      { _key: 'soc2', name: 'SOC 2', icon: 'Shield' },
      { _key: 'pci', name: 'PCI', icon: 'CreditCard' },
      { _key: 'iso', name: 'ISO 27001', icon: 'Lock' },
      { _key: 'hipaa', name: 'HIPAA', icon: 'HeartPulse' },
    ],
    socialLinks: [{ _key: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/company/voicifysoftware/' }],
  }),

  // ─── PRODUCT PAGES ─────────────────────────────
  doc({
    _id: 'product-answering', _type: 'productPage', title: 'Voice AI Answering',
    slug: { _type: 'slug', current: 'answering' },
    hero: { heading: 'Give Every Caller a Friendly Welcome with Voicify AI Answering', subheading: 'Raise the bar on service, without more headcount', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' },
    valueProps: [
      { _key: 'v1', icon: 'Phone', title: 'Answer. Always.', description: 'Immediate responses with optional human escalation. Never miss a call, never lose a customer.' },
      { _key: 'v2', icon: 'Users', title: 'Raise the bar on service', description: 'Voice and SMS guest service automation without more headcount. Free your human staff for higher-value tasks.' },
      { _key: 'v3', icon: 'TrendingUp', title: 'Improve conversion rates', description: 'Prompt responses drive more conversions. Provide links to directions, menus, and ordering instantly.' },
    ],
    features: [
      { _key: 'f1', icon: 'Brain', title: 'Natural Language Understanding', description: 'Advanced AI understands context and handles general inquiries about hours, directions, and more.' },
      { _key: 'f2', icon: 'Zap', title: 'Up and running in days', description: 'Quick deployment with no complex setup. Start answering calls with AI in days, not months.' },
      { _key: 'f3', icon: 'Code', title: 'No programmers required', description: 'Configure and manage your AI assistant without any technical expertise.' },
      { _key: 'f4', icon: 'Scale', title: 'Scale to your Knowledge Base', description: 'The AI grows with your business. Add new topics, FAQs, and capabilities as your needs evolve.' },
    ],
    seo: { metaTitle: 'Voice AI Answering | Voicify', metaDescription: 'Give every caller a friendly welcome with Voicify AI Answering.' },
  }),

  doc({
    _id: 'product-ordering', _type: 'productPage', title: 'Voice AI Ordering',
    slug: { _type: 'slug', current: 'ordering' },
    hero: { heading: 'Restaurant Voice AI Ordering That Simply Works', subheading: 'Take complex orders with modifiers and changes — accurately, every time', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' },
    valueProps: [
      { _key: 'v1', icon: 'ShoppingCart', title: 'Take complex orders with modifiers and changes', description: 'AI handles complicated customizations without errors.' },
      { _key: 'v2', icon: 'RefreshCw', title: 'Easy menu and pricing updates', description: 'Update your menu and pricing across all ordering channels instantly.' },
      { _key: 'v3', icon: 'Target', title: 'Efficiency with a Side of Accuracy', description: 'Our continuous learning system improves with every order. Multi-channel ordering across phone, kiosk, and drive-thru.' },
    ],
    features: [
      { _key: 'f1', icon: 'MessageSquare', title: 'Natural Conversation', description: 'Customers order naturally, just like talking to a human.' },
      { _key: 'f2', icon: 'Smartphone', title: 'Multi-Channel', description: 'Phone, kiosk, and drive-thru — one AI brain handles them all.' },
      { _key: 'f3', icon: 'Bell', title: 'Automatic Status Updates', description: 'Customers receive automatic order status updates via text or speech.' },
      { _key: 'f4', icon: 'BarChart', title: 'Analytics & Insights', description: 'Track ordering patterns, popular items, peak times, and customer preferences.' },
    ],
    seo: { metaTitle: 'Voice AI Ordering | Voicify', metaDescription: 'Restaurant Voice AI Ordering that simply works.' },
  }),

  doc({
    _id: 'product-reservations', _type: 'productPage', title: 'Voice AI Reservations',
    slug: { _type: 'slug', current: 'reservations' },
    hero: { heading: 'Provide courteous, self-service table reservations that never sleep', subheading: '24/7 availability with intelligent scheduling and guest communication', backgroundType: 'gradient', ctaText: 'Book a Demo', ctaLink: '/schedule' },
    features: [
      { _key: 'f1', icon: 'Clock', title: '24/7 Availability', description: 'Round-the-clock reservation acceptance. Never miss a booking.' },
      { _key: 'f2', icon: 'Calendar', title: 'Effortless Scheduling', description: 'Seamless integration with your existing reservation software.' },
      { _key: 'f3', icon: 'Settings', title: 'Optimized Operations', description: 'Intelligent table balancing and staff efficiency.' },
      { _key: 'f4', icon: 'Bell', title: 'Automate Guest Updates', description: 'Automated confirmation and reminder notifications via voice or text.' },
    ],
    seo: { metaTitle: 'Voice AI Reservations | Voicify', metaDescription: 'Courteous, self-service table reservations that never sleep.' },
  }),

  // ─── INDUSTRY PAGES ────────────────────────────
  doc({ _id: 'industry-automotive', _type: 'industryPage', title: 'Automotive', slug: { _type: 'slug', current: 'automotive' }, hero: { heading: 'The leading Voice AI Customer Service Agent for the Automotive Industry', subheading: 'Elevate guest experience, streamline operations, & drive new revenue', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' }, solutions: [ { _key: 's1', icon: 'Calendar', title: 'Effortless Appointment Scheduling', description: 'Voice-based booking and modification for service appointments.' }, { _key: 's2', icon: 'Clock', title: '24/7 Customer Support', description: 'Round-the-clock AI assistance for your customers.' }, { _key: 's3', icon: 'Car', title: 'Service Status Updates', description: 'Real-time vehicle service progress notifications.' }, { _key: 's4', icon: 'CreditCard', title: 'Streamlined Payment Processing', description: 'Secure phone-based invoice settlement.' }, { _key: 's5', icon: 'Plug', title: 'Seamless Integration', description: 'Compatibility with your existing service management systems and CRMs.' } ], seo: { metaTitle: 'Automotive Voice AI | Voicify' } }),

  doc({ _id: 'industry-dental', _type: 'industryPage', title: 'Dental', slug: { _type: 'slug', current: 'healthcare/dental' }, hero: { heading: 'The Leading Voice AI Receptionist for Dental Practices', subheading: 'Answer every patient, every time they call', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' }, painPoints: [ { _key: 'p1', icon: 'Phone', title: 'Answer every patient, every time', description: 'Voicify AI answers 100% of patient calls without disrupting face-to-face care.' }, { _key: 'p2', icon: 'Calendar', title: 'Make accessing dental care less painful', description: 'Simplify appointment booking, creation, and rescheduling.' }, { _key: 'p3', icon: 'Shield', title: 'Patient security', description: 'HIPAA compliant cloud-based encryption ensures patient info stays secure.' } ], solutions: [ { _key: 's1', icon: 'Bell', title: 'Automated Reminders', description: 'Voice and text reminders reduce no-shows.' }, { _key: 's2', icon: 'UserCheck', title: 'Patient Recognition', description: 'AI recognizes returning patients.' }, { _key: 's3', icon: 'Plug', title: 'Practice Management Integration', description: 'Seamless integration with existing systems.' } ], seo: { metaTitle: 'Dental Voice AI | Voicify' } }),

  doc({ _id: 'industry-medical', _type: 'industryPage', title: 'Medical', slug: { _type: 'slug', current: 'healthcare/medical' }, hero: { heading: 'Voice AI for Medical Practices', subheading: 'Automate patient communication while maintaining the highest security standards', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' }, solutions: [ { _key: 's1', icon: 'Phone', title: 'Patient Call Management', description: 'AI handles scheduling, refills, and inquiries.' }, { _key: 's2', icon: 'Calendar', title: 'Intelligent Scheduling', description: 'Smart booking that understands provider availability.' }, { _key: 's3', icon: 'Shield', title: 'HIPAA Compliant', description: 'Enterprise-grade security with HIPAA compliant encryption.' }, { _key: 's4', icon: 'Plug', title: 'EHR Integration', description: 'Seamless integration with Electronic Health Record systems.' } ], seo: { metaTitle: 'Medical Voice AI | Voicify' } }),

  doc({ _id: 'industry-hotels', _type: 'industryPage', title: 'Hotels', slug: { _type: 'slug', current: 'hotels' }, hero: { heading: 'The most advanced Voice AI Receptionist for Hotels', subheading: 'Elevate guest experience, streamline operations, & drive new revenue', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' }, solutions: [ { _key: 's1', icon: 'Bed', title: 'Effortless Booking', description: 'Guests book rooms with natural voice commands.' }, { _key: 's2', icon: 'Clock', title: '24/7 Guest Assistance', description: 'Around-the-clock support for guest inquiries.' }, { _key: 's3', icon: 'Star', title: 'Personalized Recommendations', description: 'AI-powered suggestions for dining and activities.' }, { _key: 's4', icon: 'Plug', title: 'System Integration', description: 'Works with your existing PMS and CRM.' } ], seo: { metaTitle: 'Hotels Voice AI | Voicify' } }),

  doc({ _id: 'industry-restaurants', _type: 'industryPage', title: 'Restaurants', slug: { _type: 'slug', current: 'restaurants' }, hero: { heading: 'Voice AI Built for Restaurants', subheading: '2-3x increase in answered calls — more orders, more reservations, more growth', backgroundType: 'gradient', ctaText: 'Schedule a Meeting', ctaLink: '/schedule' }, solutions: [ { _key: 's1', icon: 'Phone', title: 'Answer Every Call', description: '2-3x increase in answered calls.' }, { _key: 's2', icon: 'ShoppingCart', title: 'Voice AI Ordering', description: 'Complex orders with modifiers, accurately.' }, { _key: 's3', icon: 'Calendar', title: 'Voice AI Reservations', description: 'Automated 24/7 reservation management.' }, { _key: 's4', icon: 'Plug', title: 'POS Integration', description: 'Direct integration with major POS systems.' } ], seo: { metaTitle: 'Restaurant Voice AI | Voicify' } }),

  // ─── PARTNERS ──────────────────────────────────
  doc({ _id: 'partner-chowly', _type: 'partner', name: 'Chowly', category: 'technology', description: 'Order management integration', quote: 'Customers expect consistent experience regardless of how, where, and when they engage with a brand.', quoteAuthor: 'Alex Cranfill' }),
  doc({ _id: 'partner-par', _type: 'partner', name: 'PAR', category: 'technology', description: 'POS system integration for direct order routing' }),
  doc({ _id: 'partner-olo', _type: 'partner', name: 'Olo', category: 'technology', description: 'Digital restaurant service platform', quote: 'Expand operational competitive advantage.', quoteAuthor: 'Nolan DeCoster' }),
  doc({ _id: 'partner-qikserve', _type: 'partner', name: 'QikServe', category: 'technology', description: 'Guest convenience and ordering solutions', quote: 'Guests expect convenience and consistency across every touchpoint.', quoteAuthor: 'Rob Taylor' }),
  doc({ _id: 'partner-norms', _type: 'partner', name: 'NORMS Restaurant Group', category: 'restaurant' }),
  doc({ _id: 'partner-puregreen', _type: 'partner', name: 'Pure Green Franchise', category: 'restaurant' }),
  doc({ _id: 'partner-tso', _type: 'partner', name: "T'so Chinese", category: 'restaurant' }),
  doc({ _id: 'partner-zaza', _type: 'partner', name: 'Zaza Cuban Comfort Food', category: 'restaurant' }),

  // ─── PAGES ─────────────────────────────────────
  doc({ _id: 'page-about', _type: 'page', title: 'About Us', slug: { _type: 'slug', current: 'about' }, content: [ { _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'Voicify is the leading Voice AI platform helping businesses across restaurants, healthcare, hotels, and automotive industries transform their phone communication.' }] } ], seo: { metaTitle: 'About Us | Voicify' } }),
  doc({ _id: 'page-privacy', _type: 'page', title: 'Privacy Policy', slug: { _type: 'slug', current: 'privacy' }, content: [ { _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'Voicify, LLC is committed to protecting and respecting your privacy. Our platform is SOC 2, PCI, ISO 27001, and HIPAA compliant.' }] } ], seo: { metaTitle: 'Privacy Policy | Voicify' } }),

  // ─── ARTICLES ──────────────────────────────────
  doc({ _id: 'article-1', _type: 'article', title: 'How Voice AI is Transforming the Restaurant Industry', slug: { _type: 'slug', current: 'voice-ai-restaurant-industry' }, excerpt: 'Discover how restaurants are using Voice AI to increase answered calls by 2-3x.', publishedAt: '2024-06-15T12:00:00Z', categories: ['Restaurants', 'Voice AI'], body: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'Restaurants using Voicify AI experience a 2-3x increase in answered calls, translating to more orders and revenue.' }] }], seo: { metaTitle: 'Voice AI for Restaurants | Voicify' } }),
  doc({ _id: 'article-2', _type: 'article', title: 'HIPAA Compliant Voice AI for Healthcare', slug: { _type: 'slug', current: 'hipaa-compliant-voice-ai' }, excerpt: 'Learn about the security measures that make Voice AI safe for patient data.', publishedAt: '2024-05-20T12:00:00Z', categories: ['Healthcare', 'Security'], body: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'HIPAA compliant cloud-based encryption ensures patient information stays secure.' }] }], seo: { metaTitle: 'HIPAA Voice AI | Voicify' } }),
  doc({ _id: 'article-3', _type: 'article', title: 'The Future of Customer Service: AI Voice Agents', slug: { _type: 'slug', current: 'future-of-customer-service' }, excerpt: 'Explore how AI voice agents are reshaping customer service across industries.', publishedAt: '2024-04-10T12:00:00Z', categories: ['Industry Trends'], body: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'AI voice agents are transforming how businesses handle customer communication.' }] }], seo: { metaTitle: 'Future of Customer Service | Voicify' } }),

  // ─── EVENTS ────────────────────────────────────
  doc({ _id: 'event-murtec', _type: 'event', title: 'MURTEC', slug: { _type: 'slug', current: 'murtec-2025' }, dates: { start: '2025-03-10', end: '2025-03-12' }, location: 'Las Vegas', description: 'Multi-Unit Restaurant Technology Conference.' }),
  doc({ _id: 'event-pizza-expo', _type: 'event', title: 'International Pizza Expo', slug: { _type: 'slug', current: 'pizza-expo-2025' }, dates: { start: '2025-03-24', end: '2025-03-26' }, location: 'Las Vegas', description: 'The world\'s largest pizza industry trade show.' }),
  doc({ _id: 'event-nra', _type: 'event', title: 'National Restaurant Association Show', slug: { _type: 'slug', current: 'nra-show-2025' }, dates: { start: '2025-05-17', end: '2025-05-20' }, location: 'Chicago', description: 'The premier foodservice industry event.' }),
  doc({ _id: 'event-fstec', _type: 'event', title: 'FSTEC', slug: { _type: 'slug', current: 'fstec-2025' }, dates: { start: '2025-09-15', end: '2025-09-17' }, location: 'Dallas', description: 'The food service technology conference.' }),
];

console.log(`Seeding ${mutations.length} documents...`);
const result = await seed(mutations);
console.log(`✅ Created ${result.results.length} documents`);

// Verify
const verify = await fetch(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=count(*%5B_type%20!%3D%20%22system.group%22%20%26%26%20_type%20!%3D%20%22system.retention%22%5D)`, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});
const vData = await verify.json();
console.log(`✅ Total documents in Sanity: ${vData.result}`);
