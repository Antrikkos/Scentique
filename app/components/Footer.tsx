import { Instagram, Copyright } from 'lucide-react'
import Link from 'next/link'
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='text-center mt-auto py-6 bg-gray-900 text-white'>
      <div className={'flex flex-row justify-center'}>
        <div className={'flex flex-col'}>
          <div className='mx-auto flex flex-row items-center space-x-4 pb-4'>
            <Link href={'https://www.instagram.com/scentique_cy/'} target={'_blank'} className='mx-auto'>
              <Instagram />
            </Link>
            <Link href={'https://www.tiktok.com/@scentique_cy'} target={'_blank'} className='mx-auto'>
              <FaTiktok size={22}/>
            </Link>
          </div>
          <p className='text-sm font-light'>© 2024, Scentique. All rights reserved</p>

        </div>
      </div>
    </footer>
  )
}