"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import {Minus, Plus} from "lucide-react";
import {useState} from "react";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  id: string;
  scent: string;
  weightObj: {
    price: number;
    weight: string;
  }
  slug: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  id,
  scent,
  weightObj,
  slug,
}: ProductCart) {

  const [count, setCount] = useState(1);

  const { addItem, handleCartClick, cartDetails } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
    id: id,
  };
  return (
      <div className="flex flex-row space-x-4">
        <div className="flex space-x-6 align-middle border rounded-md items-center px-2 shadow">
          <button
              type="button"
              onClick={() => {
                if (count !== 1)
                  setCount(count-1)
              }}
              className="text-primary hover:text-primary/80"
          >
            <Minus />
          </button>
          <p className="min-w-5 text-center">{count}</p>
          <button
              type="button"
              onClick={() => setCount(count+1)}
              className="text-primary hover:text-primary/80"
          >
            <Plus />
          </button>
        </div>
        <Button
            className="border rounded-md shadow"
            onClick={() => {
              if (weightObj.price !== null) {
                product.price = weightObj.price
                product.id = product.id + weightObj.weight
              }
              addItem(product, {
                count: count,
                product_metadata: {
                  scent: scent,
                  slug: slug,
                  weight: weightObj.weight,
                },
              })
              handleCartClick();
              setCount(1);
            }}
        >
          Add To Cart
        </Button>
      </div>

  );
}
