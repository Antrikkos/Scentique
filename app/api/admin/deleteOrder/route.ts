import { connect } from '@/app/lib/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    await connect();
    const req = await request.json();
    const order = await Order.findById(req.id);
    if (order) {
        const deletedOrder = await Order.deleteOne({_id:req.id})
        console.log("order " + req.id + " was deleted")
        return NextResponse.json({
            deletedOrder
        })
    } else {
        return NextResponse.json(
            'Failed'
        );
    }

}