import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { loadCart,cartEmpty} from '../core/helper/cartHelper'
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';


const StripeCheckout = (products,setReload=f=>f,reload=undefined) => {

    const [data, setData] = useState({
        loading:false,
        error:false,
        success:false,
        address:""

    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    // console.log(products)


    const makePayment = (token) => {
      const body = {token,products}
      const headers = {
        "Content-Type":"application/json",
      }
      return fetch(`${API}/stripepayment`,{
        method:"POST",
        headers,
        body:JSON.stringify(body)
      }).then(response =>{
        console.log(response)
        //call further methods
        const {status} = response;
        console.log("STATUS " , status);
    
        cartEmpty(() => {
          console.log("Cart emptied");
        });
        setReload(!reload);
        setData({ loading: false, success: true });

    
      })
      .catch(error => {
        setData({ loading: false, success: false });
        console.log("PAYMENT FAILED", error);
      });
    };

    
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
        } catch 
        (error) {
        console.log(error);
        }
    };


    const showStripeButton = () =>{
        return isAuthenticated() ? (
            <StripeCheckoutButton 
            stripeKey='pk_test_51HJysRKt8ejHlHuS6FhC1jRheNPyKPp58VGkf0ZWNnjVbjImMzGyyhKgHGHK1CtKjXda3AydrikJ7Ccwm8yZuSVn00hSegmBxm'
            token={makePayment}
            amount={totalPrice() *100}
            name="Buy Products"
            shippingAddress
            billingAddress
            >
                
                <button  className="shadow-md rounded mb-3 px-3" variant="primary">Pay with Stripe</button></StripeCheckoutButton>
            
        ):(
            <Link to="/signin"><button className="shadow-md rounded mb-3 px-3" variant="warning">SignIn</button></Link>
        )
    }


return (
    <div>
    <h2 className='text-dark mb-5 '>StripeCheckout loaded </h2>
    {showStripeButton()}
    </div>
  )
}

export default StripeCheckout;


// import React, { useState, useEffect } from 'react';
// import { isAuthenticated } from '../auth/helper';
// import { loadCart, cartEmpty } from '../core/helper/cartHelper';
// import { Link } from 'react-router-dom';
// import StripeCheckoutButton from 'react-stripe-checkout';
// import { API } from '../backend';

// const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {
//   const [data, setData] = useState({
//     loading: false,
//     error: false,
//     success: false,
//     address: ''
//   });

//   console.log(products);

//   const makePayment = token => {
//     const body = { token, products };
//     const headers = {
//       'Content-Type': 'application/json'
//     };
//     return fetch(`${API}/stripepayment`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(body)
//     })
//       .then(response => {
//         console.log(response);
//         const { status } = response;
//         console.log('STATUS ', status);

//         cartEmpty(() => {
//           console.log('Cart emptied');
//         });
//         setReload(!reload);
//         setData({ loading: false, success: true });
//       })
//       .catch(error => {
//         setData({ loading: false, success: false });
//         console.log('PAYMENT FAILED', error);
//       });
//   };

//   const performPayment = async (req, res) => {
//   try {
//     const { products, token } = req.body;

//     let amount = 0;
//     products.map((product) => {
//       amount += product.price * product.count;
//     });

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//       name: token.name,
//       address: {
//         line1: token.card.address_line1,
//         line2: token.card.address_line2,
//         city: token.card.address_city,
//         state: token.card.address_state,
//         country: token.card.address_country,
//         postal_code: token.card.address_zip,
//       },
//     });

//     const payment = await stripe.charges.create({
//       amount: amount * 100,
//       currency: "inr",
//       customer: customer.id,
//       receipt_email: token.email,
//       description: "Purchase of products",
//       shipping: {
//         name: token.name,
//         address: {
//           line1: token.card.address_line1,
//           line2: token.card.address_line2,
//           city: token.card.address_city,
//           state: token.card.address_state,
//           country: token.card.address_country,
//           postal_code: token.card.address_zip,
//         },
//       },
//     });

//     console.log(payment);
//     res.json({
//       success: true,
//       message: "Payment successful",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Payment failed",
//     });
//   }
// };


//   const totalPrice = () => {
//     try {
//       let total = 0;
//       if (products) {
//         products.forEach(product => {
//           console.log(product);
//           total = total + product.price;
//         });
//       }
//       return total.toLocaleString('en-US', {
//         style: 'currency',
//         currency: 'USD'
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const showStripeButton = () => {
//     return isAuthenticated() ? (
//       <StripeCheckoutButton
//         stripeKey='pk_test_51HJysRKt8ejHlHuS6FhC1jRheNPyKPp58VGkf0ZWNnjVbjImMzGyyhKgHGHK1CtKjXda3AydrikJ7Ccwm8yZuSVn00hSegmBxm'
//         token={makePayment}
//         amount={totalPrice() * 100}
//         name='Buy Products'
//         shippingAddress
//         billingAddress>
//         <button className='shadow-md rounded ml-3 px-3' variant='primary'>
//           Pay with Stripe
//         </button>
//       </StripeCheckoutButton>
//     ) : (
//       <Link to='/signin'>
//         <button className='shadow-md rounded ml-3 px-3' variant='warning'>
//           SignIn
//         </button>
//       </Link>
//     );
//   };

//   return (
//     <div>
//       {data.success && <h2>Payment successful!</h2>}
//       <h2 className='text-dark'>StripeCheckout loaded </h2>
//       <button className='text-white btn btn-lg bg-dark'></button>

//       {showStripeButton()}
//     </div>
//   );
// };

// export default StripeCheckout;


// import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
// import { isAuthenticated } from "../auth/helper";
// import { cartEmpty, loadCart } from "./helper/cartHelper";
// import { getmeToken, processPayment } from "./helper/paymentHelper";
// import { createOrder } from "./helper/orderHelper";
// import DropIn from "braintree-web-drop-in-react";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Link } from "react-router-dom";
// import { API } from "../backend";
// import { loadStripe } from "@stripe/stripe-js";

// const Paymentb = ({ products, reload = undefined, setReload = (f) => f, setAlert = false }) => {
//   const [info, setInfo] = useState({
//     loading: false,
//     success: false,
//     clientToken: null,
//     error: "",
//     instance: {},
//     address: "",
//   });

//   const userId = isAuthenticated() && isAuthenticated().user._id;
//   const token = isAuthenticated() && isAuthenticated().token;

//   const getToken = (userId, token) => {
//     getmeToken(userId, token).then((info) => {
//       console.log("INFORMATION", info);
//       if (info.error) {
//         setInfo({ ...info, error: info.error });
//       } else {
//         const clientToken = info.clientToken;
//         setInfo({ clientToken });
//       }
//     });
//   };

//   useEffect(() => {
//     getToken(userId, token);
//   }, []);

//   const getAmount = () => {
//     let amount = 0;
//     products.map((p) => {
//       amount = amount + parseInt(p.price);
//     });
//     return amount;
//   };

//   const onPurchase = () => {
//     setInfo({ loading: true });
//     let nonce;
//     let getNonce = info.instance
//       .requestPaymentMethod()
//       .then((data) => {
//         console.log("MYDATA", data);
//         nonce = data.nonce;
//         const paymentData = {
//           paymentMethodNonce: nonce,
//           amount: getAmount(),
//         };
//         processPayment(userId, token, paymentData)
//           .then((response) => {
//             console.log("POINT 1", response);
//             if (response.error) {
//               if (response.code == "1") {
//                 console.log("PAYMENT FAILED");
//                 setAlert({
//                   type: "warning",
//                   message: "Payment failed, please try again.",
//                 });
//               }
//             } else {
//               setInfo({ ...info, success: response.success, loading: false });
//               console.log("PAYMENT SUCCESS");

//               let product_names = "";
//               products.forEach(function (item) {
//                 product_names += item.name + ", ";
//               });

//               const orderData = {
//                 products: product_names,
//                 transaction_id: response.transaction.id,
//                 amount: response.transaction.amount,
//               };
//               createOrder(userId, token, orderData)
//                 .then((response) => {
//                   if (response.error) {
//                     if (response.code == "1") {
//                       console.log("ORDER FAILED");
//                       setAlert({
//                         type: "warning",
//                         message: "Order failed",
//                       });
//                     }
//                   } else {
//                     if (response.success == true) {
//                       console.log("ORDER PLACED");
//                       setAlert({
//                         type: "success",
//                         message: "Order placed successfully",
//                       });
//                       cartEmpty(() =>


