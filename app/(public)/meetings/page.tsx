
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

export const instant = false;

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query ?? "";
  const currentPage = Math.max(
    1,
    Number.parseInt(params.page ?? "1", 10) || 1
  );

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-950">
          All Sacrament Meetings
        </h1>

        <p className="mt-3 text-gray-600">
          Browse and review current and past meeting programs.
        </p>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-blue-950">
            Scheduled Meetings
          </h2>

          <MeetingSearch query={query} />
        </div>

        <p className="mb-6 text-sm text-gray-700">
          {query
            ? `Search results for "${query}" — ${meetings.length} meetings shown`
            : `${meetings.length} meetings shown`}
        </p>

        {meetings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              query={query}
            />
          </>
        ) : (
          <p className="rounded-lg bg-gray-50 p-8 text-center text-gray-700">
            No meetings found.
          </p>
        )}
      </section>
    </main>
  );
}
