import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation} from './../../redux/slices/productApiSlice'
// import Order from '../../../../backend/models/orderModel'
// import {FaTimes} from 'react-icons'
import {toast} from 'react-toastify'
import { FaTimes,FaEdit, FaTrash } from 'react-icons/fa'
import { white } from 'color-name'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'
function ProductListScreen() {
//   const {data,isLoading,error,refetch}=useGetProductsQuery()
  const {pageNumber}= useParams()
  const {data, isLoading,error}= useGetProductsQuery(pageNumber)
  const [createProduct,{isLoading:loadingCreate}]=useCreateProductMutation()
  const [deleteProduct,{isLoading:loadingDelete}] = useDeleteProductMutation()
//   console.log(products)

    // const deleteHandler= (id)=>{
    //     console.log('delete',id)
    // }
    const createProductHandler= async () =>{
        if(window.confirm('Are you sure you want to create a new product?')){
                try{
                    console.log("Here you go")
                    await createProduct()
                    refetch()
                }catch(err){
                    toast.error(err?.data?.message || err.error)
                }
        }
    }
    const deleteHandler = async (id) =>{
        if(window.confirm('Are you Sure')){
            try{
                await deleteProduct(id)
                refetch()
                toast.success("Product Deleted successfully!!")
             }
            catch(err){ 
                toast.error(err?.data?.message || err.error)
            }
        }

    }
    console.log(data)
  return (
    <>
    <Row className="align-items-center">
    <Col>
    <h1>Products</h1>
    </Col>
    <Button className='btn-sm m-3' onClick={createProductHandler}>
        <FaEdit/> Create Product
    </Button>
    </Row>
    {loadingCreate &&<Loader/>}
    {isLoading?<Loader/>:error ?<Message variant='danger'>{error}</Message>:(
        <>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>NAME</td>
                    <td>PRICE</td>
                    <td>CATEGORY</td>
                    <td>BRAND</td>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.products.map((product)=>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm mx-2'>
                                    <FaEdit/>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm mx-2' onClick={()=>deleteHandler(product._id)}>
                                    <FaTrash style={{color:'white'}}/>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
        </>
    )} 
    </>
    
  )
}

export default ProductListScreen