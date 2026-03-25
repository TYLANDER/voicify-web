import { z } from 'zod';

export const scheduleFormSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must be 200 characters or fewer'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be 100 characters or fewer'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be 100 characters or fewer'),
  jobTitle: z
    .string()
    .min(1, 'Job title is required')
    .max(150, 'Job title must be 150 characters or fewer'),
  communicationConsent: z.boolean().default(false),
  dataProcessingConsent: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to data processing to continue',
    }),
  }),
});

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be 200 characters or fewer'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  subject: z.enum(['General Inquiry', 'Partnership', 'Support', 'Other'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message must be 5000 characters or fewer'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
