import { API } from "../../backend";

export const handleResponse = response => {
  return response.text().then(text => {
    try {
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      return text;
    }
  });
};


export const getmeToken = (userId, token, productId) => {
  const body = { token, productId };
  return fetch(`/stripe/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then(handleResponse)
    .catch((err) => console.log(err));
};


export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

