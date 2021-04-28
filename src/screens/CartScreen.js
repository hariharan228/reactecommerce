import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions';
function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const count = location.search ? Number(location.search.split('=')[1]): 1
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,count))
        }
    },[dispatch,productId,count])

    const removeCartFromHandler = (id) =>{
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Cart</h1>
                { cartItems.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty <Link to='/'>Purchase some books</Link>
                    </Message>
                ):(
                    <ListGroup variant='flush'>
                        { cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`} className="book_name">{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        Rs.{item.price}
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control as = "select" value={item.count} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x)=>(
                                                        <option key={x + 1} value={x+1}>
                                                                {x+1}
                                                        </option>
                                                    ))
                                                }  
                                            </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type="button" variant="light" onClick={()=>removeCartFromHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card className="cartcard">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h4>{cartItems.reduce((acc,item)=> acc + item.count,0) > 1 ? cartItems.reduce((acc,item)=> acc + item.count,0) + " Books" : cartItems.reduce((acc,item)=> acc + item.count,0) + " book"}</h4>
                        <h4>Total Rs. {cartItems.reduce((acc,item)=>acc+item.count * item.price , 0).toFixed(2)}</h4>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Button type="button" className="btn btn-block" disabled={cartItems.length === 0} onClick={()=>checkoutHandler()}>
                            Proceed To checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
export default CartScreen
