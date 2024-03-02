import React from "react";
import CheckoutForm from '@/app/components/CheckoutForm'
import BackButton from "@/app/components/BackButton";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <BackButton />
        <h1 className='font-bold text-3xl text-primary pb-2 border-b-2 border-purple-900'>Checkout Page</h1>
        <CheckoutForm />
      </div>
    </div>

  );
}