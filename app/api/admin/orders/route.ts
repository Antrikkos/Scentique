import {NextResponse} from 'next/server'
import {connect} from '@/app/lib/db'
import Order from '@/models/Order'

export async function GET(request) {
  await connect();
  const orders = await Order.find().exec();
  return new NextResponse(JSON.stringify(orders));
}

// export async function POST(request: Request) {
//   await connect();
//   const req = await request.json();
//   // console.log(req);
//   const newOrder = new Order({
//     ...req
//   });
//   const order = await newOrder.save();
//   return NextResponse.json({
//     order
//   });
// }

