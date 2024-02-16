import { Instagram, Copyright } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='text-center mt-auto py-6 bg-gray-900 text-white'>
      <div className={'flex flex-row justify-center'}>
        <div className={'flex flex-col'}>
          <Link href={'https://www.instagram.com/scentique_cy/'} target={'_blank'} className='mx-auto pb-2'>
            <Instagram />
          </Link>
          <p className='text-sm font-light'>© 2024, Scentique. All rights reserved</p>

        </div>
      </div>
    </footer>
  )
}