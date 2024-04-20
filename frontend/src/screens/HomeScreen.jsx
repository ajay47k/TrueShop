import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from './../components/Product';
import axios from 'axios';
import { useGetProductsQuery } from '../redux/slices/productApiSlice';
import Loader from './../components/Loader';
import Message from './../components/Message';
// import Message from './../components/Message';
function HomeScreen() {
    const {data:products, isLoading,error}= useGetProductsQuery()
    // const [productx, setProductx] = useState([]);
    // if (products) {setProductx(products.products)}
    // console.log("Here are the", products)
  return (
    <>
    {isLoading?(<Loader/>):error?(<Message variant='danger' >{error?.data.message|| error.error}</Message>):(
          <>
          <h1>Latest Products</h1>
          <Row>
              {products.products.map((product)=>(
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
                  </Col>
              ))}
          </Row>
          </>
    )}

    </>
  )
}

export default HomeScreen;
