import { AuthButton } from '@/components/elements/auth-button'
import { useRouter } from 'next/router'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const LoginView = () => {
  const { authenticate, account, isAuthenticated } = useMoralis()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated && account) {
   router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, account])

  return (
    <div className="w-full h-[50%] flex flex-col justify-center items-center ">
      <h1 className="text-6xl font-bold">Web3 todo list</h1>
      <h1>Connect Wallet to get started</h1>
      <AuthButton />
    </div>
  )
}
