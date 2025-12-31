'use client';
import React from 'react';

export default function UserError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8 dark:bg-gray-900 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
        Something went wrong.
      </h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        An unexpected error occurred. Please try refreshing the page or contact support if the
        problem persists.
      </p>
      <details className="mt-2 text-xs text-gray-500 dark:text-gray-400">{error.message}</details>
      <button
        className="mt-6 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
