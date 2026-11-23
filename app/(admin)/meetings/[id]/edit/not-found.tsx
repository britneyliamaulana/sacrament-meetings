
import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-3xl font-bold text-blue-950">
        Meeting Not Found
      </h1>

      <p className="mt-4 max-w-md text-gray-600">
        The meeting you are trying to edit does not exist or may have
        been deleted.
      </p>

      <Link
        href="/meetings"
        className="mt-6 rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Return to Meetings
      </Link>
    </main>
  );
}
