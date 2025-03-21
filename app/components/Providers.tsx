"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="https://scentiquecy.vercel.app/success"
      cancelUrl="https://scentiquecy.vercel.app/"
      currency="EUR"
      // billingAddressCollection={false}
      shouldPersist={true}
    // language="en-US"
    >
      {children}
    </USCProvider>
  );
}
