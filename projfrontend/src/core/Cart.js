import React,{useState,useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import ProductCard from './Card';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from '../user/StripeCheckout';



const Cart =() => {


    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);

    const loadAllProducts = () =>{
        return(
            <div className='mx-auto' >
                <h2 className='text-white  text-center mb-3'>Your products in Cart</h2>
            <div className='m-2 p-2 ml-5'>                    
            {products.map((product,index)=>{
                    return(
                    <ProductCard 
                    key={index}
                    product={product} 
                    removeFromCart={true} 
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload}
                    
                    />
                    
                )})}
</div>
            </div>
        )
    }

    const totalPrice = () => {
        try {
          let total = 0;
          products?.map((product) => {
            console.log(product)
            total = total + product.price;
          })
        //   return total;
          return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
         } catch (error) {
          console.log(error);
         }
      };
return (
    <Base title="Cart Page" description="Ready to CheckOut" className='bg-white'>
    <div className="row text-center">
    <h2  className="text-center  mb-2 py-4 text-dark ">Shopping Cart</h2>
        <div className='row'>
            <div className='col-lg-5 shadow-lg bg-dark  mx-auto p-4  mb-4'>{loadAllProducts()}</div>
            <div className='col-lg-5 shadow-lg bg-white mx-auto p-4 mb-4'><StripeCheckout products={products} setReload={setReload} /><h2 className='text-white btn btn-lg bg-dark'>{totalPrice()}</h2>
            </div>
        </div>
        </div>
    </Base>
);
}

export default Cart;