import React,{useState,useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import ProductCard from './Card';
import { getProducts } from './helper/coreapicalls';


export default function Home() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () =>{
    getProducts().then(data=>{
      if(error){
        setError(data.error)
      }else{
        setProducts(data)
       
      }
    })
  }


//   const preLoad = () =>{
//     getAllProducts().then(data=>{
//         console.log(data)
//         if(data.error){
//             console.log(data.error);
//         }else{
//             setProducts(data);
            
//         }
//     })
// }

  useEffect(() => {
    loadAllProducts();
    // preLoad();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store" className='bg-dark'>
      <div className="row text-center">
      <h2  className="text-center mb-2 py-4 text-white ">Shop Here For Furniture</h2>
        <div className='row'>
          
            {products.map((product,index) => {
            return(
              <div key={index} className=" col col-lg-4 col-md-4 d-flex align-items-stretch px-5 mb-4" >
                  <ProductCard product={product}/>
              </div> 
            )
          })}
          
          
          </div>
          </div>
        
    </Base>
  );
}
