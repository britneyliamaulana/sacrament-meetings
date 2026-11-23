
"use client";

import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h2 className="text-2xl font-bold text-blue-950">
        Something went wrong!
      </h2>

      <p className="mt-4 max-w-md text-gray-600">
        We couldn&apos;t complete your meeting request. Please try again.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-blue-950 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}
