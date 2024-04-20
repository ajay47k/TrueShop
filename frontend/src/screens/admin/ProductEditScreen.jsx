import React from 'react'
import {useState,useEffect} from "react"
import {Link,useNavigate,useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Form,Button} from "react-bootstrap"
import Message from "./../../components/Message"
import Loader from './../../components/Loader'
import FormContainer from "./../../components/FromContainer"

import {toast} from "react-toastify"

// import {listProductDetails,updateProduct} from "./../../actions/productActions"
import { useUpdateProductMutation,useGetProductDetailsQuery, useUploadProductImageMutation} from '../../redux/slices/productApiSlice'
function ProductEditScreen() {
    const {id:productId}= useParams()
    const navigate = useNavigate()
    const [name,setName]=useState("")
    const [image,setImage]=useState("")
    const [brand,setBrand]=useState("")
    const [category,setCategory]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState(0)
    const [countInStock,setCountInStock]=useState(0)
const {data:product,isLoading,refetch,error}=useGetProductDetailsQuery(productId)
// console.log(product)
const [updateProduct,{isLoading:loadingUpdate}]  = useUpdateProductMutation()

useEffect(()=>{
    if (product){
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
    }
},[product])
const submitHandler = async(e)=>{
    e.preventDefault()
    console.log("Here")
    const updatedProduct={
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
    }
    const result = await updateProduct(updatedProduct)
    if(result.error){
        toast.error(result.error)
    }else{
        toast.success('Product updated')
        navigate('/admin/productlist')
    }
}
const [uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation()
// const uploadFileHandler = async(e)=>{
//     // console.log(e.target.files[0])
//     // console.log("here")
//     const formData= new FormData()
//     formData.append('image',e.target.files)
//     console.log(formData)
//     try{
//         const res= await uploadProductImage(formData).unwrap()
//         toast.success(res.message)
//         setImage(res.image)
//     }
//     catch(err){
//         toast.error(err?.data?.message|| err.error ||err.message)
//     }
// }
const uploadFileHandler = async (e) => {
    const formData = new FormData();
    // console.log(e.target.files[0])
    // console.log(formData)
    formData.append('image', e.target.files[0])
    // formData.image=e.target.files[0]
    // for (const [key, value] of formData.entries()) {
    //     console.log(key, value);
    // }
    try {
      const res = await uploadProductImage(formData).unwrap()
      console.log("Here")
      toast.success(res.message)
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

 
return (
    <>
    <Link to="/admin/productlist" className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate &&<Loader/>}
        {isLoading?<Loader/>:error? <Message variant='danger'>{error}</Message>:(
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='price' className='my-2'>
            <Form.Label>Price</Form.Label>
                <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            {/* {Imageinput placeholder} */}
            <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e)=>setImage(e.target.value)}
                ></Form.Control>
                   <Form.Control 
                   type='file' 
                   label='Choose file' 
                   onChange={uploadFileHandler}
                   >
                   </Form.Control>

            </Form.Group>
            <Form.Group controlId='brand' className='my-2'>
            <Form.Label>Brand</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock' className='my-2'>
            <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='category' className='my-2'>
            <Form.Label>Category</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='description' className='my-2'>
            <Form.Label>Description</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
        </Form>)}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen