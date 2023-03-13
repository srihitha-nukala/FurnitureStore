import React,{useState} from "react";
import Base from '../core/Base';
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import{ signup} from '../auth/helper'

const Signup=()=> {

  //to store and set signup data

  const [values,setValues] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  });
  //desctructing of values

  const {name,email,password,error,success} = values

  //handling changes on click

  const handleChange = name =>event =>{
    setValues({...values,error:false,[name]:event.target.value})
  }

  //submiting values
  const onSubmit =  event =>{
    event.preventDefault()
    setValues({...values,error:false})
    signup({name,email,password})
    .then(data=>{
      if(data.error){
        setValues({...values,error:data.error,success:false})
      }else{
        setValues({...values,name:"",email:"",password:"",error:"",success:true})
      }
    })
    .catch(console.log("Error in SignUp"))
  }



  //signup form design
    const signUpForm = () =>{
        return(
            <div>
                <Container>
                  <h2 className="text-center mb-0 py-4 text-white">Register Here for shopping</h2>
        <Row className="vh-75% d-flex justify-content-center align-items-center mt-0">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 m-4  shadow-lg shadow-inset">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-dark text-uppercase ">
                    SignUp
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center text-dark">Name</Form.Label>
                        <Form.Control type="text" onChange={handleChange("name")} placeholder="Enter Name" value={name}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center text-dark">
                          Email
                        </Form.Label>
                        <Form.Control type="email" onChange={handleChange("email")} placeholder="Enter email" value={email}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="text-center text-dark">Password</Form.Label>
                        <Form.Control type="password" onChange={handleChange("password")} placeholder="Password" value={password}  />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button onClick={onSubmit} className="btn-block shadoe-lg rounded" variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-dark text-center">
                        Already have an account??{' '}
                        <Link className="text-primary fw-bold" to="/signin"> Sign In</Link>

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

    const successMessage =()=>{
      return(
        
      <div className="issue alert alert-success" style={{display:success ? "" :"none"}}>
        New account was created Successfully.Please <Link to="/signin">Login Here</Link>
      </div>
      

    )}

    //error msg

    const errorMessage =()=>{
      return(
        
      <div className="issue alert alert-danger"  style={{display:error ? "" :"none"}}>
       {error}
      </div>


    )}

  return (
    <Base title="SignUp" description="Register Here for shopping" className="bg-dark p-2 mb-0">
      {errorMessage()}
      {successMessage()}
      {signUpForm()}
    {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>

    )
}

export default Signup;