
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-blue-950">
            {formattedDate}
          </h2>

          <p className="text-sm text-gray-500 mt-1 capitalize">
            {meeting.meetingType} Meeting
          </p>
        </div>

        <span className="text-xs font-medium bg-blue-100 text-blue-900 px-3 py-1 rounded-full h-fit">
          Meeting #{meeting.id}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-gray-700">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p>
          <strong>Speakers:</strong> {meeting.speakers.length}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block mt-6 text-blue-900 font-semibold text-sm hover:underline"
      >
        View Meeting Program →
      </Link>
    </article>
  );
}
