import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products'
import Products from '../components/Products'
import axios from 'axios'
function HomeScreens() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        async function fetchProducts(){
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    },[])
    return (
        <div>
            <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products product = {product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreens
