import { sanityClient } from './client';

/**
 * Fetch data from Sanity with ISR revalidation.
 * Returns null if the query returns no results or if Sanity is unconfigured.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
  revalidate = 60
): Promise<T | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null;
  }

  try {
    const data = await sanityClient.fetch<T>(query, params, {
      next: { revalidate },
    });
    return data ?? null;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
