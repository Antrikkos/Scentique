"use client";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Plus, Minus } from "lucide-react";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/material.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import {useRouter} from 'next/navigation';

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


  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter();
  const onSubmit = async(data) => {

    let items: OrderItem[] = [];
    Object.values(cartDetails ?? {}).map(entry => {
      let item: OrderItem = {
        name: entry.name,
        slug: entry.product_data['slug'],
        quantity: entry.quantity,
        image: entry.image,
        price: entry.price,
        color: entry.product_data['color'],
        scent: entry.product_data['scent'],
      }
      items.push(item);
    })

    const addressDetails: address = {
      title: data['Title'],
      firstName: data['First name'],
      lastName: data['Last name'],
      email: data['Email'],
      mobileNumber: data['Mobile number'],
      address: data['Address'],
      city: data['City'],
      province: data['Province'],
      postalCode: data['Postal code'],
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
    }, )

    // console.log(response);
    clearCart();
    router.push('/success')
  };

  return (
    <div className='flex lg:space-x-5 flex-col-reverse lg:flex-row'>
      <div className='py-6 sm:w-full lg:w-7/12'>
        {cartCount === 0 ? (
          <Link href='/'>
            <h1 className="py-6">You dont have any items in your basket please return to the home page.</h1>
          </Link>
        ) : (
          // <div className='py-6'>
          //   <div>
          //     <div className="py-4">
          //       <PhoneInput
          //         country={'cy'}
          //         onlyCountries={['cy']}
          //         countryCodeEditable={false}
          //       />
          //     </div>
          //   </div>
          // </div>
          <form onSubmit={handleSubmit(onSubmit)} className='border-2 shadow-lg flex flex-col p-2 rounded-lg text-sm md:text-md lg:text-md space-y-1 justify-evenly flex-1'>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Title</h1>
              <select {...register("Title", { required: true })} className='p-2 hover:cursor-pointer w-20'>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>First Name</h1>
            <input type="text" placeholder="Enter First name" {...register("First name", {required: true, maxLength: 80})} className='w-52 p-2' />
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Last Name</h1>
            <input type="text" placeholder="Enter Last name" {...register("Last name", {required: true, maxLength: 100})} className='w-52 p-2' />
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Email</h1>
            <input type="email" placeholder="Enter Email" {...register("Email", {required: true})} className='w-96 p-2' />
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Mobile number</h1>
              <input type="tel" placeholder="Enter Mobile number" {...register("Mobile number", {required: true, maxLength: 8, minLength: 8})} className='w-40 p-2' />
              </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Address</h1>
              <input type="text" placeholder="Enter Address" {...register("Address", {required: true})} className='w-72 p-2' />
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>City</h1>
              <input type="text" placeholder="Enter City" {...register("City", {required: true})} className='w-72 p-2' />
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Province</h1>
              <select {...register("Province", { required: true })} className='w-32 hover:cursor-pointer p-2'>
                <option value="Nicosia">Nicosia</option>
                <option value="Paphos">Paphos</option>
                <option value="Limassol">Limassol</option>
                <option value="Larnaca">Larnaca</option>
                <option value="Famagusta">Famagusta</option>
              </select>
            </div>
            <div className='space-y-0'>
              <h1 className='text-sm py-2 px-1'>Postal code</h1>
              <input type="text" placeholder="Enter Postal code" {...register("Postal code", {required: true})} className='w-36 p-2' />
            </div>
            <input type="submit" className='h-auto bg-purple-400 p-6 align-middle text-white rounded text-xl hover:cursor-pointer hover:bg-purple-600'/>
          </form>
        )}
      </div>
      <div className='py-6 w-full lg:w-5/12'>
        <div className='border-2 shadow-lg flex flex-col p-2 rounded-lg text-lg space-y-0 justify-evenly flex-1'>
          <h1 className='text-primary p-2 text-2xl border-b border-gray-200'>Items</h1>
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
                    {entry.product_data['scent'] !== null && entry.product_data['color'] !== null ? (
                      <div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {entry.product_data['scent']}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {entry.product_data['color']}
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">QTY: {entry.quantity}</p>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementItem(entry.id, {count:1})}
                        className="text-primary hover:text-primary/80"
                      >
                        <Minus />
                      </button>
                      <button
                        type="button"
                        onClick={() => incrementItem(entry.id, {count:1})}
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
