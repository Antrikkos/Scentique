import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import React from "react";
import ProductDetails from "@/app/components/ProductDetails";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          colors,
          "slug": slug.current,
          "categoryName": category->name,
          "scentsNames": scents[]->name,
          price_id
      }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <ProductDetails fullProduct={data}/>
          {/*<div className="md:py-8">*/}
          {/*  <div className="mb-2 md:mb-3">*/}
          {/*    <span className="mb-0.5 inline-block text-gray-500">*/}
          {/*      {data.categoryName}*/}
          {/*    </span>*/}
          {/*    <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">*/}
          {/*      {data.name}*/}
          {/*    </h2>*/}
          {/*  </div>*/}
          {/*  <div className="mb-4">*/}
          {/*    <div className="flex items-end gap-2">*/}
          {/*      <span className="text-xl font-bold text-gray-800 md:text-2xl">*/}
          {/*        €{data.price}*/}
          {/*      </span>*/}
          {/*    </div>*/}
          {/*    <ScentsDropDown scents={data.scentsNames} />*/}
          {/*    <ColorsDropDown colors={data.colors} />*/}
          {/*    <span className="text-sm text-gray-500">*/}
          {/*      Incl. Vat plus shipping*/}
          {/*    </span>*/}
          {/*  </div>*/}

          {/*  <div className="mb-6 flex items-center gap-2 text-gray-500">*/}
          {/*    <Truck className="w-6 h-6" />*/}
          {/*    <span className="text-sm">3-4 Day Shipping</span>*/}
          {/*  </div>*/}

          {/*  <div className="flex gap-2.5">*/}
          {/*    <AddToBag*/}
          {/*      currency="EUR"*/}
          {/*      description={data.description}*/}
          {/*      image={data.images[0]}*/}
          {/*      name={data.name}*/}
          {/*      price={data.price}*/}
          {/*      id={data.slug+data.colors[0]+data.scentsNames[0]}*/}
          {/*      price_id={data.price_id}*/}
          {/*      color={data.colors[0]}*/}
          {/*      scent={data.scentsNames[0]}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <p className="mt-12 text-base text-gray-500 tracking-wide">*/}
          {/*    {data.description}*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
