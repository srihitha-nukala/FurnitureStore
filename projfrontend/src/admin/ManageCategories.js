import React,{useState,useEffect} from 'react';
import Base from '../core/Base'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { deleteCategory, getAllCategories } from './helper/adminapicall';

const ManageCategories = () => {

  const [categories,setCategories] = useState([]);

    const {user,token} = isAuthenticated();
    

    const preLoad = () =>{
        getAllCategories().then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error);
            }else{
                setCategories(data);
                
            }
        })
    }
    useEffect(() => {
       preLoad(); 
    }, []);


    const deleteACategory = categoryId =>{
      deleteCategory(categoryId,user._id,token).then(data=>{
          console.log(data)
          if(data.error){
              console.log(data.error);
          }else{
              preLoad();
          }
      })

  }


  return (
    <Base title="Welcome admin" description="Manage Categories "className='bg-dark py-5 px-5'>
      {/* <h2 className="mb-4">All Categories:</h2> */}
      <Link className="btn btn-white bg-white ml-5 shadow-lg rounded " to={`/admin/dashboard`}>
        <span className="mb-2 text-dark">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3 mb-3 py-3">Total Categories</h2>

        {categories.map((category,index)=>(
            <div key={index} className="row text-center mb-3 ">
            <div className="col-4 mb-2 ">
              <h4 key={index} className="text-white ml-5 text-left ">{category.name}</h4>
            </div>
            <div className="col-4">
            <Link
                className="btn btn-success shadow-lg rounded"
                to={`/admin/category/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteACategory(category._id)}} className="btn shadow-lg rounded btn-danger">
                Delete
              </button>
            </div>
            </div>
    ))}
        </div>
      </div>
    </Base>
  )
}

export default ManageCategories