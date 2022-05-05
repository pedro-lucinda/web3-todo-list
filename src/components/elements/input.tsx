import React, { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({ value, onChange, ...rest }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      {...rest}
      className="
      text-black border-none shadow-none focus:outline-purple-500
      max-w-sm w-full h-xl p-2 rounded-md
      "
    />
  )
}
