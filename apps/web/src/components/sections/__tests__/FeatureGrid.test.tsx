import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { FeatureGrid } from '../FeatureGrid';

// Mock DynamicIcon since it imports all of lucide-react
vi.mock('../DynamicIcon', () => ({
  DynamicIcon: ({ name, className }: any) => (
    <svg data-testid={`icon-${name}`} className={className} />
  ),
}));

const features = [
  { icon: 'Phone', title: 'AI Answering', description: 'Answer calls 24/7' },
  { icon: 'ShoppingCart', title: 'AI Ordering', description: 'Take orders by phone' },
  { title: 'Custom Solutions', description: 'Built for your industry' },
];

describe('FeatureGrid', () => {
  afterEach(cleanup);

  it('renders the correct number of feature cards', () => {
    render(<FeatureGrid features={features} />);
    const titles = features.map((f) => screen.getByText(f.title));
    expect(titles).toHaveLength(3);
  });

  it('shows feature titles and descriptions', () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getByText('AI Answering')).toBeInTheDocument();
    expect(screen.getByText('Answer calls 24/7')).toBeInTheDocument();
    expect(screen.getByText('AI Ordering')).toBeInTheDocument();
    expect(screen.getByText('Take orders by phone')).toBeInTheDocument();
  });

  it('renders icons when provided', () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getByTestId('icon-Phone')).toBeInTheDocument();
    expect(screen.getByTestId('icon-ShoppingCart')).toBeInTheDocument();
  });

  it('does not render icon when not provided', () => {
    render(<FeatureGrid features={[features[2]]} />);
    expect(screen.queryByTestId(/^icon-/)).not.toBeInTheDocument();
  });

  it('applies correct column classes for 2-column layout', () => {
    const { container } = render(<FeatureGrid features={features} columns={2} />);
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('md:grid-cols-2');
    expect(grid?.className).not.toContain('lg:grid-cols-3');
  });

  it('applies correct column classes for 4-column layout', () => {
    const { container } = render(<FeatureGrid features={features} columns={4} />);
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('lg:grid-cols-4');
  });
});
