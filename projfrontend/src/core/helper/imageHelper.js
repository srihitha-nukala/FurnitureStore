import React from "react";
import { API } from "../../backend";
import Card from 'react-bootstrap/Card';



const ImageHelper = ({ product }) => {
  console.log(product._id);
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `../../FurnitureImages/chair6.jpeg`;
  return (
    <div className="rounded border py-2 px-1">
      <Card.Img style={{maxwidth: "18rem", height: "20rem"}}
        src={imageurl}
        alt="photo"
        className="mb-1 shadow-sm rounded"
      />
    </div>
  );
};

export default ImageHelper;
