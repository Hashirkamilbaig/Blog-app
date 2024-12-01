'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
      <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="">
          <Image src={assets.upload_area} width={140} height={70} alt='' className='mt-4'/>
        </label>
      </form>
    </>
  )
}

export default page