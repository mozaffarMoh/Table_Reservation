import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { isSameOrAfter } from '@/constant/isSameOrAfter';
import { isTimesReserved } from '@/constant/isTimesReserved';


export async function GET(req: NextRequest) {
  const { searchParams }: any = new URL(req.url);
  const inputDateTime = JSON.parse(searchParams.get('param'));

  const { date, fromTime, toTime, currentDate }: any = inputDateTime;
  try {
    const client = await clientPromise;
    const db = client.db('tables');

    /* check the expired dates and eliminate them */

    let tables = await db.collection('types').find({}).toArray();

    /* Delete the expired dates */
    await db.collection('reserve').deleteMany({
      date: { $lt: currentDate }, // Remove documents with a date before currentDate
    });

    let reservedTables: any = await db.collection('reserve').find({}).toArray();

    if (reservedTables.length > 0) {
      /* add reservation to items */
      tables = tables.map((item: any) => {
        let isReserved = false;
        let reservedNums: any = [];
        reservedTables.forEach((reserveItem: any) => {
          if (reserveItem?.slug == item?.slug
            && reserveItem?.date == date &&
            isTimesReserved({ inputFrom: fromTime, inputTo: toTime }, { resFrom: reserveItem?.fromTime, resTo: reserveItem?.toTime })
          ) {
            isReserved = true;
            reservedNums.push({ num: reserveItem?.num, fromTime: reserveItem?.fromTime, toTime: reserveItem?.toTime })
          }
        })
        const updatedItem = { ...item, isReserved: isReserved, reservedNums }
        return updatedItem
      })
    }

    return NextResponse.json({ success: true, data: tables });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في الاتصال بقاعدة البيانات' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    const client = await clientPromise;
    const db = client.db('tables');
    const newItem = await req.json();
    const { reserveData } = newItem;
    const dataWithId = { ...reserveData, _id: new ObjectId() };
    delete dataWithId?.currentDate
    const result = await db.collection('reserve').insertOne(
      dataWithId
    );


    return NextResponse.json({ success: true, message: "تم الحجز بنجاح" });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في الاتصال بقاعدة البيانات' }, { status: 500 });
  }
} 