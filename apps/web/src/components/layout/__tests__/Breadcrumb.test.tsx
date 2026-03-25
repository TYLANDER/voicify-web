import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { Breadcrumb } from '../Breadcrumb';

vi.mock('next/link', () => {
  const React = require('react');
  return {
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
      React.createElement('a', { href, ...props }, children),
  };
});

let currentPathname = '/';
vi.mock('next/navigation', () => ({
  usePathname: () => currentPathname,
}));

afterEach(() => {
  cleanup();
});

describe('Breadcrumb', () => {
  it('returns null on the homepage', () => {
    currentPathname = '/';
    const { container } = render(<Breadcrumb />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Home link and current page for a simple path', () => {
    currentPathname = '/contact';
    render(<Breadcrumb />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('generates correct segments for nested paths', () => {
    currentPathname = '/industries/restaurants';
    render(<Breadcrumb />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Industries')).toBeInTheDocument();
    expect(screen.getByText('Restaurants')).toBeInTheDocument();

    // Industries should be a link
    const industriesLink = screen.getByText('Industries').closest('a');
    expect(industriesLink).toHaveAttribute('href', '/industries');

    // Restaurants is the last segment, should not be a link
    const restaurants = screen.getByText('Restaurants');
    expect(restaurants.closest('a')).toBeNull();
    expect(restaurants).toHaveAttribute('aria-current', 'page');
  });

  it('formats hyphenated segments into title case', () => {
    currentPathname = '/company/about-us';
    render(<Breadcrumb />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('has breadcrumb navigation role', () => {
    currentPathname = '/contact';
    render(<Breadcrumb />);

    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    currentPathname = '/contact';
    render(<Breadcrumb className="my-breadcrumb" />);

    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toHaveClass('my-breadcrumb');
  });
});
