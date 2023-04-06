import React, { useEffect, useRef } from 'react'
import { PRODUCTS_ENDPOINT } from '../config'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {FaRupeeSign} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, searchProducts } from '../productSlice'
import ShowMoreText from "react-show-more-text";
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui'
import { useSpeechContext } from '@speechly/react-client'
const Search = () => {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [transcript, setTranscript] = useState('')
    const dispatch = useDispatch()
    const filteredProducts = useSelector(store => store.product.filteredProducts)
    const inputRef = useRef()
    const {segment} = useSpeechContext()

    useEffect(()=>{
      if(segment){
        console.log(segment)
        setTranscript(segment)
        if(segment.intent.intent === 'search_product'){
          // dispatch(searchProducts(e.target.value))
          console.log(segment.intent.intent)
        }
        if(segment.intent.intent === 'clear_search'){
         // setTranscript("")
          dispatch(searchProducts(''))
          setTranscript("")
         // console.log(segment.intent.intent)
        }
        segment.entities.forEach((e)=>{
          dispatch(searchProducts(e.value))
        })
      }
    },[segment])
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
    // useEffect(()=>{
    //     inputRef.current.autofocus = true
    // },[inputRef, searchText])
  return (
    <>
   <div className='h-screen'> 
   <motion.div 
    className='flex bg-white shadow-md'
     animate = {{
        height: open ? 230 : 70,
        delay: 1
     }}
    
    >
   {
    text ? <>
    <div className='flex flex-col'>
    <div className='flex items-center p-5 mt-10 flex-col '>
      <div className='flex border-b-2 border-teal-800 p-3'>
      <input type='text' placeholder='Type what you are looking for...' 
     className='font-mono w-[800px] h-8 placeholder-teal-900
    focus:outline-none text-2xl font-semibold placeholder-p-4' 
    ref={inputRef}
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
      </div>
    <div className='italic self-start  p-3'>
     
      <h4 className='text-teal-950'>
        For voice search plz press and hold the microphone and speak in the following format - Eg
        <span className='font-semibold'>
        "Search for product with/under name Mens Cotton Jacket "
        </span>  
      </h4>
      <h5 className='text-teal-950'>
        To clear your search plz say - Eg 
        <span className='font-semibold'>
          "Clear search"
        </span>
      </h5>
   
      <h5 className='font-thin'>
      {
        transcript && (
          <>
          {transcript.words.map((w) => w.value).join(" ")}
          </>
        )
    }
      </h5>
    </div>
           
  
  <div className='border-b-2 border-teal-900  ml-5'></div>
    </div>
    <PushToTalkButtonContainer>
      <PushToTalkButton/>
      {/* <ErrorPanel/> */}
    </PushToTalkButtonContainer>
   
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
        setTimeout(()=>{
            setText(true)
        },150)
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
   <div className='p-3 flex flex-col hover:bg-slate-200 items-center  max-w-sm 
    m-4 mx-2 justify-between text-slate-500 fira-sans bg-slate-100 rounded-md'>
    <div className=' p-4  cursor-pointer  flex justify-center items-center'>
    <div>
    <h2 className='text-sm font-semibold text-slate-600 my-2'>{filteredProduct.title}</h2>
    <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css text-sm"
                anchorClass="show-more-less-clickable bold"
                //onClick={this.executeOnClick}
                expanded={false}
                width={280}
                truncatedEndingComponent={"... "}
            >
    <h4>
    {filteredProduct.description}
    </h4>
    </ShowMoreText>
    </div>
  
    <img src={filteredProduct.image} alt="" className='w-28 mb-2 h-36 p-2 rounded-md' /> 
    </div>
  
    <div className="flex items-center justify-between  w-full">  
    <div className="flex items-center">
    <FaRupeeSign/>
    <h4 className='text-sm py-2 text-black-200 font-bold'>
         {
          <span className='strike mr-1'>{filteredProduct.price}</span> 
         } 
    </h4>
    </div>
    <div className="flex items-center">
    <h4 className='text-sm py-2 text-black-200 font-semibold'>{filteredProduct?.rating?.rate}</h4>
    <AiFillStar className='ratingStar' fill="#FF007F" />
    </div>
    </div> 
    </div>
        </>) : 
        <>
           <h1 className='font-mono text-teal-900 text-3xl mx-auto my-auto p-6'>No products</h1>
        </>
   }
   </div>
   </div>
  
    </>
  )
}

export default Search