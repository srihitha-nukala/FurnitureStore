import React, {useState} from 'react'
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createCategory} from './helper/adminapicall'
import { Navigate } from 'react-router-dom';

const AddCategory = () => {

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);



    const {user,token} = isAuthenticated();

    const handleChange =event=>{

            setError("")
            setName(event.target.value)


    }

    const onSubmit =event=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        createCategory(user._id,token,{name}).then(data =>{
            if(data.error){
                setError(true)
            }else{
                setError("");
                setSuccess(true);
                setName("")
                setRedirect(true)
            }
        })
    }

    const successMessage = () =>{
        if(success){
            return <button className='m-2 p-2 shadow-lg rounded text-center btn-success'>Category created successfully {name}</button>
        }
    }

    const errorMessage = () =>{
        if(error){
            return <button className='m-2 p-2 shadow-lg rounded text-center btn-danger '>Failed to created Category{name}</button>
        }
    }
    const getARedirect = redirect =>{
        if(redirect){
          return <Navigate to='/admin/categories'></Navigate>
        }
      }

    const myCategoryForm = () =>{
        return(
            
            <Form className='py-2 px-0 '>
                
      <Form.Group className=" mb-4" >
        <Form.Label >Enter the category</Form.Label>
        <Form.Control type='text' className='p-3 my-2' onChange={handleChange}  placeholder="For example: Sofas" value={name} autoFocus required />
      </Form.Group>
      <Button className='shadow-lg   rounded' variant="primary" onClick={onSubmit} type="submit">
        Submit
      </Button>
    </Form>
        )
    }



  return (
    <Base title="Create a Category" description='Add a new category for new Furiture' className='container mt-4 '>
        
        <Link className="btn btn-white bg-white  shadow-lg rounded mt-5 " to={`/admin/dashboard`}>
        <span className="mb-2 text-dark">Admin Home</span>
      </Link>
        <h2  className="text-center mb-0 py-4 text-white ">Create a Category</h2>
        <div className='row pl-0 p-3 m-4 ml-5 col-11 justify-content-center align-items-center bg-white  rounded'>
            <div className="div ml-0 col-8  offset-md-2 ">
            {successMessage()}
                {errorMessage()}
                {myCategoryForm()}
                {getARedirect(redirect)}
                {/* {goBack()} */}
            </div>
        </div>
    </Base>
  )
}

export default AddCategory