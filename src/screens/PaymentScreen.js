import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Cash On delivery')
    if(!shippingAddress.address){
        history.push('/shipping')
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Payment Method  <h6 className="text-muted mt-4 ml-3">Default: Cash On Delivery</h6>
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="PayPal"
                            id="paypal"
                            name="paymentMethod"
                            className="mt-3 mb-2"
                            onChange={(e) => setPaymentMethod(e.target.checked && "PayPal")}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="btn btn-block">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
