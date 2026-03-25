import { describe, it, expect } from 'vitest';
import { scheduleFormSchema, contactFormSchema } from '@/lib/schemas';

describe('scheduleFormSchema', () => {
  const validData = {
    companyName: 'Acme Corp',
    email: 'jane@acme.com',
    firstName: 'Jane',
    lastName: 'Doe',
    jobTitle: 'CTO',
    communicationConsent: false,
    dataProcessingConsent: true as const,
  };

  it('validates correct data', () => {
    const result = scheduleFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const result = scheduleFormSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('companyName');
      expect(paths).toContain('email');
      expect(paths).toContain('firstName');
      expect(paths).toContain('lastName');
      expect(paths).toContain('jobTitle');
    }
  });

  it('rejects invalid email', () => {
    const result = scheduleFormSchema.safeParse({
      ...validData,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address');
    }
  });

  it('rejects when dataProcessingConsent is false', () => {
    const result = scheduleFormSchema.safeParse({
      ...validData,
      dataProcessingConsent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('You must agree to data processing to continue');
    }
  });

  it('allows communicationConsent to be false', () => {
    const result = scheduleFormSchema.safeParse({
      ...validData,
      communicationConsent: false,
    });
    expect(result.success).toBe(true);
  });
});

describe('contactFormSchema', () => {
  const validData = {
    name: 'Jane Doe',
    email: 'jane@acme.com',
    subject: 'General Inquiry' as const,
    message: 'Hello, I have a question about your platform.',
  };

  it('validates correct data', () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const result = contactFormSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('name');
      expect(paths).toContain('email');
      expect(paths).toContain('message');
    }
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      email: 'bad-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid subject', () => {
    const result = contactFormSchema.safeParse({
      ...validData,
      subject: 'Invalid Subject',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please select a subject');
    }
  });

  it('accepts all valid subject options', () => {
    for (const subject of ['General Inquiry', 'Partnership', 'Support', 'Other']) {
      const result = contactFormSchema.safeParse({ ...validData, subject });
      expect(result.success).toBe(true);
    }
  });
});
