export const instant = false;
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import Image from "next/image";

export default async function MeetingsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/meetings`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-10">
  <Image
    src="/meeting-hero.jpg"
    alt="Sacrament meeting program"
    width={1200}
    height={500}
    priority
    className="h-64 w-full rounded-xl object-cover"
  />
  </section>
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-950">
          All Sacrament Meetings
        </h1>

        <p className="mt-3 text-gray-600">
          Browse and review current and past meeting programs.
        </p>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-blue-950">
            Scheduled Meetings
          </h2>

          <p className="text-sm text-gray-500">
            {meetings.length} meetings scheduled
          </p>
        </div>

        {meetings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
            No meetings have been scheduled yet.
          </p>
        )}
      </section>
    </main>
  );
}