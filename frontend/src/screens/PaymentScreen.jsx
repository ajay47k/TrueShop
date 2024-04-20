import React from 'react'
import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Form,Button,Col} from 'react-bootstrap'
import FromContainer from './../components/FromContainer'
import CheckOutSteps from './../components/CheckOutSteps'
import { savePaymentMethod } from '../redux/slices/cartSlice'
function PaymentScreen() {
    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state)=>state.cart)
    const {shippingAddress} = cart
    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FromContainer>
        <CheckOutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check
                type='radio'
                className='my-2'
                label='PayPal or CreditCard'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                ></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FromContainer>
  )
}

export default PaymentScreen