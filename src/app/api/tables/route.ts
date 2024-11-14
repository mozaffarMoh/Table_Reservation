import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';


export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('tables');
    const tables = await db.collection('types').find({}).toArray();
    return NextResponse.json({ success: true, data: tables });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'خطأ في الاتصال بقاعدة البيانات' }, { status: 500 });
  }
}