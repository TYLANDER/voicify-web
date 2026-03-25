'use client';

import { useState, useId, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scheduleFormSchema, type ScheduleFormData } from '@/lib/schemas';
import { trackFormSubmission } from '@/components/analytics/event-tracking';

type FieldErrors = Partial<Record<keyof ScheduleFormData, string>>;

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

export function ScheduleForm() {
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    communicationConsent: false,
    dataProcessingConsent: false,
  });

  function updateField(field: keyof typeof formData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
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

    const result = scheduleFormSchema.safeParse(formData);

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

      trackFormSubmission('schedule');
      setIsSuccess(true);
    } catch {
      // Still show success in case of network error for demo
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
          We&apos;ll be in touch soon to schedule your meeting.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Schedule a meeting">
      {/* Company Name */}
      <FormField
        id={`${formId}-companyName`}
        label="Company Name"
        error={errors.companyName}
        required
      >
        <input
          id={`${formId}-companyName`}
          type="text"
          value={formData.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          className={cn(inputBaseClasses, errors.companyName && 'border-red-400/50')}
          aria-invalid={!!errors.companyName}
          aria-describedby={errors.companyName ? `${formId}-companyName-error` : undefined}
          autoComplete="organization"
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

      {/* First Name + Last Name */}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={`${formId}-firstName`} label="First Name" error={errors.firstName} required>
          <input
            id={`${formId}-firstName`}
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className={cn(inputBaseClasses, errors.firstName && 'border-red-400/50')}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? `${formId}-firstName-error` : undefined}
            autoComplete="given-name"
          />
        </FormField>

        <FormField id={`${formId}-lastName`} label="Last Name" error={errors.lastName} required>
          <input
            id={`${formId}-lastName`}
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className={cn(inputBaseClasses, errors.lastName && 'border-red-400/50')}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? `${formId}-lastName-error` : undefined}
            autoComplete="family-name"
          />
        </FormField>
      </div>

      {/* Job Title */}
      <FormField id={`${formId}-jobTitle`} label="Job Title" error={errors.jobTitle} required>
        <input
          id={`${formId}-jobTitle`}
          type="text"
          value={formData.jobTitle}
          onChange={(e) => updateField('jobTitle', e.target.value)}
          className={cn(inputBaseClasses, errors.jobTitle && 'border-red-400/50')}
          aria-invalid={!!errors.jobTitle}
          aria-describedby={errors.jobTitle ? `${formId}-jobTitle-error` : undefined}
          autoComplete="organization-title"
        />
      </FormField>

      {/* Communication Consent */}
      <div className="flex items-start gap-3">
        <input
          id={`${formId}-communicationConsent`}
          type="checkbox"
          checked={formData.communicationConsent}
          onChange={(e) => updateField('communicationConsent', e.target.checked)}
          className="border-border-subtle text-accent-blue accent-accent-blue mt-1 h-4 w-4 shrink-0 rounded bg-white/[0.04]"
        />
        <label htmlFor={`${formId}-communicationConsent`} className="text-text-secondary text-sm">
          I agree to receive other communications from Voicify.
        </label>
      </div>

      {/* Data Processing Consent */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-dataProcessingConsent`}
            type="checkbox"
            checked={formData.dataProcessingConsent}
            onChange={(e) => updateField('dataProcessingConsent', e.target.checked)}
            className="border-border-subtle text-accent-blue accent-accent-blue mt-1 h-4 w-4 shrink-0 rounded bg-white/[0.04]"
            aria-invalid={!!errors.dataProcessingConsent}
            aria-describedby={
              errors.dataProcessingConsent ? `${formId}-dataProcessingConsent-error` : undefined
            }
          />
          <label
            htmlFor={`${formId}-dataProcessingConsent`}
            className="text-text-secondary text-sm"
          >
            I agree to allow Voicify to store and process my personal data.
            <span className="ml-0.5 text-red-400" aria-hidden="true">
              *
            </span>
          </label>
        </div>
        <AnimatePresence mode="wait">
          {errors.dataProcessingConsent && (
            <motion.p
              key={errors.dataProcessingConsent}
              variants={errorSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-1.5 ml-7 text-sm text-red-400"
              role="alert"
              id={`${formId}-dataProcessingConsent-error`}
            >
              {errors.dataProcessingConsent}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

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
            Submitting...
          </span>
        ) : (
          'Schedule a Meeting'
        )}
      </button>

      {/* Privacy notice */}
      <p className="text-text-muted text-xs leading-relaxed">
        You may unsubscribe from these communications at any time. For more information on how to
        unsubscribe, our privacy practices, and how we are committed to protecting and respecting
        your privacy, please review our Privacy Policy.
      </p>
    </form>
  );
}
