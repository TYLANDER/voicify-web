import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Footer } from '../Footer';

vi.mock('next/link', () => {
  const React = require('react');
  return {
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
      React.createElement('a', { href, ...props }, children),
  };
});

afterEach(() => {
  cleanup();
});

describe('Footer', () => {
  it('renders footer element with contentinfo role', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders all footer column titles', () => {
    render(<Footer />);
    expect(screen.getByText('Current Clients')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('How Voicify Works')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders footer navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Knowledge Center')).toBeInTheDocument();
    expect(screen.getByText('Voice AI Answering')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders compliance badges', () => {
    render(<Footer />);
    expect(screen.getByText('SOC 2')).toBeInTheDocument();
    expect(screen.getByText('PCI')).toBeInTheDocument();
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
    expect(screen.getByText('HIPAA')).toBeInTheDocument();
  });

  it('renders company info', () => {
    render(<Footer />);
    expect(screen.getByText('117 Kendrick St, Suite 300, Needham, MA 02494')).toBeInTheDocument();
    expect(screen.getByText('888-910-6525')).toBeInTheDocument();
    expect(screen.getByText('info@voicify.com')).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}.*Voicify, LLC`))).toBeInTheDocument();
  });

  it('renders the Voicify logo linking to homepage', () => {
    render(<Footer />);
    const logoLinks = screen.getAllByText('Voicify');
    const footerLogo = logoLinks.find((el) => el.closest('a')?.getAttribute('href') === '/');
    expect(footerLogo).toBeDefined();
  });
});
