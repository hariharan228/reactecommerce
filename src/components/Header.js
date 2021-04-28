import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const cart = useSelector(state => state.cart)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const logoutHandler = () =>{
      dispatch(logout())
      localStorage.clear()
      cart.cartItems = []
      cart.shippingAddress = {}
      cart.paymentMethod = ''
    }
    return (
        <div>
           <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    
                    <Container>
                        <LinkContainer to="/">
                        <Navbar.Brand>Book Arsenal</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                            <Nav.Link ><i className="fas fa-shopping-cart"></i>&nbsp;Cart</Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ):(
                                    <LinkContainer to="/login">
                                        <Nav.Link ><i className="fas fa-user"></i>&nbsp;Login</Nav.Link>
                                    </LinkContainer>
                                )
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userslist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderslist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productslist'>
                                        <NavDropdown.Item>Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                  
                                </NavDropdown>
                                )
                            }

                            
                            
                            </Nav>
                        
                        </Navbar.Collapse>
                        </Container>
                </Navbar>
           </header> 
        </div>
    )
}

export default Header
