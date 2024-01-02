import React from "react";
import {CheckCheck} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  return (
    // <div className="bg-white mx-auto max-w-2xl px-6  lg:max-w-7xl lg:px-8">
    //   <h1 className='font-bold text-3xl text-primary pt-7 pb-2 border-b-2 border-purple-900'>Thank you</h1>
    // </div>
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Thank you for your order!
          </h3>
          <p className="text-gray-600 my-2">
            We hope you enjoy it
          </p>
          <p>Have a great day!</p>

          <Button asChild className="mt-5">
            <Link href="/">Go back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}