import { connect } from '@/app/lib/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await connect();
  const req = await request.json();
  // console.log(req.id);
  const order = await Order.findById(req.id);
  if (order) {
    order.isDelivered = true;
    const deliveredOrder = await order.save();
    console.log("order " + req.id + " was set to delivered status")
    return NextResponse.json({
      deliveredOrder
    })
  } else {
    return NextResponse.json(
      'Failed'
    );
  }

}