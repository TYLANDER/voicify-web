export const siteConfig = {
  name: 'Voicify',
  description:
    'Voicify is the leading Voice AI platform for restaurants, healthcare, hotels, and automotive industries.',
  url: 'https://voicify.com',
  company: {
    name: 'Voicify, LLC',
    address: '117 Kendrick St, Suite 300, Needham, MA 02494',
    phone: '888-910-6525',
    email: 'info@voicify.com',
    linkedin: 'https://linkedin.com/company/voicifysoftware/',
  },
  trademarks: [
    'Voicify Conversation Experience Platform™',
    'Voicify Voice Content Management System™',
  ],
} as const;

export const navigation = {
  main: [
    {
      label: 'Industry Solutions',
      children: [
        { label: 'Restaurants', href: '/industries/restaurants' },
        { label: 'Dental', href: '/industries/healthcare/dental' },
        { label: 'Medical', href: '/industries/healthcare/medical' },
        { label: 'Hotels', href: '/industries/hotels' },
        { label: 'Automotive', href: '/industries/automotive' },
      ],
    },
    {
      label: 'Solutions',
      children: [
        { label: 'Voice AI Answering', href: '/answering' },
        { label: 'Voice AI Ordering', href: '/ordering' },
        { label: 'Voice AI Reservations', href: '/reservations' },
        { label: 'Integrations & Partners', href: '/integrations' },
      ],
    },
    {
      label: 'Company',
      children: [
        { label: 'About Us', href: '/company/about' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      label: 'Resources',
      children: [
        { label: 'Articles', href: '/resources/articles' },
        { label: 'Events', href: '/resources/events' },
        { label: 'Knowledge Center', href: 'https://support.voicify.com/en/knowledge' },
      ],
    },
  ],
  cta: { label: 'Schedule a Meeting', href: '/schedule' },
  footer: {
    columns: [
      {
        title: 'Current Clients',
        links: [
          { label: 'Support', href: 'https://app.voicify.com/login' },
          { label: 'Events', href: '/resources/events' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Knowledge Center', href: 'https://support.voicify.com/en/knowledge' },
          { label: 'Articles', href: '/resources/articles' },
        ],
      },
      {
        title: 'How Voicify Works',
        links: [
          { label: 'Voice AI Answering', href: '/answering' },
          { label: 'Voice AI Ordering', href: '/ordering' },
          { label: 'Voice AI Reservations', href: '/reservations' },
          { label: 'Integrations', href: '/integrations' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Privacy Policy', href: '/company/privacy' },
          { label: 'Partner with Us', href: '/integrations' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
    ],
  },
} as const;

export const complianceBadges = [
  { name: 'SOC 2', icon: 'Shield' },
  { name: 'PCI', icon: 'CreditCard' },
  { name: 'ISO 27001', icon: 'Lock' },
  { name: 'HIPAA', icon: 'HeartPulse' },
] as const;
