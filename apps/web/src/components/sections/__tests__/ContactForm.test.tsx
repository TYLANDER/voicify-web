import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const safeProps = Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            ![
              'initial',
              'animate',
              'exit',
              'variants',
              'transition',
              'whileInView',
              'viewport',
            ].includes(key)
        )
      );
      return <div {...safeProps}>{children}</div>;
    },
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const safeProps = Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            ![
              'initial',
              'animate',
              'exit',
              'variants',
              'transition',
              'whileInView',
              'viewport',
            ].includes(key)
        )
      );
      return <p {...safeProps}>{children}</p>;
    },
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const safeProps = Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            ![
              'initial',
              'animate',
              'exit',
              'variants',
              'transition',
              'whileInView',
              'viewport',
            ].includes(key)
        )
      );
      return <h3 {...safeProps}>{children}</h3>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useReducedMotion: () => true,
}));

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^email/i), 'bad-email');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('renders subject dropdown with all options', () => {
    render(<ContactForm />);

    const select = screen.getByLabelText(/subject/i);
    expect(select).toBeInTheDocument();

    const options = select.querySelectorAll('option');
    // placeholder + 4 options
    expect(options).toHaveLength(5);
    expect(options[1].textContent).toBe('General Inquiry');
    expect(options[2].textContent).toBe('Partnership');
    expect(options[3].textContent).toBe('Support');
    expect(options[4].textContent).toBe('Other');
  });

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^email/i), 'jane@acme.com');
    await user.selectOptions(screen.getByLabelText(/subject/i), 'Support');
    await user.type(screen.getByLabelText(/message/i), 'I need help with my account.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
