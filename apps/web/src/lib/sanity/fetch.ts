import { getSanityClient } from './client';

/**
 * Fetch data from Sanity with ISR revalidation.
 * Returns null if the query returns no results or if Sanity is unconfigured.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
  revalidate = 60
): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate },
    });
    return data ?? null;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
