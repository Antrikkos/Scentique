"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

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
    <Button
      onClick={() => {
        if (weightObj.price !== null) {
          product.price = weightObj.price
          product.id = product.id + weightObj.weight
        }
        addItem(product, {
          count: 1,
          product_metadata: {
            scent: scent,
            slug: slug,
            weight: weightObj.weight,
          },
        })
        handleCartClick();
        console.log(cartDetails)
      }}
    >
      Add To Cart
    </Button>
  );
}
