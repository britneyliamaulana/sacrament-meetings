
"use client";

import { useActionState, useState } from "react";
import {
  createMeeting,
  updateMeeting,
  type MeetingFormState,
} from "@/lib/actions";
import type { MeetingType, SacramentMeeting } from "@/lib/types";

const initialState: MeetingFormState = {
  message: "",
};

function getFieldError(
  errors: MeetingFormState["errors"],
  field: string
) {
  return errors?.[field]?.[0];
}

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  const [date, setDate] = useState(meeting?.date ?? "");
  const [meetingType, setMeetingType] = useState<MeetingType>(
    meeting?.meetingType ?? "regular"
  );
  const [presiding, setPresiding] = useState(meeting?.presiding ?? "");
  const [conducting, setConducting] = useState(meeting?.conducting ?? "");

  const [openingHymnNumber, setOpeningHymnNumber] = useState(
    meeting ? String(meeting.openingHymn.number) : ""
  );
  const [openingHymnTitle, setOpeningHymnTitle] = useState(
  meeting?.openingHymn.title ?? ""
);
  const [openingPrayer, setOpeningPrayer] = useState(
    meeting?.openingPrayer ?? ""
  );

  const [sacramentHymnNumber, setSacramentHymnNumber] = useState(
    meeting ? String(meeting.sacramentHymn.number) : ""
  );
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState(
    meeting?.sacramentHymn.title ?? ""
  );

  const [closingHymnNumber, setClosingHymnNumber] = useState(
    meeting ? String(meeting.closingHymn.number) : ""
  );
  const [closingHymnTitle, setClosingHymnTitle] = useState(
    meeting?.closingHymn.title ?? ""
  );
  const [closingPrayer, setClosingPrayer] = useState(
    meeting?.closingPrayer ?? ""
  );

  const [announcements, setAnnouncements] = useState<string[]>(
    meeting?.announcements?.length ? meeting.announcements : [""]
  );

  const [wardBusiness, setWardBusiness] = useState<string[]>(
    meeting?.wardBusiness.length
      ? meeting.wardBusiness.map((item) => item.description)
      : [""]
  );

  const [stakeBusiness, setStakeBusiness] = useState(
    meeting?.stakeBusiness ?? false
  );

  const [speakers, setSpeakers] = useState(
    meeting?.speakers.length
      ? meeting.speakers
      : [{ name: "", topic: "", type: "speaker" as const }]
  );

function updateAnnouncement(index: number, value: string) {
  setAnnouncements((current) =>
    current.map((item, i) => (i === index ? value : item))
  );
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

  return (
    <form
  action={formAction}
  className="mx-auto max-w-2xl space-y-8 rounded-xl bg-white p-8 shadow-md"
>
  <input
    type="hidden"
    name="meetingData"
    value={JSON.stringify(meetingDetails)}
  />

  <div aria-live="polite" className="text-sm text-red-700">
    {state.message}
    {state.errors &&
      Object.values(state.errors).flat().map((error, index) => (
        <p key={index}>{error}</p>
      ))}
  </div>
      <div>
      <h1 className="text-2xl font-bold text-blue-950">
       {meeting ? "Edit Meeting" : "Create New Meeting"}
    </h1>
      <p className="mt-2 text-sm text-gray-600">
        {meeting
        ? "Update the details for this sacrament meeting."
        : "Enter the details for your sacrament meeting."}
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
  aria-invalid={!!getFieldError(state.errors, "date")}
  aria-describedby="date-error"
  className="w-full rounded-lg border border-gray-300 p-3"
/>

{getFieldError(state.errors, "date") && (
  <p id="date-error" className="mt-1 text-sm text-red-700">
    {getFieldError(state.errors, "date")}
  </p>
)}
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
  aria-invalid={!!getFieldError(state.errors, "presiding")}
  aria-describedby="presiding-error"
  className="w-full rounded-lg border border-gray-300 p-3"
/>

{getFieldError(state.errors, "presiding") && (
  <p id="presiding-error" className="mt-1 text-sm text-red-700">
    {getFieldError(state.errors, "presiding")}
  </p>
)}
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
  aria-invalid={!!getFieldError(state.errors, "conducting")}
  aria-describedby="conducting-error"
  className="w-full rounded-lg border border-gray-300 p-3"
/>

{getFieldError(state.errors, "conducting") && (
  <p id="conducting-error" className="mt-1 text-sm text-red-700">
    {getFieldError(state.errors, "conducting")}
  </p>
)}
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
              aria-invalid={!!getFieldError(state.errors, "openingHymn.number")}
              aria-describedby="opening-hymn-number-error"
            />
            {getFieldError(state.errors, "openingHymn.number") && (
             <p id="opening-hymn-number-error" className="mt-1 text-sm text-red-700">
              {getFieldError(state.errors, "openingHymn.number")}
              </p>
            )}

          </div>

          <div>
            <label htmlFor="" className="mb-2 block font-medium">
              Opening Hymn Title
            </label>
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
    aria-invalid={!!getFieldError(state.errors, "openingHymn.title")}
    aria-describedby="opening-hymn-title-error"
  />

  {getFieldError(state.errors, "openingHymn.title") && (
    <p id="opening-hymn-title-error" className="mt-1 text-sm text-red-700">
      {getFieldError(state.errors, "openingHymn.title")}
    </p>
  )}
</div>
          </div>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="mb-2 block font-medium">
            Opening Prayer
          </label>
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
    aria-invalid={!!getFieldError(state.errors, "openingPrayer")}
    aria-describedby="opening-prayer-error"
  />

  {getFieldError(state.errors, "openingPrayer") && (
    <p id="opening-prayer-error" className="mt-1 text-sm text-red-700">
      {getFieldError(state.errors, "openingPrayer")}
    </p>
  )}
</div>
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
              aria-invalid={!!getFieldError(state.errors, "sacramentHymn.number")}
              aria-describedby="sacrament-hymn-number-error"
            />
            {getFieldError(state.errors, "sacramentHymn.number") && (
              <p id="sacrament-hymn-number-error" className="mt-1 text-sm text-red-700">
                {getFieldError(state.errors, "sacramentHymn.number")}
              </p>
            )}
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
              aria-invalid={!!getFieldError(state.errors, "sacramentHymn.title")}
              aria-describedby="sacrament-hymn-title-error"
            />
            {getFieldError(state.errors, "sacramentHymn.title") && (
              <p id="sacrament-hymn-title-error" className="mt-1 text-sm text-red-700">
                {getFieldError(state.errors, "sacramentHymn.title")}
              </p>
            )}
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
  aria-invalid={!!getFieldError(state.errors, `speakers.${index}.name`)}
  aria-describedby={`speaker-name-error-${index}`}
/>

{getFieldError(state.errors, `speakers.${index}.name`) && (
  <p
    id={`speaker-name-error-${index}`}
    className="mt-1 text-sm text-red-700"
  >
    {getFieldError(state.errors, `speakers.${index}.name`)}
  </p>
)}
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
      aria-invalid={!!getFieldError(state.errors, "closingHymn.number")}
      aria-describedby="closing-hymn-number-error"
    />

    {getFieldError(state.errors, "closingHymn.number") && (
      <p id="closing-hymn-number-error" className="mt-1 text-sm text-red-700">
        {getFieldError(state.errors, "closingHymn.number")}
      </p>
    )}
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
      aria-invalid={!!getFieldError(state.errors, "closingHymn.title")}
      aria-describedby="closing-hymn-title-error"
    />

    {getFieldError(state.errors, "closingHymn.title") && (
      <p id="closing-hymn-title-error" className="mt-1 text-sm text-red-700">
        {getFieldError(state.errors, "closingHymn.title")}
      </p>
    )}
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
    aria-invalid={!!getFieldError(state.errors, "closingPrayer")}
    aria-describedby="closing-prayer-error"
  />

  {getFieldError(state.errors, "closingPrayer") && (
    <p id="closing-prayer-error" className="mt-1 text-sm text-red-700">
      {getFieldError(state.errors, "closingPrayer")}
    </p>
  )}
</div>
       
      </section>

      <button
  type="submit"
  disabled={isPending}
  className="w-full rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
>
  {isPending
    ? "Saving Meeting..."
    : meeting
      ? "Update Meeting"
      : "Save Meeting"}
</button>
    </form>
  );
}
