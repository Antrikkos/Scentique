"use client"
import React, {useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {Minus, Plus} from 'lucide-react'

export const dynamic = "force-dynamic";

interface OrderItem {
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: number;
  color: string;
  scent: string;
}

interface address {
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  address: string,
  city: string,
  province: string,
  postalCode: string
}

interface order {
  _id: string,
  orderItems: OrderItem[],
  shippingAddress: address,
  totalPrice: number,
  isPaid: boolean,
  isDelivered: boolean,
  createdAt: string,
  updatedAt: string,
  __v: number;
}

export default function AdminPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  let orders: order[] = [];
  // let loading: boolean = true;

  useEffect(() => {
    const fetchData = async () => {
      // loading = true;
      let response = await fetch(`/api/admin?token=${token}`, {
        method: 'Get',
      }, )
      orders = await response.json();
      // console.log(orders);
      // loading = false;
    };
    fetchData();
    console.log(orders)
  }, [])

  // console.log(orders);


  // async function handleButtonPress () {
  //   let response = await fetch(`/api/admin?token=${token}`, {
  //     method: 'Get',
  //   }, )
  //
  //   orders = await response.json();
  //   // console.log(orders);
  //
  // }

  return (
    <div className="bg-white mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8 space-y-3">
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Admin Page</h1>
        {/*<button className='text-xl font-bold tracking-tight text-yellow-700 hover:text-yellow-800' onClick={handleButtonPress}>Load Orders</button>*/}
      </div>
      {/*<div className='flex flex-col'>*/}
      {/*  {loading ? (*/}
      {/*    <p>Loading</p>*/}
      {/*  ) : (*/}
      {/*    <div className="overflow-x-auto">*/}
      {/*      <table className="min-w-full">*/}
      {/*        <thead className="border-b">*/}
      {/*          <tr>*/}
      {/*            <th className="px-5 text-left">ID</th>*/}
      {/*            <th className="p-5 text-left">USER</th>*/}
      {/*            <th className="p-5 text-left">DATE</th>*/}
      {/*            <th className="p-5 text-left">TOTAL</th>*/}
      {/*            <th className="p-5 text-left">PAID</th>*/}
      {/*            <th className="p-5 text-left">DELIVERED</th>*/}
      {/*            <th className="p-5 text-left">ACTION</th>*/}
      {/*          </tr>*/}
      {/*        </thead>*/}
      {/*        <tbody>*/}
      {/*          {orders.map((order) => (*/}
      {/*            <tr key={order._id} className="border-b">*/}
      {/*              <td className="p-5">{order._id.substring(20, 24)}</td>*/}
      {/*              <td className="p-5">{order.shippingAddress.firstName}</td>*/}
      {/*              <td className="p-5">${order.totalPrice}</td>*/}
      {/*              <td className="p-5">*/}
      {/*                {order.isPaid*/}
      {/*                  ? `paid`*/}
      {/*                  : 'not paid'}*/}
      {/*              </td>*/}
      {/*              <td className="p-5">*/}
      {/*                {order.isDelivered*/}
      {/*                  ? `delivered`*/}
      {/*                  : 'not delivered'}*/}
      {/*              </td>*/}
      {/*            </tr>*/}
      {/*          ))}*/}
      {/*        </tbody>*/}
      {/*      </table>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
}