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
import { useUpdateUserMutation, useGetUserDetailsQuery } from './../../redux/slices/usersApiSlice'
function UserEditScreen() {
    const {id:userId}= useParams()
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [isAdmin,setIsAdmin]= useState(false)
    const navigate = useNavigate()

const {data:user,isLoading,refetch,error}=useGetUserDetailsQuery(userId)
// console.log(product)
const [updateUser,{isLoading:isUpdating}]  = useUpdateUserMutation()

useEffect(()=>{
    if (user){
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
},[user])
const submitHandler = async(e)=>{
    e.preventDefault()
    // console.log("Here")
    const updatedUser={
        userId,
        name,
        email,
        isAdmin
    }
    const result = await updateUser(updatedUser)
    if(result.error){
        toast.error(result.error)
    }else{
        toast.success('Product updated')
        refetch()
        navigate('/admin/userlist')
    }
}
// const [uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation()
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

return (
    <>
    <Link to="/admin/userlist" className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit User Data</h1>
        { isUpdating &&<Loader/>}
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
            <Form.Label>Email</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e)=>setIsAdmin(e.target.checked)}
                />
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

export default UserEditScreen