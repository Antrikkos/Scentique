"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Plus, Minus } from "lucide-react";
import 'react-phone-input-2/lib/material.css'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    incrementItem,
    decrementItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();



  const router = useRouter()

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    handleCartClick();
    await router.push('/checkout');
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-min">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <Link href={`/product/${entry.product_data['slug']}`}>
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={entry.image as string}
                            alt="Product image"
                            // width={100}
                            // height={100}
                            fill
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
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>€{totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Enter your phone number below to contact you about the order.
            </p>
            <div className="mt-6">
              <Button onClick={handleCheckoutClick} className="w-72" disabled={cartCount === 0}>
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
