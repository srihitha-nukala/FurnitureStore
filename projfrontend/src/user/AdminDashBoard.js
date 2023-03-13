import React from 'react';
import Base from '../core/Base'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { isAuthenticated } from '../auth/helper';


const AdminDashBoard =()=> {

  const {
    user:{name,email,role}
  } = isAuthenticated();

  const adminLeftSide =() =>{
    return(
      <Card className='shadow-lg rounded' style={{ width: '20rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item className=" shadow-lg text-center admin text-white">Admin Navigation</ListGroup.Item>
        <ListGroup.Item><Link className="nav-link shadow-lg rounded text-dark " to="/admin/create/category">Create Category</Link></ListGroup.Item>
        <ListGroup.Item><Link className="nav-link shadow-lg rounded text-dark " to="/admin/categories">Manage Category</Link></ListGroup.Item>
        <ListGroup.Item><Link className="nav-link shadow-lg rounded text-dark " to="/admin/create/product">Create Product</Link></ListGroup.Item>
        <ListGroup.Item><Link className="nav-link shadow-lg rounded text-dark " to="/admin/products">Manage Products</Link></ListGroup.Item>
        <ListGroup.Item><Link className="nav-link shadow-lg rounded text-dark " to="/admin/orders">Manage Orders</Link></ListGroup.Item>
        
      </ListGroup>
    </Card>

    )
  }

  const adminRightSide = () =>{
    return (
      <div >
      <Toast className='mb-4' >
      <Toast.Header className='admin text-white'>
        <strong className="me-auto  ">Name:</strong>
      </Toast.Header>
      <Toast.Body>{name}</Toast.Body>
    </Toast>
    <Toast className='mb-4' >
    <Toast.Header className='admin text-white'>
      <strong className="me-auto">Email:</strong>
    </Toast.Header>
    <Toast.Body>{email}</Toast.Body>
  </Toast>
  <Toast className='mb-4' >
    <Toast.Header className='admin text-white'>
      <strong className="me-auto">Role:</strong>
    </Toast.Header>
    <Toast.Body>{role}</Toast.Body>
  </Toast>
  </div>
    )
  }

  const endSide =() =>{
    return (
      <div>
        {isAuthenticated() && isAuthenticated().user.role===1 && (<h2 className='admin shadow-lg rounded p-2 text-center text-white' >Admin Dashboard</h2>)}
        
      </div>
    )
  }
   
       
    
  return (
    <Base title='Admin Dashboard Page' className='container shadow-lg rounded p-4 bg-light py-2 mt-5 mb-5'>
      <div className='row'>
        <div className='col-lg-4 col-md-2 col-sm-12 mb-3 '>
          {adminLeftSide()}
        </div>
        <div className='col-lg-4 col-sm-12'>
          {adminRightSide()}
        </div>
        <div className='col-lg-4 col-sm-12 '>
          {endSide()}
        </div>
      </div>

    </Base>
  )
}

export default AdminDashBoard;