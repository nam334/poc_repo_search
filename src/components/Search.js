import React, { useEffect } from 'react'
import { PRODUCTS_ENDPOINT } from '../config'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {FaRupeeSign} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, searchProducts } from '../productSlice'
const Search = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState(false)
    const [searchText, setSearchText] = useState('')
    const dispatch = useDispatch()
    const filteredProducts = useSelector(store => store.product.filteredProducts)
    console.log(filteredProducts && filteredProducts)
    useEffect(()=> {
        const fetchData = async () => {
            const data = await fetch(PRODUCTS_ENDPOINT)
            const result  = await data.json()
            dispatch(addProducts(result))
            console.log(result)
        }
        // const fetchedProducts = fetchData()
        // console.log(fetchedProducts)
        fetchData()
    },[])
  return (
    <>
   <div className=' h-screen'> 
   <motion.div 
    className='flex  bg-white'
     animate = {{
        height: open ? 230 : 70
     }}
    >
   {
    text ? <>
    <div className='flex flex-col'>
    <div className='flex items-center p-5 mt-10 '>
    <input type='text' placeholder='Type what you are looking for...' 
     className='font-mono w-[800px] h-8 placeholder-teal-900
    focus:outline-none text-2xl font-semibold placeholder-p-4' 
    value={searchText}
    onChange={(e) => {
        setSearchText(e.target.value) 
        dispatch(searchProducts(e.target.value))
    }}
    />
    <button type="button" class="rounded-full p-2 inline-flex items-center bg-slate-50
     text-teal-700 hover:text-teal-900 hover:bg-slate-50  focus:outline-none focus:ring-2 
      focus:ring-inset focus:ring-indigo-500" 
      onClick={()=> {
        setText(false) 
        setOpen(false)

      }}>
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
              aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <hr/>
    </div>
    <div className='border-b-2 border-teal-900  ml-5'></div>
    </div>
   
    </>
    :  <button
    className="relative z-[2] flex items-center rounded-r 
     px-6 py-2.5 text-sm font-medium uppercase leading-tight text-slate-500
    transition duration-150 ease-in-out 
   focus:outline-none "
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
    <div className='flex flex-wrap '>
   {
    filteredProducts.length ? filteredProducts.map(filteredProduct => <>
   <div className='p-3 flex flex-col hover:bg-slate-200 items-center  w-96 
    m-4 mx-2 justify-between text-slate-500 fira-sans bg-slate-100 rounded-md'>
    <div className=' p-4  cursor-pointer  flex justify-center items-center'>
    <h2 className='text-sm font-semibold text-slate-600 my-2'>{filteredProduct.title}</h2>
    <img src={filteredProduct.image} alt="" className='w-28 mb-2 h-36 ' /> 
    </div>
    <div className="flex items-center justify-between  w-full">  
    <div className="flex items-center">
    <FaRupeeSign/>
    <h4 className='text-sm py-2 text-black-200 font-bold'>
         {/* {product.price} */}
         {
         
          <span className='strike mr-1'>{filteredProduct.price}</span> 
       
         } 
    </h4>
    </div>
    <div className="flex items-center">
    <h4 className='text-sm py-2 text-black-200 font-semibold'>{filteredProduct?.rating?.rate}</h4>
    <AiFillStar className='ratingStar' fill="#FF007F" />
    {/* <Icon fill="#FF007F"/> */}
  
    </div>
    </div> 
    </div>
        </>) : <h1>No products</h1>
   }
   </div>
   </div>
  
    </>
  )
}

export default Search