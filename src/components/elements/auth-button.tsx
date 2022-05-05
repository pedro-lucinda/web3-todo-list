import { getEllipsisTxt } from '@/helpers/formatters'
import useMetaMaskOnboarding from '@/hooks/blockchain/useMetamaskOnboarding'
import React from 'react'
import { useMoralis } from 'react-moralis'
import { MetamaskLogo } from './metamask-logo'
import { FaSignOutAlt } from 'react-icons/fa'

export const AuthButton = () => {
  const { authenticate, isAuthenticated, account, logout } = useMoralis()
  const { startOnboarding } = useMetaMaskOnboarding()

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await authenticate()
      } catch (e) {
        console.log(e)
      }
    } else {
      startOnboarding()
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center">
          Connected: {getEllipsisTxt(account as string)}
          <FaSignOutAlt
            onClick={logout}
            className="hover:scale-x-95 cursor-pointer ml-2"
          />
        </div>
      ) : (
        <button
          className="flex items-center my-5 w-40 h-[3rem] rounded-lg bg-violet-400  justify-center hover:scale-[0.98] transition-[scale] hover:bg-violet-500"
          onClick={connect}
        >
          <MetamaskLogo />
          Connect Wallet
        </button>
      )}
    </>
  )
}
