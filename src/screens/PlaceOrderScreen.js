/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'


function PlaceOrderScreen({ history }) {
    const orderCreate = useSelector(state=>state.orderCreate)
    const { order, error, success } = orderCreate
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    cart.itemsPrice = cart.cartItems.reduce((acc,item)=> acc + item.price * item.count, 0).toFixed(2)
    cart.taxPrice = ( Number(cart.itemsPrice) * 0.05).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 50).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if(!cart.paymentMethod){
        dispatch({ type: CART_CLEAR_ITEMS })
        history.push('/payment')
        dispatch({ type: ORDER_CREATE_RESET })
    }
    useEffect(()=>{
        if(success){
            history.push(`order/${order._id}`)
        }
    },[success,history])

    const placeOrder = ()=>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
            
        }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            <p>
                                <strong>Shipping to: </strong><br/>
                                { cart.shippingAddress.address } <br/> { cart.shippingAddress.city }
                                {'-'}
                                { cart.shippingAddress.postalCode },
                                <br/> 
                                { cart.shippingAddress.state },
                               
                            </p>
                
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Payment Method
                            </h2>
                            <p>
                                <strong>Method: </strong><br/>
                                { cart.paymentMethod ? cart.paymentMethod : <strong className="text-muted">There was a mistake, please select the payment method again</strong>}
                               
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Ordered Items
                            </h2>
                            {
                                cart.cartItems.length === 0 ? 
                                <Message variant="info">
                                    Your cart is empty
                                </Message> : (
                                    <ListGroup variant="flush">
                                        {
                                            cart.cartItems.map((item,index)=>(
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.count} X {item.price} = Rs. {(item.count * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Order Summary
                                </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Books
                                    </Col>
                                    <Col>
                                        Rs. { cart.itemsPrice }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping Fee:
                                    </Col>
                                    <Col>
                                        Rs. { cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax :
                                    </Col>
                                    <Col>
                                        Rs. { cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        Rs. { cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn btn-block"
                                        disabled={cart.cartItems===0}
                                        onClick={placeOrder}
                                    >
                                        Place Order

                                    </Button>
                                </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
