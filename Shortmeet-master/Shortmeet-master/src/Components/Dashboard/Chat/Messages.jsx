import React from 'react'
import './Messages.css'
export default function Messages({ name, message }) {
  return (
    <div className="px-3 py-2 bg-gray-800 rounded text-left mt-2  text-normal">
      <p className='text-xs text-slate-500'>{name}</p>
      <p className='text-slate-300 mt-1 text-xs'>{message}</p>
    </div>
  )
}
