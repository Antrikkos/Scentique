import { NextResponse } from 'next/server'
import { connect } from '@/app/lib/db'
import Order from '@/models/Order'

export const dynamic = "force-dynamic";
export async function GET(request) {
  await connect();
  const orders = await Order.find().exec();
  return new NextResponse(JSON.stringify(orders));
}
