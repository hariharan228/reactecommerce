import React,{ useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
// import products from '../products'
import Rating from '../components/Rating'
import { useDispatch,useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loading from '../components/Loading'
import Message from '../components/Message'

function ProductScreen({ match , history}) {
    const [count,setCount] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match.params.id])
 const addToCart = () => {
        history.push(`/cart/${match.params.id}?qty=${count}`)
 }
    return (
        <div>

        
        <Link to="/" className = "btn btn-light my-3">Home</Link>
        {
                loading ? <h2><Loading/></h2>
                : error ? <h5><Message variant='danger'>{error}</Message></h5>
                : <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text = {`${product.numReviews} ratings`} color={"#f83825"}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col >
                                    <h3>{product.price}</h3>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Stock: 
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock" }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            { product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Quantity:
                                        </Col>
                                        <Col xs='auto' className='my-1 '>
                                            <Form.Control as = "select" value={count} onChange={(e)=>setCount(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map((x)=>(
                                                        <option key={x + 1} value={x+1}>
                                                                {x+1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={addToCart} className="btn-block"  variant="outline-warning" disabled={product.countInStock === 0} type="button">Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
    
            </Row>
        }
        

        </div>
    )
}

export default ProductScreen
