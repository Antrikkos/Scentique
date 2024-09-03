"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { format, formatDistance } from 'date-fns';

export const dynamic = "force-dynamic";

interface OrderItem {
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: number;
  scent: string;
  weight: string;
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

  function getTime(time: number) {
    let date: Date = new Date(time)
    let dateString: string = format(date, 'dd-MM-yyyy hh:mm a');
    console.log(formatDistance(date, new Date(), { addSuffix: true }))
    console.log(dateString);
    return (
        <div>
          <p>{dateString.substring(0, 10)}</p>
          <p>{dateString.substring(10, 19)}</p>
          <p>{formatDistance(date, new Date(), { addSuffix: true })}</p>
        </div>
    )
  }


  useEffect(() => {
    fetch(`/api/admin/orders?token=${token}`, {
      method: 'Get',
      cache: 'no-store'
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
    <div className="bg-white mx-auto max-w-7xl xl:max-w-full px-4 sm:px-6 lg:px-8 space-y-3">
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Admin Page</h1>
      </div>
      <div className="text-left">
        <div className="border-b">
          <div className='flex flex-row px-2 font-semibold text-sm'>
            <div className="basis-1/12">Order ID</div>
            <div className="basis-2/12">Date</div>
            <div className="basis-3/12">Name</div>
            <div className="basis-3/12">Address</div>
            <div className="basis-1/24">Total</div>
            <div className="basis-1/12">Paid</div>
            <div className="basis-1/12">Delivered</div>
            <div className="basis-1/24">View Order</div>
          </div>
        </div>
        <div className="">
          {data.map((order: order) => (
            <div key={order._id} className="border-b py-2">
              <Disclosure>
                {({ open }) => (
                  <div className='flex flex-col'>
                    <Disclosure.Button className="flex flex-row px-2 rounded-md py-2 text-left text-sm bg-gray-100 hover:bg-gray-200">
                      <div className="basis-1/12">{order._id.substring(20, 24)}</div>
                      <div className="basis-2/12">
                        <div className='flex flex-col'>
                          {getTime(Date.parse(order.createdAt))}
                        </div>
                      </div>
                      <div className="basis-3/12">
                        <div className="flex flex-col">
                          <p>{order.shippingAddress.title} {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                          <p>{order.shippingAddress.mobileNumber}</p>
                          <p>{order.shippingAddress.email}</p>
                        </div>
                      </div>
                      <div className="basis-3/12">
                        <div className="flex flex-col">
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                          <p>{order.shippingAddress.province}</p>
                        </div>
                      </div>
                      <div className="basis-1/24">€{order.totalPrice}</div>
                      <div className="basis-1/12">
                        {order.isPaid
                          ? (
                            <p className='text-green-600'>Paid</p>
                          )
                          : (
                            <div>
                              <p className='text-red-600'>Not Paid</p>
                            </div>
                          )}
                      </div>
                      <div className="basis-1/12">
                        {order.isDelivered
                          ? (
                            <p className='text-green-600'>Delivered</p>
                          )
                          : (
                            <div>
                              <p className='text-red-600'>Not Delivered</p>
                            </div>
                          )}
                      </div>
                      <div className="basis-1/24">
                        <ChevronUpIcon
                          className={`${open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm space-y-3">
                      <div className='flex flex-row justify-end space-x-5'>
                        <Button className='bg-red-600 hover:bg-red-700' onClick={async () => {
                          const shouldRemove = confirm("Are you sure you want to delete this order?")
                          if (shouldRemove) {
                            const res = await fetch(`/api/admin/deleteOrder?token=${token}`, {
                              method: 'POST',
                              body: JSON.stringify({
                                id: order._id
                              })
                            },)
                            window.location.reload()
                          }
                        }}>Delete Order</Button>
                        <Button className='bg-gray-600 hover:bg-gray-700' onClick={async () => {
                          const res = await fetch(`/api/admin/setPaid?token=${token}`, {
                            method: 'POST',
                            body: JSON.stringify({
                              id: order._id
                            })
                          },)
                          window.location.reload()
                        }}>Update to Paid</Button>
                        <Button className='bg-gray-600 hover:bg-gray-700' onClick={async () => {
                          const res = await fetch(`/api/admin/setDelivered?token=${token}`, {
                            method: 'POST',
                            body: JSON.stringify({
                              id: order._id
                            })
                          },)
                          window.location.reload()
                        }}>Update to Delivered</Button>
                      </div>
                      <div className='p-2 border rounded'>
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
                                    {entry.weight}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">QTY: {entry.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}