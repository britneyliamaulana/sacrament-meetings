
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MeetingType } from "@/lib/types";

export default function MeetingForm() {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [meetingType, setMeetingType] =
    useState<MeetingType>("regular");
  const [presiding, setPresiding] = useState("");
  const [conducting, setConducting] = useState("");

  const [openingHymnNumber, setOpeningHymnNumber] = useState("");
  const [openingHymnTitle, setOpeningHymnTitle] = useState("");
  const [openingPrayer, setOpeningPrayer] = useState("");

  const [sacramentHymnNumber, setSacramentHymnNumber] = useState("");
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState("");

  const [closingHymnNumber, setClosingHymnNumber] = useState("");
  const [closingHymnTitle, setClosingHymnTitle] = useState("");
  const [closingPrayer, setClosingPrayer] = useState("");

  const [announcements, setAnnouncements] = useState<string[]>([""]);
  const [wardBusiness, setWardBusiness] = useState<string[]>([""]);
  const [stakeBusiness, setStakeBusiness] = useState(false);
  const [speakers, setSpeakers] = useState([
  { name: "", topic: "", type: "speaker" as "speaker" | "musical-number" },
]);

function updateAnnouncement(index: number, value: string) {
  setAnnouncements((current) =>
    current.map((item, i) => (i === index ? value : item))
  );
}

function addAnnouncement() {
  setAnnouncements((current) => [...current, ""]);
}

function updateWardBusiness(index: number, value: string) {
  setWardBusiness((current) =>
    current.map((item, i) => (i === index ? value : item))
  );
}

function addWardBusiness() {
  setWardBusiness((current) => [...current, ""]);
}

function updateSpeaker(
  index: number,
  field: "name" | "topic" | "type",
  value: string
) {
  setSpeakers((current) =>
    current.map((speaker, i) =>
      i === index ? { ...speaker, [field]: value } : speaker
    )
  );
}

function addSpeaker() {
  setSpeakers((current) => [
    ...current,
    { name: "", topic: "", type: "speaker" },
  ]);
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const meetingDetails = {
    date,
    meetingType,
    presiding,
    conducting,

    announcements: announcements.filter(
      (item) => item.trim() !== ""
    ),

    openingHymn: {
      number: Number(openingHymnNumber),
      title: openingHymnTitle,
    },
    openingPrayer,

    wardBusiness: wardBusiness
      .filter((item) => item.trim() !== "")
      .map((description) => ({ description })),

    stakeBusiness,

    sacramentHymn: {
      number: Number(sacramentHymnNumber),
      title: sacramentHymnTitle,
    },

    speakers: speakers.filter(
    (speaker) => speaker.name.trim() !== ""
    ),

    closingHymn: {
      number: Number(closingHymnNumber),
      title: closingHymnTitle,
    },
    closingPrayer,
  };

 try {
  const response = await fetch("/api/meetings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meetingDetails),
  });

  if (!response.ok) {
    throw new Error("Failed to create meeting");
  }

  const newMeeting = await response.json();

  router.push(`/meetings/${newMeeting.id}`);
} catch (error) {
  console.error("Error creating meeting:", error);
  alert("Something went wrong while creating the meeting.");
}
}

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-8 rounded-xl bg-white p-8 shadow-md"
    >
      <div>
        <h1 className="text-2xl font-bold text-blue-950">
          Create New Meeting
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter the details for your sacrament meeting.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
          Meeting Details
        </h2>

        <div>
          <label htmlFor="date" className="mb-2 block font-medium">
            Meeting Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div>
          <label htmlFor="meetingType" className="mb-2 block font-medium">
            Meeting Type
          </label>
          <select
            id="meetingType"
            value={meetingType}
            onChange={(event) =>
              setMeetingType(event.target.value as MeetingType)
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
        </div>

        <div>
          <label htmlFor="presiding" className="mb-2 block font-medium">
            Presiding
          </label>
          <input
            id="presiding"
            type="text"
            value={presiding}
            onChange={(event) => setPresiding(event.target.value)}
            required
            placeholder="Enter presiding officer"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div>
          <label htmlFor="conducting" className="mb-2 block font-medium">
            Conducting
          </label>
          <input
            id="conducting"
            type="text"
            value={conducting}
            onChange={(event) => setConducting(event.target.value)}
            required
            placeholder="Enter conducting officer"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>
      </section>


<section className="space-y-4">
  <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
    Announcements
  </h2>

  {announcements.map((announcement, index) => (
    <div key={index}>
      <label
        htmlFor={`announcement-${index}`}
        className="mb-2 block font-medium"
      >
        Announcement {index + 1}
      </label>
      <input
        id={`announcement-${index}`}
        type="text"
        value={announcement}
        onChange={(event) =>
          updateAnnouncement(index, event.target.value)
        }
        placeholder="Enter an announcement"
        className="w-full rounded-lg border border-gray-300 p-3"
      />
    </div>
  ))}

  <button
    type="button"
    onClick={addAnnouncement}
    className="text-sm font-semibold text-blue-900 hover:underline"
  >
    + Add another announcement
  </button>
</section>

<section className="space-y-4">
  <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
    Ward and Stake Business
  </h2>

  {wardBusiness.map((item, index) => (
    <div key={index}>
      <label
        htmlFor={`ward-business-${index}`}
        className="mb-2 block font-medium"
      >
        Ward Business Item {index + 1}
      </label>
      <input
        id={`ward-business-${index}`}
        type="text"
        value={item}
        onChange={(event) =>
          updateWardBusiness(index, event.target.value)
        }
        placeholder="Enter ward business"
        className="w-full rounded-lg border border-gray-300 p-3"
      />
    </div>
  ))}

  <button
    type="button"
    onClick={addWardBusiness}
    className="text-sm font-semibold text-blue-900 hover:underline"
  >
    + Add another ward business item
  </button>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={stakeBusiness}
      onChange={(event) => setStakeBusiness(event.target.checked)}
      className="h-4 w-4"
    />
    <span className="font-medium">
      Stake business will be presented
    </span>
  </label>
</section>


      <section className="space-y-4">
        <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
          Opening
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="openingHymnNumber" className="mb-2 block font-medium">
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              type="number"
              min="1"
              value={openingHymnNumber}
              onChange={(event) => setOpeningHymnNumber(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="openingHymnTitle" className="mb-2 block font-medium">
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              type="text"
              value={openingHymnTitle}
              onChange={(event) => setOpeningHymnTitle(event.target.value)}
              required
              placeholder="Hymn title"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="mb-2 block font-medium">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            type="text"
            value={openingPrayer}
            onChange={(event) => setOpeningPrayer(event.target.value)}
            required
            placeholder="Name of person giving the prayer"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
          Sacrament
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sacramentHymnNumber" className="mb-2 block font-medium">
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              type="number"
              min="1"
              value={sacramentHymnNumber}
              onChange={(event) => setSacramentHymnNumber(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="sacramentHymnTitle" className="mb-2 block font-medium">
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              type="text"
              value={sacramentHymnTitle}
              onChange={(event) => setSacramentHymnTitle(event.target.value)}
              required
              placeholder="Hymn title"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
        </div>
      </section>

<section className="space-y-4">
  <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
    Speakers and Musical Numbers
  </h2>

  {speakers.map((speaker, index) => (
    <div
      key={index}
      className="space-y-3 rounded-lg border border-gray-200 p-4"
    >
      <h3 className="font-medium text-blue-900">
        Program Item {index + 1}
      </h3>

      <div>
        <label
          htmlFor={`speaker-name-${index}`}
          className="mb-2 block font-medium"
        >
          Name
        </label>
        <input
          id={`speaker-name-${index}`}
          type="text"
          value={speaker.name}
          onChange={(event) =>
            updateSpeaker(index, "name", event.target.value)
          }
          placeholder="Enter speaker or group name"
          className="w-full rounded-lg border border-gray-300 p-3"
        />
      </div>

      <div>
        <label
          htmlFor={`speaker-topic-${index}`}
          className="mb-2 block font-medium"
        >
          Topic or Description
        </label>
        <input
          id={`speaker-topic-${index}`}
          type="text"
          value={speaker.topic}
          onChange={(event) =>
            updateSpeaker(index, "topic", event.target.value)
          }
          placeholder="Enter topic or musical number"
          className="w-full rounded-lg border border-gray-300 p-3"
        />
      </div>

      <div>
        <label
          htmlFor={`speaker-type-${index}`}
          className="mb-2 block font-medium"
        >
          Program Item Type
        </label>
        <select
          id={`speaker-type-${index}`}
          value={speaker.type}
          onChange={(event) =>
            updateSpeaker(index, "type", event.target.value)
          }
          className="w-full rounded-lg border border-gray-300 p-3"
        >
          <option value="speaker">Speaker</option>
          <option value="musical-number">Musical Number</option>
        </select>
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addSpeaker}
    className="text-sm font-semibold text-blue-900 hover:underline"
  >
    + Add another speaker or musical number
  </button>
</section>

      <section className="space-y-4">
        <h2 className="border-b pb-2 text-lg font-semibold text-blue-950">
          Closing
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="closingHymnNumber" className="mb-2 block font-medium">
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              type="number"
              min="1"
              value={closingHymnNumber}
              onChange={(event) => setClosingHymnNumber(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="closingHymnTitle" className="mb-2 block font-medium">
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              type="text"
              value={closingHymnTitle}
              onChange={(event) => setClosingHymnTitle(event.target.value)}
              required
              placeholder="Hymn title"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
        </div>

        <div>
          <label htmlFor="closingPrayer" className="mb-2 block font-medium">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            type="text"
            value={closingPrayer}
            onChange={(event) => setClosingPrayer(event.target.value)}
            required
            placeholder="Name of person giving the prayer"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>
      </section>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-800"
      >
        Save Meeting
      </button>
    </form>
  );
}
