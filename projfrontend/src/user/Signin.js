import React,{useState} from "react";
import Base from '../core/Base';
import { Link,Navigate} from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import {signin,isAuthenticated,authenticate} from "../auth/helper"

const Signin=()=> {

  const [values,setValues] = useState({
    email:"",
    password:"",
    error:"",
    loading:"",
    didRedirect:false
  });

  const {email,password,error,loading,didRedirect} = values;

  //getting user from jwt in signup
  const {user} =isAuthenticated();

  //handling changes on click

  const handleChange = name =>event =>{
    setValues({...values,error:false,[name]:event.target.value})
  }

  //submiting values
  const onSubmit =  event =>{
    event.preventDefault()
    setValues({...values,error:false,loading:true})
    signin({email,password})
    .then(data=>{
      if(data.error){
        setValues({...values,error:data.error,loading:false})
      }else{
        authenticate(data,()=>{
          setValues({
            ...values,didRedirect:true
          })
        })
      }
    })
    .catch(console.log("Error in SignIn request failed"))
  }


  const signInForm = () =>{
    return(
        <div>
            <Container className="mt-0">
            <h2  className="text-center mb-0 py-4 text-white ">Login Here for shopping</h2>
    <Row className="vh-75% d-flex justify-content-center align-items-center mt-0">
      <Col md={8} lg={6} xs={12}>
        <Card className="px-4 m-4  bg-white shadow-lg shadow-inset">
          <Card.Body>
            <div className="mb-3 m-2">
              <h2 className="fw-bold mb-2 py-2 text-center text-dark text-uppercase ">
                SignIn
              </h2>
              <div className="mb-3 py-1">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-center text-dark">
                      Email
                    </Form.Label>
                    <Form.Control type="email" onChange={handleChange("email")}  placeholder="Enter email" value={email} />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 py-1"
                    controlId="formBasicPassword"
                  >
                    <Form.Label className="text-center text-dark">Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange("password")} placeholder="Password" value={password} />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 "
                    controlId="formBasicCheckbox"
                  ></Form.Group>
                  <div className="d-grid">
                    <Button className="btn-block shadow-lg rounded" onClick={onSubmit} variant="primary" type="submit">
                      SignIn
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0 text-dark text-center">
                    If New User??
                    <Link className="text-primary fw-bold" to="/signup"> Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
        </div>
    )
}

//success messgae

const loadingMessage =()=>{
  return(
    loading && (
  <div className=" issue alert alert-success" style={{display:loading ? "" :"none"}}>
    Loading......
  </div>)
  

)}

//error msg

const errorMessage =()=>{
  return(
    
  <div className="issue alert alert-danger"  style={{display:error ? "" :"none"}}>
   {error}
  </div>


)}
//Redirect
const performRedirect =()=>{
  if(didRedirect){
    if(user && user.role===1){
      return <Navigate to="/admin/dashboard" />
    }else{
      return <Navigate to="/user/dashboard" />
    }
  }
  if(isAuthenticated()){
    return <Navigate to="/" />
   
  }
}

  return (
    <Base title="SignIn" description="Signin Here for shopping" className="bg-dark">
      {errorMessage()}
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}

    </Base>

    )
}

export default Signin;