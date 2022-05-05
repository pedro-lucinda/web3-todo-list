import React from 'react'

export interface Option {
  name: string
  value: number
}

interface SelectProps {
  options: Option[]
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export const Select = ({ options, onChange }: SelectProps) => {
  return (
    <div className="flex justify-center max-w-sm w-full">
      <div className="mb-3 w-full">
        <select
          onChange={onChange}
          className="form-select appearance-none
            block
            w-full
            px-3
            py-1.5
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
          aria-label="Default select"
        >
          <option selected>Select a Status</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
