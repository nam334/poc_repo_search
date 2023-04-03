import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        filteredProducts:[]
    },
    reducers:{
        addProducts:(state, action) => {
            state.products = state.products.concat(action.payload)
        },
        searchProducts:(state, action) => {
            console.log(action.payload)
            state.filteredProducts = state.products.filter((item) => item.title.toLowerCase().trim().match(action.payload.toLowerCase().trim()))
        }
    }
})

export const {addProducts, searchProducts} = productSlice.actions 
export default productSlice.reducer