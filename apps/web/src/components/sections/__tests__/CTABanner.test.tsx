import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CTABanner } from '../CTABanner';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('CTABanner', () => {
  afterEach(cleanup);

  it('renders heading text', () => {
    render(
      <CTABanner
        heading="Ready to transform your business?"
        buttonText="Schedule a Demo"
        buttonLink="/schedule"
      />
    );
    expect(screen.getByText('Ready to transform your business?')).toBeInTheDocument();
  });

  it('renders button with correct text and href', () => {
    render(<CTABanner heading="Get Started" buttonText="Schedule a Demo" buttonLink="/schedule" />);
    const link = screen.getByRole('link', { name: 'Schedule a Demo' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/schedule');
  });

  it('applies primary variant styles by default', () => {
    const { container } = render(
      <CTABanner heading="Get Started" buttonText="Go" buttonLink="/go" />
    );
    const banner = container.querySelector('section > div');
    expect(banner?.className).toContain('glow-blue');
  });

  it('applies subtle variant styles when specified', () => {
    const { container } = render(
      <CTABanner heading="Get Started" buttonText="Go" buttonLink="/go" variant="subtle" />
    );
    const banner = container.querySelector('section > div');
    expect(banner?.className).toContain('glass');
  });
});
