import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Hero } from '../Hero';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Hero', () => {
  afterEach(cleanup);

  it('renders the heading', () => {
    render(<Hero heading="Voice AI for Everyone" />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Voice AI for Everyone' })
    ).toBeInTheDocument();
  });

  it('renders the subheading when provided', () => {
    render(
      <Hero
        heading="Voice AI for Everyone"
        subheading="Automate phone calls with intelligent voice agents"
      />
    );
    expect(
      screen.getByText('Automate phone calls with intelligent voice agents')
    ).toBeInTheDocument();
  });

  it('does not render subheading when omitted', () => {
    const { container } = render(<Hero heading="Voice AI for Everyone" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(0);
  });

  it('renders CTA link with correct href and text', () => {
    render(<Hero heading="Voice AI" ctaText="Get Started" ctaLink="/schedule" />);
    const link = screen.getByRole('link', { name: 'Get Started' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/schedule');
  });

  it('does not render CTA when ctaText or ctaLink is missing', () => {
    render(<Hero heading="Voice AI" ctaText="Get Started" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies gradient mesh classes for product variant', () => {
    const { container } = render(<Hero heading="Voice AI" variant="product" />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('before:bg-[radial-gradient');
  });
});
