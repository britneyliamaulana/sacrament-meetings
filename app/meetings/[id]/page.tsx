export const instant = false;

import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/meetings/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 400 || response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }

  const meeting: SacramentMeeting = await response.json();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}