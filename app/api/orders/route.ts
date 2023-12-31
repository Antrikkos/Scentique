import {NextResponse} from 'next/server'
import {connect} from '@/app/lib/db'
import Order from '@/models/Order'

// export async function GET(request) {
//   await connect();
//   // const newOrder = new Order({
//   //   ...req.body
//   // });
//   // const order = await newOrder.save();
//   console.log("newOrder");
//   return new NextResponse("order");
// }

export async function POST(request: Request) {
  await connect();
  const req = await request.json();
  // console.log(req);
  const newOrder = new Order({
    ...req
  });
  const order = await newOrder.save();
  return NextResponse.json({
    order
  });
}

