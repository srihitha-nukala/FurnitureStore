import React,{useState} from "react";
import ImageHelper from "./helper/imageHelper";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles.css'
import { Navigate } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";


const ProductCard = ({ product,addtoCart=true,removeFromCart=false,reload=undefined,
  setReload=f=>f
  //function(f){return f} 
}) => {

  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);



    const cartTitle = product ? product.name : "Default Name" ;
    const cartDescription = product ? product.description : "Default Description" ;
    const cartPrice = product ? product.price : "Default Price" ;

    const addToCart =()=>{
      addItemToCart(product,()=> setRedirect(true))
    }


    const getARedirect = redirect =>{
      if(redirect){
        return <Navigate to='/cart'></Navigate>
      }
    }
    

    const showAddToCart = addToCart =>{
        return (
            addtoCart && (<Button onClick={addToCart} className="shadow-md rounded ml-3  px-3" variant="primary">Add to Cart</Button>)
        )

    }

    const showRemoveFromCart = (removeFromCart) =>{
        return (
            removeFromCart && (<Button onClick={()=>{
              removeItemFromCart(product._id)
              setReload(!reload)
            }} className="shadow-sm rounded btn-md  ml-3 px-4 text-right " variant="danger">Remove</Button>) 
        )

    }

  return (
    <Card className="shadow-md bg-white ml-5  card-img-top img-fluid rounded mb-3" style={{ width: '19rem',height:'32rem'}}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <ImageHelper product={product}  />
      
      <Card.Body className="mb-0  ">
        {getARedirect(redirect)}
        <Card.Title className="text-dark text-left">{cartTitle}</Card.Title>
        <Card.Text className="text-dark text-left ">
          {cartDescription}
        </Card.Text>
        <Button className="shadow-md btn-left  rounded px-4 " variant="primary">${cartPrice}</Button>
        {showAddToCart(addToCart)}
        {showRemoveFromCart(removeFromCart)}
        
        
        
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
