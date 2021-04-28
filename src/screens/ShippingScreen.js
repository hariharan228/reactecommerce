import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({ history }) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const [address, setAddress ]  = useState (shippingAddress.address)
    const [city, setCity]  = useState (shippingAddress.city)
    const [postalCode, setPostalCode ]  = useState (shippingAddress.postalCode)
    const [state, setState ]  = useState (shippingAddress.state)
 
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, state}))
        history.push('/payment')
    }
    return (
        <FormContainer> 
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter the address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter the city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            <Form.Group controlId='postalCode'>
                    <Form.Label>Pin code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter the pincode'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter the state'
                        value={state ? state : ''}
                        onChange={(e) => setState(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className="btn btn-block" type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
