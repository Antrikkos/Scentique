import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...4] {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;

  // const data = await client.fetch(query);
  return await client.fetch(query);
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();
  // console.log(data)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          <Link className="text-primary flex items-center gap-x-1" href={'/All'}>
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative p-3 border-0 rounded-lg shadow-2xl">
              <Link href={`/product/${product.slug}`}>
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  // width={300}
                  // height={300}
                  fill
                  sizes="(max-width: 300px) 100vw, (max-width: 300px) 50vw, 33vw"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                      {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                {/*<p className="text-sm font-medium text-gray-900">*/}
                {/*  €{product.price}*/}
                {/*</p>*/}
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
