import React from 'react'
import { Nav } from '../modules/nav'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex-col bg-gradient-to-b from-[#2B1C48] to-[#0D061B] text-white">
      <Nav />
      {children}
    </div>
  )
}
