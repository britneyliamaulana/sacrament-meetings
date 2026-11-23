
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  addMeeting,
  updateMeeting as updateMeetingInDB,
  deleteMeeting as deleteMeetingFromDB,
} from "@/lib/meetings-db";

// The state returned to the forms after validation or database errors.
export interface MeetingFormState {
  message: string;
  errors?: Record<string, string[]>;
}

const hymnSchema = z.object({
  number: z.number().int().positive("Enter a valid hymn number."),
  title: z.string().trim().min(1, "Hymn title is required."),
});

const meetingSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  meetingType: z.enum([
    "testimony",
    "regular",
    "stake",
    "general",
    "special",
  ]),
  presiding: z.string().trim().min(1, "Presiding officer is required."),
  conducting: z.string().trim().min(1, "Conducting officer is required."),
  announcements: z.array(z.string()),
  openingHymn: hymnSchema,
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  wardBusiness: z.array(
    z.object({
      description: z.string().trim(),
    })
  ),
  stakeBusiness: z.boolean(),
  sacramentHymn: hymnSchema,
  speakers: z.array(
    z.object({
      name: z.string().trim().min(1),
      topic: z.string(),
      type: z.enum(["speaker", "musical-number"]),
    })
  ),
  closingHymn: hymnSchema,
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
});

// Read and validate the JSON meeting data submitted by the form.
function validateMeetingForm(formData: FormData) {
  const rawData = formData.get("meetingData");

  if (typeof rawData !== "string") {
    return {
      success: false as const,
      errors: { meetingData: ["Meeting information is missing."] },
    };
  }

  let parsedData: unknown;

  try {
    parsedData = JSON.parse(rawData);
  } catch {
    return {
      success: false as const,
      errors: { meetingData: ["Meeting information is invalid."] },
    };
  }

  const result = meetingSchema.safeParse(parsedData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const field = issue.path.join(".") || "meetingData";

      errors[field] ??= [];
      errors[field].push(issue.message);
    }

    return { success: false as const, errors };
  }

  return { success: true as const, data: result.data };
}

// Create a meeting.
export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validation = validateMeetingForm(formData);

  if (!validation.success) {
    return {
      message: "Please correct the errors and try again.",
      errors: validation.errors,
    };
  }

  try {
    await addMeeting(validation.data);
  } catch (error) {
    console.error("Database error creating meeting:", error);

    return {
      message: "Unable to create the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// Update a meeting.
export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validation = validateMeetingForm(formData);

  if (!validation.success) {
    return {
      message: "Please correct the errors and try again.",
      errors: validation.errors,
    };
  }

  try {
    const updatedMeeting = await updateMeetingInDB(id, validation.data);

    if (!updatedMeeting) {
      return {
        message: "Meeting not found. It may have already been deleted.",
      };
    }
  } catch (error) {
    console.error("Database error updating meeting:", error);

    return {
      message: "Unable to update the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

// Delete a meeting.
export async function deleteMeeting(id: number): Promise<void> {
  try {
    const deleted = await deleteMeetingFromDB(id);

    if (!deleted) {
      throw new Error("Meeting not found. It may already have been deleted.");
    }
  } catch (error) {
    console.error("Database error deleting meeting:", error);

    throw new Error(
      "Unable to delete this meeting. Please try again."
    );
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}
