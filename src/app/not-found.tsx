import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn btn-primary mt-8"
      >
        Back to home
      </Link>
    </div>
  );
}
