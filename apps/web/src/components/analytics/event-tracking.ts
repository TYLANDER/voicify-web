/**
 * Track a custom GA4 event.
 *
 * Safe to call on the server or before gtag is loaded — it will silently
 * no-op when `window` or `window.gtag` is unavailable.
 */
export function trackEvent(action: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}

/** Track a form submission event. */
export function trackFormSubmission(formName: string) {
  trackEvent('form_submission', { form_name: formName });
}

/** Track a CTA button click. */
export function trackCTAClick(ctaName: string, page: string) {
  trackEvent('cta_click', { cta_name: ctaName, page });
}

/** Track a video play event. */
export function trackVideoPlay(videoTitle: string) {
  trackEvent('video_play', { video_title: videoTitle });
}
