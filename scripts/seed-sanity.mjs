/**
 * Sanity Content Seed Script
 * Seeds the Voicify CMS with all website content from voicify.com
 *
 * Usage: node scripts/seed-sanity.mjs
 * Requires: SANITY_PROJECT_ID and SANITY_TOKEN env vars (or edit below)
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '3uqiyfh2',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2025-03-24',
  useCdn: false,
});

// Helper to create a document
async function createDoc(doc) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`✓ Created ${doc._type}: ${doc.title || doc._id}`);
    return result;
  } catch (err) {
    console.error(`✗ Failed ${doc._type}: ${doc.title || doc._id}`, err.message);
  }
}

// ─── SITE SETTINGS (singleton) ───────────────────────────────────

await createDoc({
  _id: 'siteSettings',
  _type: 'siteSettings',
  contactInfo: {
    address: '117 Kendrick St, Suite 300, Needham, MA 02494',
    phone: '888-910-6525',
    email: 'info@voicify.com',
    linkedin: 'https://linkedin.com/company/voicifysoftware/',
  },
  complianceBadges: [
    { _key: 'soc2', name: 'SOC 2', icon: 'Shield' },
    { _key: 'pci', name: 'PCI', icon: 'CreditCard' },
    { _key: 'iso', name: 'ISO 27001', icon: 'Lock' },
    { _key: 'hipaa', name: 'HIPAA', icon: 'HeartPulse' },
  ],
  socialLinks: [
    { _key: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/voicifysoftware/' },
  ],
});

// ─── PRODUCT PAGES ───────────────────────────────────────────────

await createDoc({
  _id: 'product-answering',
  _type: 'productPage',
  title: 'Voice AI Answering',
  slug: { _type: 'slug', current: 'answering' },
  hero: {
    heading: 'Give Every Caller a Friendly Welcome with Voicify AI Answering',
    subheading: 'Raise the bar on service, without more headcount',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  valueProps: [
    { _key: 'v1', icon: 'Phone', title: 'Answer. Always.', description: 'Immediate responses with optional human escalation. Never miss a call, never lose a customer. Voicify AI provides links to directions, menus, and ordering instantly.' },
    { _key: 'v2', icon: 'Users', title: 'Raise the bar on service', description: 'Voice and SMS guest service automation without more headcount. Free your human staff for higher-value face-to-face tasks while AI handles the phones.' },
    { _key: 'v3', icon: 'TrendingUp', title: 'Improve conversion rates', description: 'Prompt responses drive more conversions. High-touch service with outsourced labor at an affordable monthly fee.' },
  ],
  features: [
    { _key: 'f1', icon: 'Brain', title: 'Natural Language Understanding', description: 'Advanced AI understands context, handles general inquiries about hours, directions, and more with natural conversation.' },
    { _key: 'f2', icon: 'Zap', title: 'Up and running in days', description: 'Quick deployment with no complex setup. Start answering calls with AI in days, not months.' },
    { _key: 'f3', icon: 'Code', title: 'No programmers required', description: 'Configure and manage your AI assistant without any technical expertise. Simple, intuitive controls.' },
    { _key: 'f4', icon: 'Scale', title: 'Scale to your Knowledge Base', description: 'The AI grows with your business. Add new topics, FAQs, and capabilities as your needs evolve.' },
  ],
  seo: {
    metaTitle: 'Voice AI Answering | Voicify',
    metaDescription: 'Give every caller a friendly welcome with Voicify AI Answering. Automated voice and SMS guest service that never misses a call.',
  },
});

await createDoc({
  _id: 'product-ordering',
  _type: 'productPage',
  title: 'Voice AI Ordering',
  slug: { _type: 'slug', current: 'ordering' },
  hero: {
    heading: 'Restaurant Voice AI Ordering That Simply Works',
    subheading: 'Take complex orders with modifiers and changes — accurately, every time',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  valueProps: [
    { _key: 'v1', icon: 'ShoppingCart', title: 'Take complex orders with modifiers and changes', description: 'AI handles complicated customizations without errors. Modifiers, substitutions, and special requests — all handled accurately.' },
    { _key: 'v2', icon: 'RefreshCw', title: 'Easy menu and pricing updates', description: 'Update your menu and pricing across all ordering channels instantly. No more outdated menus or incorrect prices.' },
    { _key: 'v3', icon: 'Target', title: 'Efficiency with a Side of Accuracy', description: 'Our continuous learning system improves with every order. Multi-channel ordering across phone, kiosk, and drive-thru.' },
  ],
  features: [
    { _key: 'f1', icon: 'MessageSquare', title: 'Natural Conversation', description: 'Customers order naturally, just like talking to a human. The AI understands context and follows conversation flow.' },
    { _key: 'f2', icon: 'Smartphone', title: 'Multi-Channel', description: 'Phone, kiosk, and drive-thru — one AI brain handles them all with consistent accuracy.' },
    { _key: 'f3', icon: 'Bell', title: 'Automatic Status Updates', description: 'Customers receive automatic order status updates via text or speech. No more "where is my order?" calls.' },
    { _key: 'f4', icon: 'BarChart', title: 'Analytics & Insights', description: 'Track ordering patterns, popular items, peak times, and customer preferences with detailed analytics.' },
  ],
  seo: {
    metaTitle: 'Voice AI Ordering | Voicify',
    metaDescription: 'Restaurant Voice AI Ordering that simply works. Take complex orders with modifiers and changes accurately every time.',
  },
});

await createDoc({
  _id: 'product-reservations',
  _type: 'productPage',
  title: 'Voice AI Reservations',
  slug: { _type: 'slug', current: 'reservations' },
  hero: {
    heading: 'Provide courteous, self-service table reservations that never sleep',
    subheading: '24/7 availability with intelligent scheduling and guest communication',
    backgroundType: 'gradient',
    ctaText: 'Book a Demo',
    ctaLink: '/schedule',
  },
  features: [
    { _key: 'f1', icon: 'Clock', title: '24/7 Availability', description: 'Round-the-clock reservation acceptance. Never miss a booking, even after hours or during peak times.' },
    { _key: 'f2', icon: 'Calendar', title: 'Effortless Scheduling', description: 'Seamless integration with your existing reservation software. Guests book, modify, or cancel with a simple call.' },
    { _key: 'f3', icon: 'Settings', title: 'Optimized Operations', description: 'Intelligent table balancing and staff efficiency. Maximize seating while maintaining a great guest experience.' },
    { _key: 'f4', icon: 'Bell', title: 'Automate Guest Updates', description: 'Automated confirmation and reminder notifications delivered via voice or text. Reduce no-shows effortlessly.' },
  ],
  seo: {
    metaTitle: 'Voice AI Reservations | Voicify',
    metaDescription: 'Provide courteous, self-service table reservations that never sleep. 24/7 availability with seamless scheduling.',
  },
});

// ─── INDUSTRY PAGES ──────────────────────────────────────────────

await createDoc({
  _id: 'industry-automotive',
  _type: 'industryPage',
  title: 'Automotive',
  slug: { _type: 'slug', current: 'automotive' },
  hero: {
    heading: 'The leading Voice AI Customer Service Agent for the Automotive Industry',
    subheading: 'Elevate guest experience, streamline operations, & drive new revenue',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  solutions: [
    { _key: 's1', icon: 'Calendar', title: 'Effortless Appointment Scheduling', description: 'Voice-based booking and modification for service appointments. Customers schedule, reschedule, or cancel without waiting on hold.' },
    { _key: 's2', icon: 'Clock', title: '24/7 Customer Support', description: 'Round-the-clock AI assistance for your customers. Answer questions about service hours, pricing, and availability any time.' },
    { _key: 's3', icon: 'Car', title: 'Service Status Updates', description: 'Real-time vehicle service progress notifications. Customers get automatic updates when their vehicle is ready.' },
    { _key: 's4', icon: 'CreditCard', title: 'Streamlined Payment Processing', description: 'Secure phone-based invoice settlement. Customers can pay for services quickly and securely over the phone.' },
    { _key: 's5', icon: 'Plug', title: 'Seamless Integration', description: 'Compatibility with your existing service management systems and CRMs. No rip-and-replace required.' },
  ],
  seo: { metaTitle: 'Automotive Voice AI | Voicify', metaDescription: 'The leading Voice AI Customer Service Agent for the Automotive Industry.' },
});

await createDoc({
  _id: 'industry-dental',
  _type: 'industryPage',
  title: 'Dental',
  slug: { _type: 'slug', current: 'healthcare/dental' },
  hero: {
    heading: 'The Leading Voice AI Receptionist for Dental Practices',
    subheading: 'Answer every patient, every time they call — without disrupting face-to-face care',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  painPoints: [
    { _key: 'p1', icon: 'Phone', title: 'Answer every patient, every time they call', description: 'Voicify AI answers 100% of patient calls without disrupting face-to-face patient care. Your staff stays focused on the patients in front of them.' },
    { _key: 'p2', icon: 'Calendar', title: 'Make accessing dental care less painful', description: 'Simplify appointment booking, creation, and rescheduling. 24/7 availability with intelligent scheduling that understands your practice.' },
    { _key: 'p3', icon: 'Shield', title: 'Takes patient security seriously', description: 'HIPAA compliant cloud-based encryption ensures patient information stays secure. SOC 2, PCI, and ISO 27001 certified.' },
  ],
  solutions: [
    { _key: 's1', icon: 'Bell', title: 'Automated Appointment Reminders', description: 'Voice and text reminders reduce no-shows and keep your schedule full.' },
    { _key: 's2', icon: 'UserCheck', title: 'Returning Patient Recognition', description: 'AI recognizes returning patients and personalizes the conversation based on their history.' },
    { _key: 's3', icon: 'MessageSquare', title: 'Complex Conversation Handling', description: 'On-the-fly modifications, multi-step scheduling, and nuanced patient interactions.' },
    { _key: 's4', icon: 'Plug', title: 'Practice Management Integration', description: 'Seamless integration with your existing practice management systems. No workflow disruption.' },
  ],
  testimonial: {
    quote: 'Voicify has significantly reduced the stress on our front desk staff. Our patients love the convenience, and we can focus more on providing excellent in-person care.',
    author: 'Practice Manager',
    role: 'Dental Practice',
  },
  seo: { metaTitle: 'Dental Voice AI | Voicify', metaDescription: 'The Leading Voice AI Receptionist for Dental Practices.' },
});

await createDoc({
  _id: 'industry-medical',
  _type: 'industryPage',
  title: 'Medical',
  slug: { _type: 'slug', current: 'healthcare/medical' },
  hero: {
    heading: 'Voice AI for Medical Practices',
    subheading: 'Automate patient communication while maintaining the highest security standards',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  solutions: [
    { _key: 's1', icon: 'Phone', title: 'Patient Call Management', description: 'AI handles appointment scheduling, prescription refill requests, and general inquiries — allowing staff to focus on patient care.' },
    { _key: 's2', icon: 'Calendar', title: 'Intelligent Scheduling', description: 'Smart appointment booking that understands provider availability, visit types, and patient preferences.' },
    { _key: 's3', icon: 'Bell', title: 'Automated Reminders', description: 'Reduce no-shows with automated appointment reminders via voice call and text message.' },
    { _key: 's4', icon: 'Shield', title: 'HIPAA Compliant', description: 'Enterprise-grade security with HIPAA compliant cloud encryption. Patient data is always protected.' },
    { _key: 's5', icon: 'UserCheck', title: 'Patient Recognition', description: 'AI recognizes returning patients and provides personalized assistance based on their profile.' },
    { _key: 's6', icon: 'Plug', title: 'EHR Integration', description: 'Seamless integration with Electronic Health Record systems and practice management software.' },
  ],
  seo: { metaTitle: 'Medical Voice AI | Voicify', metaDescription: 'Voice AI solutions for medical practices with HIPAA compliance.' },
});

await createDoc({
  _id: 'industry-hotels',
  _type: 'industryPage',
  title: 'Hotels',
  slug: { _type: 'slug', current: 'hotels' },
  hero: {
    heading: 'The most advanced Voice AI Receptionist for Hotels',
    subheading: 'Elevate guest experience, streamline operations, & drive new revenue',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  solutions: [
    { _key: 's1', icon: 'Bed', title: 'Effortless Booking and Reservations', description: 'Guests book rooms, modify stays, and check availability with natural voice commands. Seamless integration with your PMS.' },
    { _key: 's2', icon: 'Clock', title: '24/7 Guest Assistance', description: 'Around-the-clock support for guest inquiries. From check-in times to amenity information, AI handles it all.' },
    { _key: 's3', icon: 'ConciergeBell', title: 'Service Requests Made Easy', description: 'Housekeeping, room service, and maintenance requests via voice. Faster response times, happier guests.' },
    { _key: 's4', icon: 'Star', title: 'Personalized Recommendations', description: 'AI-powered suggestions for dining, activities, and local attractions based on guest preferences.' },
    { _key: 's5', icon: 'Plug', title: 'Seamless Integration with Hotel Systems', description: 'Works with your existing PMS, CRM, and communication systems. No disruption to current workflows.' },
  ],
  seo: { metaTitle: 'Hotels Voice AI | Voicify', metaDescription: 'The most advanced Voice AI Receptionist for Hotels.' },
});

await createDoc({
  _id: 'industry-restaurants',
  _type: 'industryPage',
  title: 'Restaurants',
  slug: { _type: 'slug', current: 'restaurants' },
  hero: {
    heading: 'Voice AI Built for Restaurants',
    subheading: '2-3x increase in answered calls — more orders, more reservations, more growth',
    backgroundType: 'gradient',
    ctaText: 'Schedule a Meeting',
    ctaLink: '/schedule',
  },
  solutions: [
    { _key: 's1', icon: 'Phone', title: 'Answer Every Call', description: 'Restaurants with Voicify AI experience a 2-3x increase in answered calls. Never miss an order or reservation again.' },
    { _key: 's2', icon: 'ShoppingCart', title: 'Voice AI Ordering', description: 'Take complex orders with modifiers and customizations accurately. Phone, kiosk, and drive-thru ordering in one system.' },
    { _key: 's3', icon: 'Calendar', title: 'Voice AI Reservations', description: 'Automated 24/7 reservation management. Book, modify, and confirm tables without staff intervention.' },
    { _key: 's4', icon: 'HelpCircle', title: 'Voice AI Answering', description: 'Handle common inquiries about hours, location, menu, and specials. Free your staff for in-person hospitality.' },
    { _key: 's5', icon: 'BarChart', title: 'Analytics & Insights', description: 'Understand call volumes, popular menu items, peak times, and missed opportunities with detailed reporting.' },
    { _key: 's6', icon: 'Plug', title: 'POS Integration', description: 'Direct integration with major POS systems. Orders flow seamlessly from phone to kitchen.' },
  ],
  seo: { metaTitle: 'Restaurant Voice AI | Voicify', metaDescription: 'Restaurants with Voicify AI experience a 2-3x increase in answered calls.' },
});

// ─── PARTNERS ────────────────────────────────────────────────────

const partners = [
  { _id: 'partner-chowly', name: 'Chowly', category: 'technology', description: 'Order management integration', quote: 'Customers expect consistent experience regardless of how, where, and when they engage with a brand.', quoteAuthor: 'Alex Cranfill' },
  { _id: 'partner-par', name: 'PAR', category: 'technology', description: 'POS system integration for direct order routing' },
  { _id: 'partner-olo', name: 'Olo', category: 'technology', description: 'Digital restaurant service platform', quote: 'Expand operational competitive advantage.', quoteAuthor: 'Nolan DeCoster' },
  { _id: 'partner-qikserve', name: 'QikServe', category: 'technology', description: 'Guest convenience and ordering solutions', quote: 'Guests expect convenience and consistency across every touchpoint.', quoteAuthor: 'Rob Taylor' },
  { _id: 'partner-norms', name: 'NORMS Restaurant Group', category: 'restaurant' },
  { _id: 'partner-puregreen', name: 'Pure Green Franchise', category: 'restaurant' },
  { _id: 'partner-tso', name: "T'so Chinese", category: 'restaurant' },
  { _id: 'partner-zaza', name: 'Zaza Cuban Comfort Food', category: 'restaurant' },
];

for (const p of partners) {
  await createDoc({ _type: 'partner', ...p });
}

// ─── GENERIC PAGES ───────────────────────────────────────────────

await createDoc({
  _id: 'page-about',
  _type: 'page',
  title: 'About Us',
  slug: { _type: 'slug', current: 'about' },
  content: [
    { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Voicify is the leading Voice AI platform helping businesses across restaurants, healthcare, hotels, and automotive industries transform their phone communication.' }] },
    { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Our Conversation Experience Platform™ and Voice Content Management System™ enable businesses to deploy intelligent voice AI agents that answer calls, take orders, manage reservations, and handle customer inquiries — 24/7, with natural conversation quality.' }] },
    { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Based in Needham, Massachusetts, Voicify serves businesses nationwide with enterprise-grade security including SOC 2, PCI, ISO 27001, and HIPAA compliance.' }] },
  ],
  seo: { metaTitle: 'About Us | Voicify', metaDescription: 'Voicify is the leader in Voice AI for restaurants, healthcare, hotels, and automotive industries.' },
});

await createDoc({
  _id: 'page-privacy',
  _type: 'page',
  title: 'Privacy Policy',
  slug: { _type: 'slug', current: 'privacy' },
  content: [
    { _type: 'block', _key: 'b1', style: 'h2', children: [{ _type: 'span', _key: 's1', text: 'Introduction' }] },
    { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Voicify, LLC ("Voicify," "we," "us," or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our voice experience platform and related services.' }] },
    { _type: 'block', _key: 'b3', style: 'h2', children: [{ _type: 'span', _key: 's3', text: 'Information We Collect' }] },
    { _type: 'block', _key: 'b4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products and services, participate in activities on our platform, or otherwise contact us.' }] },
    { _type: 'block', _key: 'b5', style: 'h2', children: [{ _type: 'span', _key: 's5', text: 'Security' }] },
    { _type: 'block', _key: 'b6', style: 'normal', children: [{ _type: 'span', _key: 's6', text: 'We use administrative, technical, and physical security measures to protect your personal information. Our platform is SOC 2, PCI, ISO 27001, and HIPAA compliant.' }] },
  ],
  seo: { metaTitle: 'Privacy Policy | Voicify', metaDescription: 'Privacy is a top priority of our voice experience platform.' },
});

// ─── ARTICLES ────────────────────────────────────────────────────

const articles = [
  { _id: 'article-voice-ai-restaurants', title: 'How Voice AI is Transforming the Restaurant Industry', slug: 'voice-ai-restaurant-industry', excerpt: 'Discover how restaurants are using Voice AI to increase answered calls by 2-3x and drive more orders.', publishedAt: '2024-06-15T12:00:00Z', categories: ['Restaurants', 'Voice AI'] },
  { _id: 'article-hipaa-voice-ai', title: 'HIPAA Compliant Voice AI for Healthcare', slug: 'hipaa-compliant-voice-ai', excerpt: 'Learn about the security measures that make Voice AI safe for handling patient data.', publishedAt: '2024-05-20T12:00:00Z', categories: ['Healthcare', 'Security'] },
  { _id: 'article-future-customer-service', title: 'The Future of Customer Service: AI Voice Agents', slug: 'future-of-customer-service', excerpt: 'Explore how AI voice agents are reshaping customer service across industries.', publishedAt: '2024-04-10T12:00:00Z', categories: ['Industry Trends'] },
];

for (const a of articles) {
  await createDoc({
    _type: 'article',
    _id: a._id,
    title: a.title,
    slug: { _type: 'slug', current: a.slug },
    excerpt: a.excerpt,
    publishedAt: a.publishedAt,
    categories: a.categories,
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: `${a.excerpt} This content can be fully customized in the Sanity Studio CMS.` }] },
    ],
    seo: { metaTitle: `${a.title} | Voicify`, metaDescription: a.excerpt },
  });
}

// ─── EVENTS ──────────────────────────────────────────────────────

const events = [
  { _id: 'event-murtec', title: 'MURTEC', slug: 'murtec-2025', dates: { start: '2025-03-10', end: '2025-03-12' }, location: 'Las Vegas', description: 'Multi-Unit Restaurant Technology Conference — join us to see how Voice AI is transforming multi-unit restaurant operations.' },
  { _id: 'event-pizza-expo', title: 'International Pizza Expo', slug: 'pizza-expo-2025', dates: { start: '2025-03-24', end: '2025-03-26' }, location: 'Las Vegas', description: 'The world\'s largest pizza industry trade show. See Voicify\'s Voice AI ordering in action.' },
  { _id: 'event-nra', title: 'National Restaurant Association Show', slug: 'nra-show-2025', dates: { start: '2025-05-17', end: '2025-05-20' }, location: 'Chicago', description: 'The premier foodservice industry event. Meet the Voicify team and see our latest innovations.' },
  { _id: 'event-fstec', title: 'FSTEC', slug: 'fstec-2025', dates: { start: '2025-09-15', end: '2025-09-17' }, location: 'Dallas', description: 'The food service technology conference. Learn how Voice AI is driving efficiency across the industry.' },
];

for (const e of events) {
  await createDoc({
    _type: 'event',
    _id: e._id,
    title: e.title,
    slug: { _type: 'slug', current: e.slug },
    dates: e.dates,
    location: e.location,
    description: e.description,
  });
}

console.log('\n✅ Sanity seed complete! Open your Sanity Studio to review the content.');
