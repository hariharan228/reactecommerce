/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loading from '../components/Loading'
import Message from '../components/Message'
import Loading from '../components/Loading'
// import FormContainer from '../components/FormContainer'
import { getOrderDetails,payOrder } from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'

import { ORDER_PAY_RESET } from '../constants/orderConstants'


function OrderScreen({ match }) {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const [sdkReady,setSdkReady] = useState(false)
    const orderDetails = useSelector(state=>state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state=>state.orderPay)
    const { loading:loadingPay,success:successPay } = orderPay

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price * item.count, 0).toFixed(2)
    }
    //AWnnMNLQ72EIUcfkdinrQ5Sie9j_D__YmPY2YWlLdBnuXYVgubReGfbe_Vw91rJoyq-OdYPwhNz-Xvjm

    const addPayPalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AcZYIjklg_6A8G8JOcmMiKyPhhzli5o8nYwQo57vV9sT7i8lumDDpz7LS3fFlI8i6prE5lIuuA1cbDbN'
        script.async=true
        script.onload = () =>{
            setSdkReady(true);
        }
        document.body.appendChild(script)
    }
    useEffect(()=>{
        if(!order || successPay || order._id !== Number(orderId)){
            
            dispatch({ type:ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } 
        else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true);
            }
        }
    },[successPay,dispatch,order, orderId])
    const successPaymentHandler=(paymentResult)=>{
        dispatch(payOrder(orderId,paymentResult))
    }
    return loading ? (
    <Loading/>
     ) : error ? ( <Message variant="danger">{error} </Message>
     )   :   (
        <div>
            <h2>Order: {order._id} </h2>
           <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Shipping to: </strong><br/>
                                { order.shippingAddress.address } <br/> { order.shippingAddress.city }
                                {'-'}
                                { order.shippingAddress.postalCode },
                                <br/> 
                                { order.shippingAddress.state },
                               
                            </p>
                            <p>
                                    <strong>{order.isDelivered ? (
                                        <Message variant="success">{order.deliveredAt}</Message>
                                    ):(
                                        <Message variant="danger">Not Delivered</Message>
                                    )}</strong>
                                </p>
                
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Payment Method
                            </h2>
                            <p>
                                <strong>Method: </strong> &nbsp;
                                { order.paymentMethod ? order.paymentMethod : <strong className="text-muted">There was a mistake, please select the payment method again</strong>}
                                <br/>
                                <p>
                                    <strong>{order.isPaid ? (
                                        <Message variant="success">{order.paidAt}</Message>
                                    ):(
                                        <Message variant="danger">Not Paid</Message>
                                    )}</strong>
                                </p>

                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                Ordered Items
                            </h2>
                            {
                                order.orderItems.length === 0 ? 
                                <Message variant="info">
                                    Your order is empty
                                </Message> : (
                                    <ListGroup variant="flush">
                                        {
                                            order.orderItems.map((item,index)=>(
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
                                        Rs. { order.itemsPrice }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping Fee:
                                    </Col>
                                    <Col>
                                        Rs. { order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax :
                                    </Col>
                                    <Col>
                                        Rs. { order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        Rs. { order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>    
                            {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loading/>}
                                        {!sdkReady ? (
                                            <Loading></Loading>
                                        ):(
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess = {successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )
                            }                        
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
