import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { StaggerChildren } from '../StaggerChildren';

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

describe('StaggerChildren', () => {
  it('renders all children', () => {
    render(
      <StaggerChildren>
        <p>Child 1</p>
        <p>Child 2</p>
        <p>Child 3</p>
      </StaggerChildren>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('wraps each child in a motion.div', () => {
    render(
      <StaggerChildren>
        <p>A</p>
        <p>B</p>
      </StaggerChildren>
    );
    // Parent container + 2 children = 3 motion.divs
    const motionDivs = screen.getAllByTestId('motion-div');
    expect(motionDivs).toHaveLength(3);
  });

  it('applies custom className to container', () => {
    render(
      <StaggerChildren className="stagger-container">
        <p>Content</p>
      </StaggerChildren>
    );
    const motionDivs = screen.getAllByTestId('motion-div');
    // The first motion.div is the container
    expect(motionDivs[0]).toHaveClass('stagger-container');
  });

  it('accepts custom staggerDelay', () => {
    render(
      <StaggerChildren staggerDelay={0.1}>
        <p>Item</p>
      </StaggerChildren>
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });
});
