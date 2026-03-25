import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-03-24',
  useCdn: process.env.NODE_ENV === 'production',
};

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!sanityConfig.projectId) return null;
  if (!_client) {
    _client = createClient({ ...sanityConfig, perspective: 'published' });
  }
  return _client;
}

// Legacy export for backward compat — avoid using at module scope
export const sanityClient = sanityConfig.projectId
  ? createClient({ ...sanityConfig, perspective: 'published' })
  : (null as unknown as SanityClient);

export function urlFor(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) return null;
  return imageUrlBuilder(client).image(source);
}
