'use client';

import { useState, useId, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { trackFormSubmission } from '@/components/analytics/event-tracking';

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const SUBJECT_OPTIONS = ['General Inquiry', 'Partnership', 'Support', 'Other'] as const;

const inputBaseClasses = cn(
  'w-full rounded-lg border border-border-subtle bg-white/[0.04] px-4 py-3',
  'text-text-primary placeholder:text-text-muted',
  'outline-none transition-all duration-normal',
  'focus:border-accent-blue/50 focus:bg-white/[0.06]',
  'focus:ring-2 focus:ring-accent-blue/20',
  'hover:border-border-hover'
);

const labelClasses = 'mb-1.5 block text-sm font-medium text-text-secondary';

const errorSlideVariants = {
  initial: { opacity: 0, y: -4, height: 0 },
  animate: { opacity: 1, y: 0, height: 'auto' },
  exit: { opacity: 0, y: -4, height: 0 },
};

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ id, label, error, required, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && (
          <span className="ml-0.5 text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            variants={errorSlideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1.5 text-sm text-red-400"
            role="alert"
            id={`${id}-error`}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '' as string,
    message: '',
  });

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FieldErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const endpoint = process.env.NEXT_PUBLIC_FORM_ACTION_URL;

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data),
        });
      } else {
        // Demo mode: simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      trackFormSubmission('contact');
      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center py-16 text-center"
        role="status"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-accent-teal/20 mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        >
          <Check className="text-accent-teal h-8 w-8" aria-hidden="true" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-text-primary mb-2 text-2xl font-semibold"
        >
          Thank you!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-text-secondary"
        >
          We&apos;ve received your message and will get back to you shortly.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact us">
      {/* Name */}
      <FormField id={`${formId}-name`} label="Name" error={errors.name} required>
        <input
          id={`${formId}-name`}
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={cn(inputBaseClasses, errors.name && 'border-red-400/50')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          autoComplete="name"
        />
      </FormField>

      {/* Email */}
      <FormField id={`${formId}-email`} label="Email" error={errors.email} required>
        <input
          id={`${formId}-email`}
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={cn(inputBaseClasses, errors.email && 'border-red-400/50')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          autoComplete="email"
        />
      </FormField>

      {/* Subject */}
      <FormField id={`${formId}-subject`} label="Subject" error={errors.subject}>
        <div className="relative">
          <select
            id={`${formId}-subject`}
            value={formData.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            className={cn(
              inputBaseClasses,
              'appearance-none pr-10',
              !formData.subject && 'text-text-muted',
              errors.subject && 'border-red-400/50'
            )}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-bg-secondary text-text-primary">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="text-text-muted pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
            aria-hidden="true"
          />
        </div>
      </FormField>

      {/* Message */}
      <FormField id={`${formId}-message`} label="Message" error={errors.message} required>
        <textarea
          id={`${formId}-message`}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          rows={5}
          className={cn(inputBaseClasses, 'resize-y', errors.message && 'border-red-400/50')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
        />
      </FormField>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'relative w-full rounded-lg px-6 py-3 text-sm font-semibold text-white',
          'from-accent-blue to-accent-teal bg-gradient-to-r',
          'duration-normal transition-all',
          'hover:shadow-[0_0_24px_rgba(59,130,246,0.25)] hover:brightness-110',
          'focus-visible:outline-accent-blue focus-visible:outline-2 focus-visible:outline-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60'
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
