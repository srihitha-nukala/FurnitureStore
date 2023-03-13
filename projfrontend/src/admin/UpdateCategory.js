import React, {useState,useEffect} from 'react'
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import { Link,Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {updateCategory,getCategory} from './helper/adminapicall'
import { useMatch } from 'react-router-dom';



const UpdateCategory = () => {

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const {user,token} = isAuthenticated();


    const preload = (categoryId) => {
            getCategory(categoryId).then((data) => {
              if (data.error) {
                setError(data.error);
              } else {
                setName(data.name);
              }
            });
          };
        
          const match = useMatch(
            "/admin/category/update/:categoryId"
          );
        
          useEffect(() => {
            preload(match?.params?.categoryId);
          }, []);
        
          const handleChange = (event) => {
            setError(false);
            setName(event.target.value);
          };
        
          const onSubmit = (event) => {
            event.preventDefault();
            setError(false);
            setSuccess(false);
        
            // backend request fired
            updateCategory(match.params.categoryId, user._id, token, { name })
              .then((data) => {
                if (data.error) {
                  setError(true);
                } else {
                  setError(false);
                  setSuccess(true);
                  setName('');
                  setRedirect(true)
                }
              })
            //  .catch(console.log('Error in updating category'));
          };
        
    

    const successMessage = () =>{
        if(success){
            return <button className='m-2 p-2 shadow-lg rounded text-center btn-success '>Category updated successfully {name} </button>
        }
    }

    const errorMessage = () =>{
        if(error){
            return <button className='m-2 p-2 shadow-lg rounded text-center btn-danger text-white'>Failed to Update Category {name} </button>
        }
    }

    const getARedirect = redirect =>{
        if(redirect){
          return <Navigate to='/admin/categories'></Navigate>
        }
      }


    const myCategoryForm = () =>{
        return(
            <Form>
      <Form.Group className="mb-4" >
        <Form.Label >Enter the Update category</Form.Label>
        <Form.Control type='text' className='p-3 my-2' onChange={handleChange}  placeholder="For example: Sofas" value={name} autoFocus required />
      </Form.Group>
      <Button className='shadow-lg   rounded'  variant="primary" onClick={onSubmit} type="submit">
        Update Category
      </Button>
    </Form>
        )
    }



  return (
    <Base title="Update a Category" description='Update a new category for new Furiture' className='container mt-mb-3 '>
        <Link className="btn btn-white bg-white  shadow-lg rounded mt-5 " to={`/admin/dashboard`}>
        <span className="mb-2 text-dark">Admin Home</span>
      </Link>
        <h2  className="text-center mb-0 py-4 text-white ">Update a Category</h2>
        <div className='row pl-0 p-3 m-4 ml-5 col-11 justify-content-center align-items-center  bg-white rounded'>
            <div className="div ml-0 col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {getARedirect(redirect)}
                {myCategoryForm()}
                
            </div>
        </div>
    </Base>
  )
}

export default UpdateCategory;
