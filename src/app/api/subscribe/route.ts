/* /api/subscribe/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { webPush } from "./webPush";

export async function POST(req: NextRequest) {
  try {

    const { subscription } = await req.json();
    console.log('subscription is : ', subscription)

    if (!subscription) {
      return NextResponse.json({ error: "Subscription is required" }, { status: 400 });
    }

    const payload = JSON.stringify({
      title: "New Notification",
      message: "You have a new push notification!",
    });


    let response = {}
    await webPush.sendNotification(subscription, payload).then((res) => {
      response = res
      console.log({ message: 'message sent successfully' });
    }).catch((err) => {
      return NextResponse.json({ message: 'message not sent there is an error', err });
    })

    return NextResponse.json({ message: 'message sent successfully', response });


  } catch (error) {
    console.error("Error sending notification", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
