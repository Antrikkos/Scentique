"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import {Button} from '@sanity/ui'
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
  "_id": string;
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

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin?token=${token}`, {
      method: 'Get',
    },)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div className="bg-white mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8 space-y-3">
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Admin Page</h1>
      </div>
      <div className='flex flex-col'>
        <div className="overflow-x-auto">
          <div className="min-w-full text-left">
            <div className="border-b">
              <div className='flex flex-row px-4 font-semibold'>
                <div className="w-28">Order ID</div>
                <div className="w-96">Name</div>
                <div className="w-80">Address</div>
                <div className="w-20">Total</div>
                <div className="w-20">Paid</div>
                <div className="w-32">Delivered</div>
                <div className="w-20">View Order</div>
              </div>
            </div>
            <div>
              {data.map((order) => (
                <div key={order._id} className="border-b flex flex-row py-2">
                  <Disclosure>
                    {({ open }) => (
                      <div className='flex flex-col'>
                        <Disclosure.Button className="flex w-full px-4 rounded-md py-2 text-left text-sm bg-gray-100 hover:bg-gray-200">
                          <div className="w-28">{order._id.substring(20, 24)}</div>
                          <div className="w-96">
                            <div className="flex flex-col">
                              <p>{order.shippingAddress.title} {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                              <p>{order.shippingAddress.mobileNumber}</p>
                              <p>{order.shippingAddress.email}</p>
                            </div>
                          </div>
                          <div className="w-80">
                            <div className="flex flex-col">
                              <p>{order.shippingAddress.address}</p>
                              <p>{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                              <p>{order.shippingAddress.province}</p>
                            </div>
                          </div>
                          <div className="w-20">€{order.totalPrice}</div>
                          <div className="w-20">
                            {order.isPaid
                              ? `Paid`
                              : 'Not Paid'}
                          </div>
                          <div className="w-32">
                            {order.isDelivered
                              ? `Delivered`
                              : 'Not Delivered'}
                          </div>
                          <div className="w-20">
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5`}
                            />
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm">
                          {order.orderItems.map((entry) => (
                            <div key={entry._id} className="flex p-6 w-full">
                              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  src={entry.image as string}
                                  alt="Product image"
                                  fill
                                  priority={true}
                                  sizes="(max-width: 100px) 100vw, (max-width: 100px) 50vw, 33vw"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{entry.name}</h3>
                                    <p className="ml-4">€{entry.price}</p>
                                  </div>
                                  <div>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                      {entry.scent}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                      {entry.color}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">QTY: {entry.quantity}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}