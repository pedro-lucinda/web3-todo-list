import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
interface ButtonProps {
  title: string
  onClick: () => void
  style?: string
  isDisabled?: boolean
  isLoading?: boolean
}

export const Button = ({
  title,
  onClick,
  style,
  isDisabled = false,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`max-w-sm w-full bg-violet-400 h-10 rounded-md ${style} flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        title
      )}
    </button>
  )
}
