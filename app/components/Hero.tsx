import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  const data = await client.fetch(query);

  return data;
}

export default async function Hero() {
  const data = await getData();
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Light. Relax. Repeat.
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            Let our candles be the silent storytellers of your home, filling each room with tales of tranquility.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 md:left-16 md:top-16 lg:ml-0 shadow-2xl">
            <Image
              src={urlFor(data.image1).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-2xl">
            <Image
              src={urlFor(data.image2).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-16 w-96 divide-x overflow-hidden rounded-lg border p-3 shadow-2xl">
          <Link
            href="/Candles"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:text-primary font-semibold"
          >
            Candles
          </Link>
          <Link
            href="/Wax-Melts"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:text-primary font-semibold"
          >
            Wax Melts
          </Link>
          <Link
            href="/Gift-Boxes"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:text-primary font-semibold"
          >
            Gift Boxes
          </Link>
        </div>
      </div>
    </section>
  );
}