
import { NextResponse } from "next/server";
import { getMeetingsByDate } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");

  const meetings = await getMeetingsByDate(date);

  return NextResponse.json(meetings, { status: 200 });
}
