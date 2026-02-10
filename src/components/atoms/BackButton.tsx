import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BackButton({ to = '/' }) {
  return (
    <Link href={to} className="flex items-center space-x-1 pb-2 md:pb-0">
      <Image src="/back-arrow.svg" width={18} height={18} alt="Regresar pagina anterior" loading='eager'/>
      <p className='font-bold'>Regresar</p>
    </Link>

  )
}
