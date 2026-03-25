import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ComplianceBadges } from '../ComplianceBadges';

// Mock DynamicIcon since it imports all of lucide-react
vi.mock('../DynamicIcon', () => ({
  DynamicIcon: ({ name, className }: any) => (
    <svg data-testid={`icon-${name}`} className={className} />
  ),
}));

const badges = [
  { name: 'SOC 2', icon: 'Shield' },
  { name: 'PCI', icon: 'CreditCard' },
  { name: 'ISO 27001', icon: 'Lock' },
  { name: 'HIPAA', icon: 'HeartPulse' },
];

describe('ComplianceBadges', () => {
  afterEach(cleanup);

  it('renders all badge names', () => {
    render(<ComplianceBadges badges={badges} />);
    expect(screen.getByText('SOC 2')).toBeInTheDocument();
    expect(screen.getByText('PCI')).toBeInTheDocument();
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
    expect(screen.getByText('HIPAA')).toBeInTheDocument();
  });

  it('renders icons for each badge', () => {
    render(<ComplianceBadges badges={badges} />);
    expect(screen.getByTestId('icon-Shield')).toBeInTheDocument();
    expect(screen.getByTestId('icon-CreditCard')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Lock')).toBeInTheDocument();
    expect(screen.getByTestId('icon-HeartPulse')).toBeInTheDocument();
  });

  it('uses default complianceBadges from constants when no badges prop', () => {
    render(<ComplianceBadges />);
    // Default badges from constants include SOC 2
    expect(screen.getByText('SOC 2')).toBeInTheDocument();
  });
});
