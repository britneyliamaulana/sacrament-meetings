import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  const { id } = await context.params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return NextResponse.json(
      { message: "Invalid meeting ID" },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { message: "Meeting not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting, { status: 200 });
}