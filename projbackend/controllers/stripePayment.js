const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51HJysRKt8ejHlHuSWmShDb0qc8p6yRXKbsANROvR2KCaoB3SbH0LNbXQM7tvVhvvJmXxczQYmYQV28n12fVuhd6S00otmnxcyF")

// exports.makePayment = (req, res) => {
//   const { products, token } = req.body;
//   console.log("Products", products);

//   try {
//     let total = 0;
//     products?.map((product) => {
//       console.log(product);
//       total = total + product.price;
//     });
//     //   return total;
//     total = total.toLocaleString("en-US", {
//       style: "currency",
//       currency: "USD",
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   const idempotencyKey = uuidv4();
//   return stripe.customers.create({
//     email: token.email,
//     source: token.id,
//   }).then(customer => {
//     stripe.charges.create({
//       amount: total ,
//       currency: 'usd',
//       customer: customer.id,
//       receipt_email: token.email,
//       description: "a test account",
//       shipping: {
//         name: token.card.name,
//         address: {
//           line1: token.card.address_line1,
//           line2: token.card.address_line2,
//           city: token.card.address_city,
//           country: token.card.address_country,
//           postal_code: token.card.address_zip,
//         },
//       },
//     }, { idempotencyKey })
//       .then((result) => res.status(200).json(result))
//       .catch((err) => console.log(err));
//   });
// };


// exports.makePayment = (req, res) => {
//   const { products, token } = req.body;
//   console.log("Products", products);

//   let total = 0; // declare total outside the try block

//   try {
//     products?.map((product) => {
//       console.log(product);
//       total = total + product.price;
//     });
//     total = total.toLocaleString("en-US", {
//       style: "currency",
//       currency: "USD",
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   const idempotencyKey = uuidv4();
//   return stripe.customers.create({
//     email: token.email,
//     source: token.id,
//   }).then(customer => {
//     stripe.charges.create({
//       amount: total ,
//       currency: 'usd',
//       customer: customer.id,
//       receipt_email: token.email,
//       description: "a test account",
//       shipping: {
//         name: token.card.name,
//         address: {
//           line1: token.card.address_line1,
//           line2: token.card.address_line2,
//           city: token.card.address_city,
//           country: token.card.address_country,
//           postal_code: token.card.address_zip,
//         },
//       },
//     }, { idempotencyKey })
//       .then((result) => res.status(200).json(result))
//       .catch((err) => console.log(err));
//   });
// };

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  console.log("Products", products);

  let total = 0; // declare total outside the try block

  if (Array.isArray(products)) {
    try {
      products.map((product) => {
        console.log(product);
        total = total + product.price;
      });
      total = total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  }
  let amount = 0; // set the amount to any value you want

if (amount < 1) {
  amount = 1; // set the minimum value of amount to 1
}

stripe.charges.create({
  amount: amount,
  currency: 'usd',
  source: 'tok_visa',
  description: 'Charge for test@example.com'
}).then(charge => {
  console.log(charge);
}).catch(err => {
  console.log(err);
});








  const idempotencyKey = uuidv4();
  return stripe.customers.create({
    email: token.email,
    source: token.id,
  }).then(customer => {
    stripe.charges.create({
      amount: total ,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: "a test account",
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    }, { idempotencyKey })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  });
};

exports.makePayment
