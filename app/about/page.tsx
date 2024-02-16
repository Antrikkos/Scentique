import React from "react";
import {client, urlFor} from '@/app/lib/sanity'
import Image from 'next/image'

async function getData() {
  const query = "*[_type == 'aboutImage'][0]";

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const data = await getData();

  return (
    <div className="bg-white mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8 space-y-6 pb-10">
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>About Scentique</h1>

      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="space-y-3">
          <p>
            Welcome to Scentique, where we believe that a single flame has the power to ignite countless moments of
            warmth, comfort, and serenity.
          </p>
          <p>
            Our story is one of passion, craftsmanship, and an unwavering commitment to quality. It all began with a
            simple fascination for the art of candle-making – the alchemy of blending wax, fragrance, and wick to create
            something truly magical. What started as a humble hobby quickly evolved into a full-fledged endeavor fueled
            by our love for creating sensory experiences that elevate the everyday.
          </p>
          <p>
            At Scentique, we pour our hearts and souls into every candle we make. Each one is meticulously crafted by
            hand, using only the finest ingredients sourced from trusted suppliers. From premium soy wax that burns
            cleanly and evenly to carefully curated fragrance oils that transport you to distant memories and far-off
            places, every element is chosen with care to ensure a superior product that delights the senses and
            nourishes the soul.
          </p>
        </div>
        <div
          className='overflow-hidden rounded-lg bg-gray-100 md:left-16 md:top-16 lg:ml-0 shadow-2xl'>
          <Image
            src={urlFor(data.image1).url()}
            alt='Great Photo'
            className='h-full w-full object-cover object-center'
            priority
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div
          className='hidden lg:flex overflow-hidden rounded-lg bg-gray-100 md:left-16 md:top-16 lg:ml-0 shadow-2xl'>
          <Image
            src={urlFor(data.image2).url()}
            alt='Great Photo'
            className='h-full w-full object-cover object-center'
            priority
            width={500}
            height={500}
          />
        </div>
        <div className="space-y-3">
          <p>
            But our dedication to excellence goes beyond just the finished product. We are deeply committed to
            sustainability and ethical practices every step of the way. That's why we prioritize eco-friendly materials,
            recyclable packaging, and responsible manufacturing processes that minimize our impact on the planet. We
            believe that beauty should never come at the expense of the environment, and we strive to lead by example in
            everything we do.
          </p>
          <p>
            At the heart of our brand is a celebration of life's simple pleasures – the joy of curling up with a good
            book by the glow of a candle, the comfort of coming home to familiar scents that evoke memories of love and
            laughter, the sense of peace that washes over you as you inhale the calming aroma of lavender or eucalyptus.
          </p>

        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-x-6">
        <div className="space-y-3">
          <p>
            Whether you're searching for the perfect gift for a loved one, seeking to create a cozy ambiance in your
            home, or simply treating yourself to a moment of self-care, we invite you to explore our collection and
            discover the transformative power of scent. From our signature blends inspired by nature's bounty to our
            limited edition releases that capture the essence of the seasons, each candle is a testament to our
            dedication to craftsmanship, quality, and the pursuit of beauty in the everyday.
          </p>
          <p>
            Thank you for choosing Scentique to accompany you on your journey. We are honored to be a
            part of your story and look forward to illuminating your world with the warmth and fragrance of our candles.
          </p>
        </div>
        <div
          className='hidden lg:flex overflow-hidden rounded-lg bg-gray-100 md:left-16 md:top-16 lg:ml-0 shadow-2xl'>
          <Image
            src={urlFor(data.image3).url()}
            alt='Great Photo'
            className='h-full w-full object-cover object-center'
            priority
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}