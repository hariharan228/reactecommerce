import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { listUsers, deleteUsers } from '../actions/userActions'
function UserListScreen({history}) {
    const dispatch = useDispatch()
    const usersList = useSelector(state=>state.usersList)
    const { loading, error, users } = usersList
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userLogin = useSelector(state => state.userLogin)
   
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete
    useEffect(()=>{
       if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
       }else{
            history.push('/login')
       }
    },[dispatch, history,successDelete])
    const deleteHandler = (id) =>{
        if(window.confirm("Are you sure to delete?")){
            dispatch(deleteUsers(id))
        }

            
    }
    return (
        <div>
            <h1>Users</h1>
            
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

            {
                loading ? (<Loading/>)
                : error ? (<Message variant="danger">{error}</Message>)
                : (
                    <Table striped responsive className="table-sm" >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (<i className ='fa fa-check' style={{color:'green'}}></i>) : (
                                            <i className ='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                           <Button variant="light" className="btn-sm">
                                             <i className ='fas fa-edit' ></i>
                                           </Button>
                                        </LinkContainer>

                                        <Button variant="light" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
                                             <i className ='fas fa-trash' style={{color:'red'}} ></i>
                                           </Button>
                                    </td>
                                </tr>
                                    
                            ))}
                         </tbody>   
                    </Table>
                )
            }
        </div>
    )
}

export default UserListScreen
