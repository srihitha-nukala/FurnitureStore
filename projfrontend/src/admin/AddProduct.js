import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import { Link,Navigate } from 'react-router-dom';
import { getAllCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';
import {createProduct} from '../admin/helper/adminapicall'

function AddProduct() {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""

    })

    const {name,description,price,stock,categories,category,photo,loading,error,createdProduct,getaRedirect,formData} = values;

    const preLoad = () =>{
        getAllCategories().then(data =>{
            console.log(data);
            if(data.error){
                setValues({...values,error:data.error})

            }else{
                setValues({...values,categories:data,formData:new FormData()});
                console.log("CATE:" ,categories);
            }
        })
    }

    

    useEffect(() => {
        preLoad()
    }, []);

    const handleChange =name=> event =>{
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value})

    }
    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        createProduct(user._id,token,formData)
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,name:"",price:"",stock:"",description:"",photo:"",loading:false,createdProduct:data.name})
            }
        })}

    
    const successMessage = () => (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    );

    const errorMessage = () => (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? '' : 'none' }}
      >
        <h4>Failed to create product</h4>
      </div>
    );
  
  

    const loadingMessage =()=>{
        return(
          loading && (
        <div className=" issue alert alert-info p-2" style={{display: loading ? "" :"none"}}>
          Loading......
        </div>)
        
      
      )}

      const performRedirect =()=>{
        if(getaRedirect){
          if(user && user.role===1){
            return <Navigate to="/admin/dashboard" />
          }else{
            return <Navigate to="/user/dashboard" />
          }
        }
        
      }
      

    const createProductForm = () => (
        <form class="row g-3 p-2">
        
          <div className="form-group col-md-12">
          <label type="text" className='text-dark p-1'>Name of Product</label>
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group col-md-12">
          <label type="text" className='text-dark'>Description of Product</label>
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group col-md-12">
          <label type="text" className='text-dark'>Price</label>
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group col-md-6">
          <label type="text" className='text-dark'>Select Category</label>
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((category,index)=>{
                return(
                    <option key={index} value={category._id}>{category.name}</option>
                )
              })}
              
            </select>
          </div>
          <div className="form-group col-md-6">
            <label type="text" className='text-dark'>stock</label>
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
        <div className="form-group mb-3 col-md-12">
            <label htmlFor="formFile" className="form-label text-dark" >Upload Photo</label>
            <input
                onChange={handleChange("photo")}
                className="form-control"
                id="formFile"
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            
          </div>
          
          
          <button type="submit" onClick={onSubmit} className="col-md-6 ml-3 btn shadow-lg btn-outline-success  btn-success  rounded  mb-3 ">
            Create Product
          </button>
        </form>
      );

  return (
    <Base title='Add a Product Here! ' description='Welcome to Product Creation Section' className='container'>
        <Link to="/admin/dashboard" className='btn shadow-lg rounded mt-4  btn-md bg-white text-dark mb-2'>Admin Home</Link>
        <h2  className="text-center mb-2 py-4 text-white ">Add a Product</h2>
    <div className="row mx-auto col-10 col-md-8 col-lg-6 bg-white mb-4 shadow-md rounded">

        <div className='col-md-8 p-1 mt-2 offset-md-2'>
            {loadingMessage()}
            {performRedirect(getaRedirect)}
            {successMessage()}
            {errorMessage()}
            {createProductForm()}
        </div>
    </div>
    </Base>
  )
}

export default AddProduct