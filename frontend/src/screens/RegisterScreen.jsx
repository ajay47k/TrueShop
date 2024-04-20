import {useEffect, useState} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Form, Button,Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
// import {login} from './'
import FromContainer from '../components/FromContainer'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import {toast} from 'react-toastify'
// import Message from './../components/Message'
function RegisterScreen() {
    const [name,setName]= useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword]= useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register,{isLoading}]= useRegisterMutation()// isLoading is automatically created for us.
    const {userInfo} = useSelector((state)=>state.auth)
    const {search}= useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect')|| '/' // Navigate to the index page or if there is something in it like shipping
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect,navigate])
   async function submitHandler(e){
        e.preventDefault()
        // console.log('submit')
        if (password !== confirmPassword){
            toast.error('Passwords do not match')
            return
        }else{
        try{
            const res = await register({name,email,password}).unwrap()
            dispatch(setCredentials({...res,}))
            navigate(redirect) 
        }catch(err){
            toast.error(err?.data?.message||err.error)
        }
    }
    }
  return (
    <FromContainer>
    <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name' className='my-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-3'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2'>
            Sign Up
        </Button>
        { isLoading && <Loader/>}
    </Form>
    <Row className='py-3'>
    <Col>
    Existing Customer? <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>LogIn</Link>
    </Col>
    </Row>
    </FromContainer>
  )
}

export default RegisterScreen