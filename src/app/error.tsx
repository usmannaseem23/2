'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-700 mb-6">
          We apologize for the inconvenience. Please try again or contact support if the issue
          persists.
        </p>
        <button
          onClick={reset}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}