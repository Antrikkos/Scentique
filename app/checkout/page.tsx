import React from "react";
import CheckoutForm from '@/app/components/CheckoutForm'
import BackButton from "@/app/components/BackButton";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <BackButton />
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Checkout Page</h2>
        <CheckoutForm />
      </div>
    </div>

  );
}