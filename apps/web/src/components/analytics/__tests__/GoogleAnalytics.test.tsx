import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

// Mock next/script to render as a regular element for testing.
// The dangerouslySetInnerHTML prop is not used in the mock output —
// it is only accepted as a prop type to satisfy the component signature.
vi.mock('next/script', () => ({
  default: ({
    id,
    src,
    children,
  }: {
    id?: string;
    src?: string;
    children?: React.ReactNode;
    strategy?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => {
    if (src) {
      return <script data-testid={id || 'ga-script'} src={src} />;
    }
    return <script data-testid={id || 'ga-inline-script'}>{children}</script>;
  },
}));

describe('GoogleAnalytics', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('renders nothing when env var is not set', async () => {
    // Ensure the env var is not set
    const originalEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    const { GoogleAnalytics } = await import('../GoogleAnalytics');
    const { container } = render(<GoogleAnalytics />);

    expect(container.innerHTML).toBe('');

    // Restore
    if (originalEnv) {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalEnv;
    }
  });

  it('renders script tags when env var is set', async () => {
    // We need to set the env var BEFORE the module is imported,
    // since it reads it at module scope. Reset modules first.
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123';

    const { GoogleAnalytics } = await import('../GoogleAnalytics');
    const { container } = render(<GoogleAnalytics />);

    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBeGreaterThanOrEqual(1);

    // Check that the gtag.js script src is present
    const gtagScript = container.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    expect(gtagScript).toBeInTheDocument();
    expect(gtagScript?.getAttribute('src')).toContain('G-TEST123');

    // Cleanup
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  });
});
