/* /api/subscribe/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { webPush } from "./webPush";

export async function POST(req: NextRequest) {
  try {

    const { subscription } = await req.json();
    //const subscription = { "endpoint": "https://wns2-pn1p.notify.windows.com/w/?token=BQYAAACRHbURfB8bhAxYMNjAa4hHsRV3QC%2bzSb7hMs%2beqb6AzIWcnI%2fXvqZQ6R8S3ygNrCm4OfJYsFKHw3WQv2QHf9LGT7wUrPBXcyHC%2bQLTamAGg7znsMKP4wfhxwlhyd%2fn8m2r5yrED41zzByfrrtd7VAI1qu74mtco3yGcDvJoUg1ahh2K%2b%2bRcVxUFkZRvf%2fSqgGXClXSzKhQEiiF2wy0foDPHU3c76UWhtaQ%2fhZP%2fWAxr3j0VKfrlxLXHZzLpOyWv%2fBI%2b6EvhUkcatnP6J2Ugo%2fu1M%2f6VQvQU8Ti2m0yY4hTMDIzhBsDIvdk%2ftd4OjHWzqwqMzYQre7Zk92U%2fARWrtSg", "expirationTime": null, "keys": { "p256dh": "BKXTR4koPJqblVRBI_lobbFOtLvL7JQR3nk8FF0h5V-kNc_eyT02LQ_R8F3NvNTIPaZ7YWuPvX5Hfiy8K57hYxY", "auth": "26O9ZhABovrentChiFfzXQ" } }
    
    if (!subscription) {
      return NextResponse.json({ error: "Subscription is required" }, { status: 400 });
    }

    const payload = JSON.stringify({
      title: "new notify",
      message: "have a new message!",
    });


    await webPush.sendNotification(subscription, payload).then((res) => {
      console.log({ message: 'message sent successfully' });
    }).catch((err) => {
      return NextResponse.json({ message: 'message not sent there is an error', status: 500 });
    })

    return NextResponse.json({ message: 'message sent successfully', status: 200 });


  } catch (error) {
    console.error("Error sending notification", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
