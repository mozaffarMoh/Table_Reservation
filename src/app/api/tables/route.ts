import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { isSameOrAfter } from '@/constant/isSameOrAfter';
import { isTimesReserved } from '@/constant/isTimesReserved';


export async function GET(req: NextRequest) {

 try {
    const client = await clientPromise;
    const db = client.db('tables');


    let tables = await db.collection('types').find({}).toArray();

 

    return NextResponse.json({ success: true, data: tables });
  }
   catch (error) {
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