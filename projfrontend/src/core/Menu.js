import React,{Fragment} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, Navigate } from 'react-router-dom';
import './coreCss/Menu.css'
import { signout,isAuthenticated } from '../auth/helper';


const Menu =() => {

  return (
    <Navbar collapseOnSelect expand="lg" className="nav p-2 bg-dark text-white">
      <Container>
      <Navbar.Brand href="/" className='text-white'>FURS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav  className="me-auto navbar-nav gap-3 mr-0">
            <Nav.Link >
              <Link className=" text-white" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className=" text-white" to="/cart">
                Cart
              </Link>
            </Nav.Link>
            {isAuthenticated() && isAuthenticated().user.role ===1 && (<Nav.Link>
              <Link className=" text-white" to="/admin/dashboard">
                Admin Dashboard
              </Link>
            </Nav.Link>)}

            {isAuthenticated() && isAuthenticated().user.role ===0 && (<Nav.Link>
              <Link className=" text-white" to="/user/dashboard">
                User Dashboard
              </Link>
            </Nav.Link>)}

            {!isAuthenticated() && (<Fragment>
            <Nav.Link>
              <Link className=" text-white " to="/signin">
                SignIn
              </Link>
            </Nav.Link>
            <Nav.Link>

              <Link className="text-white" to="/signup">
                SignUp
              </Link>
            </Nav.Link>
            </Fragment>)}
            {isAuthenticated() && (<Nav.Link>
              
              <Link className="text-white" onClick={()=>{
                signout(()=>{
                  Navigate('/')
                })
              }} to="/signout">
              SignOut 
              </Link>
            </Nav.Link>)}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Menu