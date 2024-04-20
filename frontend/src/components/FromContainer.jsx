import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
function FromContainer({children}) {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={16}>
            {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FromContainer