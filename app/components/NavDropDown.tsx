"use client"

import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AlignJustify } from "lucide-react";
import Link from 'next/link'

export default function NavDropDown({links}) {

  return (
    <Menu as="div" className="relative inline-block lg:hidden">
      <Menu.Button className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none">
        <AlignJustify />
      </Menu.Button>
      <Menu.Items className="absolute z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {links.map((link) => (
          /* Use the `active` state to conditionally style the active item. */
          <Menu.Item key={link.href} as={Fragment}>
            {({ active }) => (
              <a
                href={link.href}
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                {link.name}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
