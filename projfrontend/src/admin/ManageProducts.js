import React,{useState,useEffect} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

const ManageProducts =() => {
  
    const [products,setProducts] = useState([]);

    const {user,token} = isAuthenticated();
    

    const preLoad = () =>{
        getAllProducts().then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data);
                
            }
        })
    }

    useEffect(() => {
       preLoad(); 
    }, []);

    const deleteAProduct = productId =>{
        deleteProduct(productId,user._id,token).then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error);
            }else{
                preLoad();
                
            }
        })

    }

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-white bg-white ml-5 shadow-lg rounded" to={`/admin/dashboard`}>
        <span className="mb-2 text-dark mt-4">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3 mb-3 py-3
          ">Total {products.length} products</h2>

        {products.map((product,index)=>(
            <div key={index} className="row text-center mb-3 ">
            <div className="col-4 mb-2">
              <h4 className="text-white ml-5 text-left">{product.name}</h4>
            </div>
            <div className="col-4">
            <Link
                className="btn btn-success shadow-lg rounded"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteAProduct(product._id)}} className="btn shadow-lg rounded btn-danger">
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

export default ManageProducts

