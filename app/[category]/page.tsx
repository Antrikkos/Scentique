import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData(category: string) {
  let query;
  if (category == "All") {
    query = `*[_type == "product"] {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name
      }`;

  } else {
    query = `*[_type == "product" && category->name == "${category}"] | order(_createdAt desc) {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name
      }`;
  }

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  params.category = params.category.replace(/-/g, ' ')
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for {params.category}
          </h2>
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
