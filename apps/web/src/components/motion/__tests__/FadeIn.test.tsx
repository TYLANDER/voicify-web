import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { FadeIn } from '../FadeIn';

vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(
        (
          { children, className, ...props }: React.HTMLAttributes<HTMLDivElement>,
          ref: React.Ref<HTMLDivElement>
        ) =>
          React.createElement(
            'div',
            { ref, className, 'data-testid': 'motion-div', ...props },
            children
          )
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

describe('FadeIn', () => {
  it('renders children', () => {
    render(
      <FadeIn>
        <p>Hello world</p>
      </FadeIn>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <FadeIn className="custom-class">
        <p>Content</p>
      </FadeIn>
    );
    const wrapper = screen.getByTestId('motion-div');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders with different directions', () => {
    const directions = ['up', 'down', 'left', 'right', 'none'] as const;
    for (const direction of directions) {
      const { unmount } = render(
        <FadeIn direction={direction}>
          <p>Direction: {direction}</p>
        </FadeIn>
      );
      expect(screen.getByText(`Direction: ${direction}`)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders without crashing with custom delay and duration', () => {
    render(
      <FadeIn delay={0.3} duration={1}>
        <p>Delayed content</p>
      </FadeIn>
    );
    expect(screen.getByText('Delayed content')).toBeInTheDocument();
  });
});
