import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="w-full max-w-xl px-4 py-16 bg-background rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-4">
          404 – Page Not Found
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-300 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </main>
    </div>
  );
}
