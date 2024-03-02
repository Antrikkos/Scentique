import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import React from "react";
import ProductDetails from "@/app/components/ProductDetails";
import BackButton from "@/app/components/BackButton";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          "scentsNames": scents[]->name,
          'weightsObj': weights[]->{price, weight},
          price_id
      }`;

  return await client.fetch(query);
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white pb-10">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <BackButton />
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <ProductDetails fullProduct={data} />
        </div>
      </div>
    </div>
  );
}
