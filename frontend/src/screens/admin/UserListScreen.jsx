import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
// import {useGetOrdersQuery} from './../../redux/slices/ordersApiSlice'
// import Order from '../../../../backend/models/orderModel'
// import {FaTimes} from 'react-icons'
import { FaTimes,FaTrash, FaEdit,FaCheck } from 'react-icons/fa'
import { useGetUsersQuery } from './../../redux/slices/usersApiSlice'
import {useDeleteUserMutation} from './../../redux/slices/usersApiSlice'
// import { toast } from toast
import { toast } from 'react-toastify'
function UserListScreen() {
  const {data:users,refetch,isLoading,error} = useGetUsersQuery()
  const { }=useDeleteUserMutation()
  const [deleteUser,{isLoading:isDeleting,error:deleteError}]=useDeleteUserMutation()
  const deleteHandler = async (id)=>{
    // console.log('delete')
    if(window.confirm('Are you sure?')){
        try{
            await deleteUser(id)
            toast.success('User deleted successfully')
            refetch()
        }catch(err){
            toast.error(err?.data?.message||err.error)
        }
      

    }
  }
  console.log(users)
  // const [deliver,{isLoading:loading}]=useDeliverOrderMutation()
  return (
    <>
    <h1>Users</h1>
    {isDeleting && <Loader/>}
    {isLoading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
    <Table stripped hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user)=>(
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
            <td>{ user.isAdmin?
            (<FaCheck style={{color:'green'}}/>):(<FaTimes style={{color:'red'}}/>)}</td>
            <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
              <Button variant='light' className='btn-sm'>
                  <FaEdit/>
                </Button>
              </LinkContainer>
              <Button
              variant='danger' 
              className='btn-sm'
              onClick={()=>deleteHandler(user._id)}>
                  <FaTrash style={{color:'white'}}/>
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>)}
    </>
  )
}
export default UserListScreen
