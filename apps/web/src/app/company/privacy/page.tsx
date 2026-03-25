import type { Metadata } from 'next';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy is a top priority of our voice experience platform.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-bg-primary py-section px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h1 className="text-h1 text-text-primary font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-text-muted mt-2 text-sm">Last updated: October 22, 2024</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="text-text-secondary mt-12 space-y-8 leading-relaxed">
            <section>
              <h2 className="text-h3 text-text-primary font-semibold">Introduction</h2>
              <p className="mt-4">
                Voicify, LLC (&quot;Voicify,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) is committed to protecting and respecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you use our voice experience platform and related services.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary font-semibold">Information We Collect</h2>
              <p className="mt-4">
                We may collect personal information that you voluntarily provide to us when you
                register for an account, express interest in obtaining information about us or our
                products and services, participate in activities on our platform, or otherwise
                contact us.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary font-semibold">
                How We Use Your Information
              </h2>
              <p className="mt-4">
                We use personal information collected via our platform for a variety of business
                purposes including: providing and managing your account, responding to your
                inquiries, sending you marketing and promotional communications (with your consent),
                and for other business purposes such as data analysis, identifying usage trends, and
                improving our services.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary font-semibold">Security</h2>
              <p className="mt-4">
                We use administrative, technical, and physical security measures to protect your
                personal information. Our platform is SOC 2, PCI, ISO 27001, and HIPAA compliant,
                ensuring the highest standards of data protection and privacy.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary font-semibold">Contact Us</h2>
              <p className="mt-4">
                If you have questions or comments about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:info@voicify.com" className="text-accent-blue hover:underline">
                  info@voicify.com
                </a>
              </p>
              <p className="mt-2">
                Voicify, LLC
                <br />
                117 Kendrick St, Suite 300
                <br />
                Needham, MA 02494
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
