"use client"

import React, {useReducer, useState} from "react";
import ScentsDropDown from "@/app/components/ScentsDropDown";
import WeightsDropDown from "@/app/components/WeightsDropDown";
import { Truck } from "lucide-react";
import AddToBag from "@/app/components/AddToBag";

import { fullProduct } from "@/app/interface";

interface iAppProps {
  fullProduct: any;
}

function reducer(state: any, action: { price: number; weight: string; }) {

    return {
        price: action.price,
        weight: action.weight
    }
    // throw Error('Unknown action.');
}

export default function ProductDetails({ fullProduct }: iAppProps) {

  const {
    images,
    price,
    slug,
    categoryName,
    name,
    description,
    scentsNames,
    weightsObj,
    price_id,
    _id,
  } = fullProduct;

  const [selectedWeight, setSelectedWeight] = useReducer(reducer, { price: null, weight: null });
  if (weightsObj && selectedWeight.price === null) {
      setSelectedWeight({ price: weightsObj[0].price, weight: weightsObj[0].weight })
  }
  const [selectedScent, setSelectedScent] = useState(scentsNames[0]);

  return (
    <div className="md:py-8">
      <div className="mb-2 md:mb-3">
        <span className="mb-0.5 inline-block text-gray-500">
          {categoryName}
        </span>
        <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
          {name}
        </h2>
      </div>
      <div className="mb-4">
        {weightsObj === null ? (
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-gray-800 md:text-2xl">
              €{price}
            </span>
          </div>
        ) : (weightsObj.length === 1 ? (
          <div>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-gray-800 md:text-2xl">
                €{weightsObj[0].price}
              </span>
            </div>
            <div className='flex flex-col py-2'>
              <p>Weight</p>
              <p className='p-2 w-fit border rounded-lg shadow-md'>{weightsObj[0].weight}</p>
            </div>
          </div>
            ) : (
                <WeightsDropDown weights={weightsObj} selected={selectedWeight} setSelected={setSelectedWeight} />
            )
        )}

        {scentsNames.length === 1 ? (
          <div className='flex flex-col py-2'>
            <p>Scent</p>
            <p className='p-2 w-fit border rounded-lg shadow-md'>{scentsNames[0]}</p>
          </div>
        ) : (
          <ScentsDropDown scents={scentsNames} selected={selectedScent} setSelected={setSelectedScent} />
        )}

        <span className="text-sm text-gray-500">
          Tax included. Shipping calculated at checkout.
        </span>
      </div>

      <div className="mb-6 flex items-center gap-2 text-gray-500">
        <Truck className="w-6 h-6" />
        <span className="text-sm">3-5 Day Shipping</span>
      </div>

      <div className="flex gap-2.5">
        <AddToBag
          currency="EUR"
          description={description}
          image={images[0]}
          name={name}
          price={price}
          id={slug + selectedScent}
          price_id={price_id}
          scent={selectedScent}
          weightObj={selectedWeight}
          slug={slug}
        />
      </div>

      <p className="mt-12 text-base text-gray-500 tracking-wide">
        {description}
      </p>
    </div>
  );
}