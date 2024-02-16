"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { Cinzel } from 'next/font/google'
import NavDropDown from '@/app/components/NavDropDown'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: '500'
})

const links = [
  { name: "Home", href: "/" },
  { name: "Candles", href: "/Candles" },
  { name: "Wax Melts", href: "/Wax-Melts" },
  { name: "Gift Boxes", href: "/Gift-Boxes" },
  { name: "Diffusers", href: "/Diffusers" },
  { name: "About", href: "/about" },
];

export default function Navbar() {

  const pathname = usePathname();
  const { cartCount, handleCartClick } = useShoppingCart();
  return (
    <header className="mb-8 border-b">
      <div className='justify-center text-center text-sm'>
        <p className={cinzel.className}>Welcome to Scentique Experience !</p>
        <p className='text-white bg-purple-700'>Minimum order for delivery €15. Free shipping for orders above €50.</p>
      </div>
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <NavDropDown links={links}/>
        <Link href="/">
          <h1 className="text-2xl md:text-4xl">
            <span className={cinzel.className}>Scentique</span>
          </h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex divide-x">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />


            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
            {cartCount != 0 ? (
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">{cartCount}</span>
            ) : null}
          </Button>
        </div>
      </div>
      {/*<div className='flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:hidden align-middle my-1'>*/}
      {/*  <nav className="flex gap-3 w-full items-center justify-between">*/}
      {/*    {links.map((link, idx) => (*/}
      {/*      <div key={idx}>*/}
      {/*        {pathname === link.href ? (*/}
      {/*          <Link*/}
      {/*            className="text-sm md:text-lg font-semibold text-primary"*/}
      {/*            href={link.href}*/}
      {/*          >*/}
      {/*            {link.name}*/}
      {/*          </Link>*/}
      {/*        ) : (*/}
      {/*          <Link*/}
      {/*            href={link.href}*/}
      {/*            className="text-sm md:text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"*/}
      {/*          >*/}
      {/*            {link.name}*/}
      {/*          </Link>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </nav>*/}
      {/*</div>*/}
    </header>
  );
}