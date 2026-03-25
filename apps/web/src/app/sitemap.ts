import type { MetadataRoute } from 'next';

const BASE_URL = 'https://voicify.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/answering',
    '/ordering',
    '/reservations',
    '/industries/automotive',
    '/industries/hotels',
    '/industries/restaurants',
    '/industries/healthcare/dental',
    '/industries/healthcare/medical',
    '/integrations',
    '/contact',
    '/schedule',
    '/company/about',
    '/company/privacy',
    '/resources/articles',
    '/resources/events',
  ];

  return staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/industries') ? 0.8 : 0.7,
  }));
}
