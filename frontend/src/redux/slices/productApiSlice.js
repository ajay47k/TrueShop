// import { deleteProduct } from "../../../../backend/controller/productController"
import { apiSlice } from "./apiSlice"
import { useCreateOrderMutation } from "./ordersApiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts:builder.query({
            query:()=>({
                url:'api/products'
            }),
            provideTags:['Products'],
            keepUnusedDataFor:5
        }),
        getProductDetails:builder.query({
            query:(productID)=>({
                url:`api/products/${productID}`
            }),keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:'api/products',
                method:'POST',
        }),
        invalidatesTags:['Product'],
    }),
    updateProduct:builder.mutation({
        query:(data)=>({
            url:`api/products/${data.productId}`,
            method:'PUT',
            body:data
        }),
        invalidatesTags:['Products']
    }),
    uploadProductImage:builder.mutation({
        query:(data)=>{
            console.log(data)
            return {
                url:`api/upload/`,
                method:'POST', 
                body:data
            }

        },
        invalidatesTags:['Products']
    }),
    deleteProduct:builder.mutation({
        query:(productId)=>
        {
            // console.log("Here we delete")
         return ({
            url:`api/products/${productId}`,
            method:'DELETE'
         })   
        }
    })
})
})
export const {useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,useDeleteProductMutation} = productApiSlice
// THis is not imported to the store because it is a child of the apiSlice and is already being used in the store