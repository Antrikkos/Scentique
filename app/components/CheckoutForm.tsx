"use client";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Plus, Minus } from "lucide-react";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/material.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {email} from "@sideway/address";

interface IFormInput {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  address: string,
  city: string,
  postalCode: string,
  province: string
}

interface OrderItem {
  name: string;
  slug: string;
  quantity: number;
  image: string;
  price: number;
  scent: string;
  weight: string;
}

interface address {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string,
  address: string,
  city: string,
  province: string,
  postalCode: string
}

export const dynamic = "force-dynamic";
export default function CheckoutForm() {


  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    incrementItem,
    decrementItem,
    totalPrice,
    clearCart,
  } = useShoppingCart();


  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const router = useRouter();
  const onSubmit = async (data: IFormInput) => {

    let items: OrderItem[] = [];
    Object.values(cartDetails ?? {}).map(entry => {
      let item: OrderItem = {
        name: entry.name,
        slug: entry.product_data['slug'],
        quantity: entry.quantity,
        image: entry.image,
        price: entry.price,
        scent: entry.product_data['scent'],
        weight: entry.product_data['weight'],
      }
      items.push(item);
    })

    const addressDetails: address = {
      firstName: data['firstName'],
      lastName: data['lastName'],
      email: data['email'],
      mobileNumber: data['mobileNumber'],
      address: data['address'],
      city: data['city'],
      province: data['province'],
      postalCode: data['postalCode'],
    }

    let response = await fetch('/api/orders', {
      method: 'POST',
      // headers: {
      //   'Content-type': 'application/json',
      // },
      body: JSON.stringify({
        orderItems: items,
        shippingAddress: addressDetails,
        totalPrice: totalPrice,
      })
    },)

    // console.log(response);
    clearCart();
    router.push('/success')
  };

  return (
    <div className='flex lg:space-x-5 flex-col-reverse lg:flex-row w-full'>
      <div className='py-6 sm:w-full lg:w-17/24'>
        {cartCount === 0 ? (
          <Link href='/'>
            <h1 className="py-6">You dont have any items in your basket please return to the home page.</h1>
          </Link>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='border-2 shadow-lg flex flex-col p-4 rounded-lg text-sm md:text-md lg:text-md space-y-1 justify-evenly flex-1'>
            <div className='md:flex md:flex-row'>
              <div className='space-y-0 md:basis-1/2 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>First Name</h1>
                  {errors.firstName && errors.firstName.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.firstName && errors.firstName.type === "maxLength" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Max length exceeded</p>
                  )}
                </div>
                <input
                    type="text"
                    placeholder="Enter First name"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    {...register("firstName", { required: true, maxLength: 80 })}
                    className='p-2 w-full border' />
              </div>
              <div className='space-y-0 md:basis-1/2 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>Last Name</h1>
                  {errors.lastName && errors.lastName.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.lastName && errors.lastName.type === "maxLength" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Max length exceeded</p>
                  )}
                </div>
                <input
                    type="text"
                    placeholder="Enter Last name"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    {...register("lastName", { required: true, maxLength: 100 })}
                    className='p-2 w-full border' />
              </div>
            </div>
            <div className='md:flex md:flex-row'>
              <div className='space-y-0 md:basis-1/2 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>Email</h1>
                  {errors.email && errors.email.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Enter a valid email</p>
                  )}
                </div>
                <input
                    type="email"
                    placeholder="Enter Email"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                    className='p-2 w-full border' />
              </div>
              <div className='space-y-0 md:basis-1/2 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>Mobile number</h1>
                  {errors.mobileNumber && errors.mobileNumber.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.mobileNumber && errors.mobileNumber.type === "pattern" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Enter a valid number</p>
                  )}
                  {errors.mobileNumber && errors.mobileNumber.type === "maxLength" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Enter a valid number</p>
                  )}
                </div>
                <input
                    type="tel"
                    placeholder="Enter Mobile number"
                    aria-invalid={errors.mobileNumber ? "true" : "false"}
                    {...register("mobileNumber", { required: true, pattern: /[9,2]+[0-9]{7}/, maxLength: 8 })}
                    className='p-2 w-full border' />
              </div>
            </div>
            <div className='md:flex md:flex-row'>
              <div className='space-y-0 md:basis-2/3 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>Address</h1>
                  {errors.address && errors.address.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.address && errors.address.type === "maxLength" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Max length exceeded</p>
                  )}
                </div>
                <input
                    type="text"
                    placeholder="Enter Address"
                    aria-invalid={errors.address ? "true" : "false"}
                    {...register("address", { required: true, maxLength: 100 })}
                    className='p-2 w-full border' />
              </div>
              <div className='space-y-0 md:basis-1/3 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>City</h1>
                  {errors.city && errors.city.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.city && errors.city.type === "maxLength" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Max length exceeded</p>
                  )}
                </div>
                <input
                    type="text"
                    placeholder="Enter City"
                    aria-invalid={errors.city ? "true" : "false"}
                    {...register("city", { required: true, maxLength: 50 })}
                    className='p-2 w-full border' />
              </div>
            </div>
            <div className='md:flex md:flex-row pb-4'>
              <div className='space-y-0 md:basis-5/12 px-2'>
                <div className='flex flex-row'>
                  <h1 className='text-sm py-2 px-1'>Postal code</h1>
                  {errors.postalCode && errors.postalCode.type === "required" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">This is required</p>
                  )}
                  {errors.postalCode && errors.postalCode.type === "pattern" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Enter a valid code</p>
                  )}
                  {errors.postalCode && errors.postalCode.type === "maxLength" && (
                      <p className='text-2xs text-red-700 py-2 my-auto' role="alert">Enter a valid code</p>
                  )}
                </div>
                <input
                    type="text"
                    placeholder="Enter Postal code"
                    aria-invalid={errors.postalCode ? "true" : "false"}
                    {...register("postalCode", { required: true, pattern: /[0-9]{4}/, maxLength: 4 })}
                    className='p-2 w-full border' />
              </div>
              <div className='space-y-0 md:basis-3/12 px-2'>
                <h1 className='text-sm py-2 px-1'>Province</h1>
                <select {...register("province", { required: true })} className='hover:cursor-pointer p-2 w-full border'>
                  <option value="Nicosia">Nicosia</option>
                  <option value="Paphos">Paphos</option>
                  <option value="Limassol">Limassol</option>
                  <option value="Larnaca">Larnaca</option>
                  <option value="Famagusta">Famagusta</option>
                </select>
              </div>
              <div className='flex flex-row pt-4 md:basis-4/12 align-middle justify-center px-2'>
                <input type="submit" className='bg-gray-900 align-middle text-white rounded text-xl hover:cursor-pointer hover:bg-gray-600 px-6 py-2 w-full' />
              </div>
            </div>



          </form>
        )}
      </div>
      <div className='py-6 w-full lg:w-7/24'>
        <div className='border-2 shadow-lg flex flex-col p-4 rounded-lg text-lg space-y-0 justify-evenly flex-1'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Items</h2>
          <ul className='-my-6 divide-y divide-gray-200'>
            {Object.values(cartDetails ?? {}).map((entry) => (
              <li key={entry.id} className="flex p-6 w-full">
                <Link href={`/product/${entry.product_data['slug']}`}>
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={entry.image as string}
                      alt="Product image"
                      fill
                      priority={true}
                      sizes="(max-width: 100px) 100vw, (max-width: 100px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <Link href={`/product/${entry.product_data['slug']}`}>
                        <h3>{entry.name}</h3>
                      </Link>
                      <p className="ml-4">€{entry.price}</p>
                    </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {entry.product_data['scent']}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {entry.product_data['weight']}
                      </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">QTY: {entry.quantity}</p>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementItem(entry.id, { count: 1 })}
                        className="text-primary hover:text-primary/80"
                      >
                        <Minus />
                      </button>
                      <button
                        type="button"
                        onClick={() => incrementItem(entry.id, { count: 1 })}
                        className="text-primary hover:text-primary/80"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>€{totalPrice}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
