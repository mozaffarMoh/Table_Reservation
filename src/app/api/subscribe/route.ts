import { NextRequest, NextResponse } from "next/server";
import { webPush } from "./webPush";

export async function POST(req: NextRequest) {
  try {
    const { subscription } = await req.json();

    if (!subscription) {
      return NextResponse.json({ error: "Subscription is required" }, { status: 400 });
    }

    const payload = JSON.stringify({
      title: "New Notification",
      message: "You have a new push notification!",
    });

    await webPush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
