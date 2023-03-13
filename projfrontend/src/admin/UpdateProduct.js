import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import { Link,Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index';
import {updateProduct,getProduct, getAllCategories} from '../admin/helper/adminapicall';
import { useMatch } from 'react-router-dom';

const UpdateProduct=()=> {
    
    
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
        updatedProduct:"",
        getaRedirect:false,
        formData:""

    })

    const {name,description,price,stock,categories,loading,error,updatedProduct,getaRedirect,formData} = values;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const preLoad = productId =>{
        getProduct(productId).then(data =>{
            
            // console.log(data);
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                preLoadCategories();
                setValues({
                    ...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category._id,
                    stock:data.stock,
                    
                    formData:new FormData()
                });
                
            }
        })
    }


const preLoadCategories = ()=>{
    getAllCategories().then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({
                categories:data,formData:new FormData()
            })
        }
    })
}

const match = useMatch(
    "/admin/product/update/:productId"
  );


    useEffect(() => {
        preLoad(match.params.productId)
    },[] );

    const handleChange =name=> event =>{
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value})

    }
    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        updateProduct(match.params.productId,user._id,token,formData)
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,name:"",price:"",stock:"",description:"",photo:"",loading:false,updatedProduct:data.name})
            }
        })

}

    const successMessage =() =>(
        <div className=" alert alert-success mt-3" style={{display : updatedProduct ? "" : "none"}}>
            <h4>{updatedProduct} updated Successfully</h4>
        </div>
    )

    const errorMessage =() =>(
        <div className=" alert alert-danger mt-3" style={{display : error ? "" : "none"}}>
            <h4>Not able to update {updatedProduct}</h4>
        </div>
    )

    const loadingMessage =()=>{
        return(
        loading && (
        <div className=" issue alert alert-info" style={{display: loading ? "" :"none"}}>
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

    const updateProductForm = () => (
        <form class="row g-3 p-2" >
        
        <div className="form-group col-md-12">
        <label type="text" className='text-dark'>Name of Product</label>
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
        
        <div className="form-group col-md-12">
        <label for="formFile" className="form-label text-dark" >Upload Photo</label>
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
        
        <button type="submit" onClick={onSubmit} className="btn btn-outline-success col-md-6 ml-3 shadow-lg  btn-success  rounded mb-3">
            Update Product
        </button>
        </form>
    );

return (
    <Base title='Add a Product Here! ' description='Welcome to Product Creation Section' className='container'>
        <Link to="/admin/dashboard" className='btn shadow-lg rounded mt-4  btn-md bg-white text-dark mb-2'>Admin Home</Link>
        <h2  className="text-center mb-2 py-4 text-white ">Update a Product</h2>
    <div className="row mx-auto col-10 col-md-8 col-lg-6 bg-white mb-4 shadow-md rounded">
        <div className='col-md-8 p-1 mt-2 offset-md-2'>
            {loadingMessage()}
            {performRedirect(getaRedirect)}
            {successMessage()}
            {errorMessage()}
            {updateProductForm()}
        </div>
    </div>
    </Base>
)
 }


 export default UpdateProduct;




