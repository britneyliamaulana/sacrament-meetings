import type { SacramentMeeting } from "@/lib/types";
import PrintButton from "@/components/PrintButton";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex justify-end">
    <PrintButton />
    </div>
      <header className="mb-6 border-b pb-4 text-center">
        <h1 className="text-3xl font-bold text-blue-950">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-gray-600">{meeting.date}</p>

        <p className="mt-1 font-medium capitalize text-blue-900">
          {meeting.meetingType} Meeting
        </p>
      </header>

      <section className="space-y-5">
        <div>
          <h2 className="font-semibold text-blue-950">Presiding</h2>
          <p>{meeting.presiding}</p>
        </div>

        <div>
          <h2 className="font-semibold text-blue-950">Conducting</h2>
          <p>{meeting.conducting}</p>
        </div>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <div>
            <h2 className="font-semibold text-blue-950">Announcements</h2>
            <ul className="list-inside list-disc">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-blue-950">Opening Hymn</h2>
          <p>
            #{meeting.openingHymn.number} - {meeting.openingHymn.title}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-blue-950">Opening Prayer</h2>
          <p>{meeting.openingPrayer}</p>
        </div>

        <div>
          <h2 className="font-semibold text-blue-950">Ward Business</h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-inside list-disc">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No ward business.</p>
          )}
        </div>

        {meeting.stakeBusiness && (
          <p className="font-medium text-blue-900">
            Stake business will be presented.
          </p>
        )}

        <div>
          <h2 className="font-semibold text-blue-950">Sacrament Hymn</h2>
          <p>
            #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-blue-950">Speakers & Musical Numbers</h2>
          {meeting.speakers.length > 0 ? (
            <ul className="space-y-3">
              {meeting.speakers.map((item, index) => (
                <li key={index}>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">{item.topic}</p>
                  <p className="text-sm capitalize text-gray-500">
                    {item.type.replace("-", " ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No speakers scheduled.</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-blue-950">Closing Hymn</h2>
          <p>
            #{meeting.closingHymn.number} - {meeting.closingHymn.title}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-blue-950">Closing Prayer</h2>
          <p>{meeting.closingPrayer}</p>
        </div>
      </section>
    </article>
  );
}
