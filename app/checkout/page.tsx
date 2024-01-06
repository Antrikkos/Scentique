import React from "react";
import CheckoutForm from '@/app/components/CheckoutForm'

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {

  return (
    <div  className="bg-white h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h1 className='font-bold text-3xl text-primary pt-7 pb-2 border-b-2 border-purple-900'>Checkout Page</h1>
        <CheckoutForm />
      </div>
    </div>

  );
}