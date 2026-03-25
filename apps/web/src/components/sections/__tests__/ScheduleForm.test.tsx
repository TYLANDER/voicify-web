import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScheduleForm } from '../ScheduleForm';

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

describe('ScheduleForm', () => {
  it('renders all form fields', () => {
    render(<ScheduleForm />);

    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to receive other communications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to allow voicify to store/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /schedule a meeting/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<ScheduleForm />);

    await user.click(screen.getByRole('button', { name: /schedule a meeting/i }));

    await waitFor(() => {
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/job title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/you must agree to data processing/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ScheduleForm />);

    await user.type(screen.getByLabelText(/^email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /schedule a meeting/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('requires data processing consent', async () => {
    const user = userEvent.setup();
    render(<ScheduleForm />);

    // Fill all fields except consent
    await user.type(screen.getByLabelText(/company name/i), 'Acme');
    await user.type(screen.getByLabelText(/^email/i), 'jane@acme.com');
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/job title/i), 'CTO');

    await user.click(screen.getByRole('button', { name: /schedule a meeting/i }));

    await waitFor(() => {
      expect(screen.getByText(/you must agree to data processing/i)).toBeInTheDocument();
    });
  });

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup();
    render(<ScheduleForm />);

    await user.type(screen.getByLabelText(/company name/i), 'Acme');
    await user.type(screen.getByLabelText(/^email/i), 'jane@acme.com');
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/job title/i), 'CTO');
    await user.click(screen.getByLabelText(/i agree to allow voicify to store/i));

    await user.click(screen.getByRole('button', { name: /schedule a meeting/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  it('renders the privacy notice', () => {
    render(<ScheduleForm />);

    expect(screen.getByText(/you may unsubscribe from these communications/i)).toBeInTheDocument();
  });
});
