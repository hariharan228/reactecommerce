import React, {  useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Products from '../components/Products'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../actions/productActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
function HomeScreens() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products} = productList
    useEffect(()=>{
       dispatch(listProducts())
       
    },[dispatch])
  
    return (
        <div>
            <h2>Latest Products</h2>
            {
                loading ? <h2><Loading/></h2>
                : error ? <h5><Message variant='danger'>{error}</Message></h5>
                :  <Row>
                    {products.map(product=>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Products product = {product} />
                        </Col>
                    ))}
                   </Row>
            }
           
        </div>
    )
}

export default HomeScreens
