import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <h1 className="gradient-text text-display font-bold tracking-tight">404</h1>
      <p className="text-text-secondary mt-4 text-lg">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="from-accent-blue to-accent-teal hover:glow-blue mt-8 rounded-full bg-gradient-to-r px-8 py-3 font-semibold text-white transition-all hover:scale-105"
      >
        Go Home
      </Link>
    </main>
  );
}
