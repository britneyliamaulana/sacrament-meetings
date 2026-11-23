
"use client";

import { useState } from "react";
import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingFormProps {
  meetingId: number;
}

export default function DeleteMeetingForm({
  meetingId,
}: DeleteMeetingFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const action = deleteMeeting.bind(null, meetingId);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
      >
        Delete Meeting
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-meeting-title"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2
              id="delete-meeting-title"
              className="text-xl font-bold text-blue-950"
            >
              Delete Meeting?
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to delete this meeting? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <form action={action}>
                <button
                  type="submit"
                  className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800"
                >
                  Confirm Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}