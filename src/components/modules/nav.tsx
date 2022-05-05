import { useRouter } from 'next/router'
import React from 'react'
import { AuthButton } from '../elements/auth-button'

export const Nav = () => {
  const router = useRouter()
  return (
    <div
      className={`max-w-7xl mx-auto flex ${
        router.pathname !== '/' ? 'justify-between' : 'justify-center'
      } items-center  h-20 p-4 mb-10`}
    >
      <h1 className="font-bold text-xl">On time</h1>
      {router.pathname !== '/' && <AuthButton />}
    </div>
  )
}
