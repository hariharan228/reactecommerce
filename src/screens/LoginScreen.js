import React,{useEffect, useState} from 'react'
import { Form, Button, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1]:'/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }
    
    return (
        <div>
            <FormContainer>
                <h1>
                    Sign In
                </h1>
                { error && <Message variant="danger">{ error } </Message>}
                { loading && <Loading/>}
                <Form onSubmit = { submitHandler }>
                    <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Please enter your email"
                        value = { email }
                        onChange = {(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Please enter your password"
                        value = { password }
                        onChange = {(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                    </Form.Group>
                    <Button variant="dark" type="submit" className="btn btn-block">Login</Button>
                </Form>
                <Row className="py-3 ml-3 vertical-align-middle">
                    New user? &nbsp; &nbsp; <Link className="btn btn-secondary pt-0 pl-0 pb-0 pr-0"
                        to={redirect? `/register/redirect=${redirect}`:'/register'}>
                            Register
                    </Link>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginScreen
