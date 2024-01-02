import {connect} from '@/app/lib/db'
import Order from '@/models/Order'
import {NextResponse} from 'next/server'

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await connect();
  const req = await request.json();
  const order = await Order.findById(req.id);
  if (order) {
    order.isPaid = true;
    const paidOrder = await order.save();
    console.log("order " + req.id + " was set to paid status")
    return NextResponse.json({
      paidOrder
    })
  } else {
    return NextResponse.json(
      'Failed'
    );
  }

}