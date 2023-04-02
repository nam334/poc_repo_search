import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
const Search = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState(false)
  return (
    <>
    <motion.div 
    className='flex items-center justify-center 
     bg-slate-500'
     animate = {{
        height: open ? 400 : 100
     }}
    >
   {
    text ? <div className='flex justify-center items-center'>
    <input type='text' placeholder='Enter text....' />
    <button type="button" class="rounded-md p-2 inline-flex items-center justify-center 
     text-gray-400 hover:text-gray-600 hover:bg-slate-50  focus:outline-none focus:ring-2 
      focus:ring-inset focus:ring-indigo-500" 
      onClick={()=> {
        setText(false) 
        setOpen(false)

      }}>
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
    </div> :  <button
    className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
    type="button"
    id="button-addon1"
    data-te-ripple-init
    data-te-ripple-color="light" 
    onClick={()=> {
        setOpen(true) 
        setText(true)
        }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd" />
    </svg>
  </button>
   }
    </motion.div>
    </>
  )
}

export default Search