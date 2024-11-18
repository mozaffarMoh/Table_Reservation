import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { isSameOrAfter } from '@/constant/isSameOrAfter';
import { isTimesReserved } from '@/constant/isTimesReserved';


export async function GET(req: NextRequest) {
  const { searchParams }: any = new URL(req.url);
 // const inputDateTime = JSON.parse(searchParams.get('param'));
  let date = '18-11-2024';
  let fromTime = "01:00 PM";
  let toTime = "03:00 PM";
  let currentDate = "18-11-2024"
  //const { date, fromTime, toTime, currentDate }: any = inputDateTime;
  try {
    const client = await clientPromise;
    const db = client.db('tables');

    /* check the expired dates and eliminate them */
    let reservedTables: any = await db.collection('reserve').find({}).toArray();
    reservedTables = reservedTables.filter((item: any) => {
      if (item?.date && currentDate) {
        return isSameOrAfter(item.date, currentDate)
      } else {
        return true
      }
    }
    );

    /* Delete the expired dates */
    let reservedItems: any = await db.collection('reserve')
    reservedItems.deleteMany({}); // Optionally clear the collection
    reservedItems.insertMany(reservedTables);

    let tables = await db.collection('types').find({}).toArray();

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
          reservedNums.push(reserveItem?.num)
        }
      })
      const updatedItem = { ...item, isReserved: isReserved, reservedNums }
      return updatedItem
    })

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