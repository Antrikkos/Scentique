'use client'

import React, {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'

interface iAppProps {
  weights: [
    {
      price: number;
      weight: string;
    }
  ];
  selected: {
    price: number;
    weight: string;
  };
  setSelected: any;
}

export default function WeightsDropDown({weights, selected, setSelected}: iAppProps) {

  return (
    <div>
      <div>
        <span className='text-xl font-bold text-gray-800 md:text-2xl'>
            €{selected.price}
        </span>
        <div className='py-4 w-72' style={{position: 'relative', zIndex: 1}}>
          <p>Select Weight</p>
          <Listbox value={selected} onChange={(value: {price: number, weight: string}) => {
            setSelected({price: value.price, weight: value.weight})
          }}>
            <div className='relative mt-1'>
              <Listbox.Button
                className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                <span className='block truncate'>{selected.weight}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options
                  className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                  {weights.map((weight: {price: number, weight: string}) => (
                    <Listbox.Option
                      key={(weight.weight + weight.price)}
                      className={({active}) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={weight}
                    >
                      {({selected}) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                              {weight.weight}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>

  )
}
