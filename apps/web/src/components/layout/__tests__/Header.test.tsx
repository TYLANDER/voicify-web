import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Header } from '../Header';

vi.mock('next/link', () => {
  const React = require('react');
  return {
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
      React.createElement('a', { href, ...props }, children),
  };
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(
        (
          { children, className, ...props }: React.HTMLAttributes<HTMLDivElement>,
          ref: React.Ref<HTMLDivElement>
        ) => React.createElement('div', { ref, className, ...props }, children)
      ),
    },
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

afterEach(() => {
  cleanup();
});

describe('Header', () => {
  it('renders the Voicify logo', () => {
    render(<Header />);
    expect(screen.getByText('Voicify')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header />);
    expect(screen.getByText('Industry Solutions')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders Schedule a Meeting CTA link', () => {
    render(<Header />);
    const ctaLink = screen.getByRole('link', {
      name: /schedule a meeting/i,
    });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', '/schedule');
  });

  it('renders a mobile menu toggle button', () => {
    render(<Header />);
    const toggleButton = screen.getByLabelText(/open menu/i);
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const openButton = screen.getByLabelText(/open menu/i);
    await user.click(openButton);

    // After clicking, close buttons appear (one in header toggle, one in MobileNav overlay)
    const closeButtons = screen.getAllByLabelText(/close menu/i);
    expect(closeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('links logo to homepage', () => {
    render(<Header />);
    const logoLink = screen.getByText('Voicify').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
