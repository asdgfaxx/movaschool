import { NextResponse } from "next/server";

// Lead capture endpoint. Stubbed for now — swap the console.log below for a
// real integration (CRM, email, Telegram bot, Google Sheets, etc.).
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("[lead] new submission:", data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
