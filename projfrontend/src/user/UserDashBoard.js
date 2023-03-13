// import React from 'react';
// import Base from '../core/Base'

// const UserDashBoard =()=> {
//   return (
//     <Base title='User Dashboard Page'>
//     <h1>This is User Dashboard page</h1>
//     </Base>
//   )
// }

// export default UserDashBoard;

import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { getUser } from './helper/userapicalls';
import Base from '../core/Base';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });
  const { name, email, role } = user;

  const { token } = isAuthenticated();

  const preload = () => {
    getUser(isAuthenticated().user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  // const userLeftSide = () => {
  //   return (
  //     <div className="card">
  //       <h4 className="card-header bg-dark text-white">User Navigation</h4>
  //       <ul className="list-group">
  //         <li className="list-group-item">
  //           <Link to="/user/orders" className="nav-link text-success">
  //             My Orders
  //           </Link>
  //         </li>
  //         <li className="list-group-item">
  //           <Link to="/user/profile" className="nav-link text-success">
  //             Update Profile
  //           </Link>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // };

  

  const userRightSide = () =>{
    return (
      <div >
      <Toast className='mb-4' >
      <Toast.Header className='admin text-white'>
        <strong className="me-auto  ">Name:</strong>
      </Toast.Header>
      <Toast.Body>{name}</Toast.Body>
    </Toast>
    <Toast className='mb-4' >
    <Toast.Header className='admin text-white'>
      <strong className="me-auto">Email:</strong>
    </Toast.Header>
    <Toast.Body>{email}</Toast.Body>
  </Toast>
  <Toast className='mb-4' >
    <Toast.Header className='admin text-white'>
      <strong className="me-auto">Role:</strong>
    </Toast.Header>
    <Toast.Body>{role}</Toast.Body>
  </Toast>
  </div>
    )
  }

  // const userRightSide = () => {
  //   return (
  //     <div className="card mb-4">
  //       <h4 className="card-header bg-dark text-white">User Information</h4>
  //       <ul className="list-group">
  //         <li className="list-group-item">
  //           <span className="badge bg-success me-2">Name:</span> {name}
  //         </li>
  //         <li className="list-group-item">
  //           <span className="badge bg-success me-2">Email:</span> {email}
  //         </li>
  //         <li className="list-group-item">
  //           <span className="badge bg-danger">User Area</span>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // };

  // const endSide =() =>{
  //   return (
  //     <div>
  //       {isAuthenticated() && isAuthenticated().user.role===0 && (<h2 className='admin shadow-lg rounded p-2 text-center text-White' >User Dashboard</h2>)}
        
  //     </div>
  //   )
  // }
   

  return (
    <Base
      title="Welcome to User Dashboard"
      description="Manage all of your orders and profile here"
      className="container shadow-lg rounded p-4 bg-light col-lg-5 col-md-4 col-sm-6 py-2 mt-5 mb-5"
    >
      <div className="row ">
        <h2 className='admin shadow-lg rounded p-2 text-center text-white'>USER DASHBOARD</h2>
        
        <div className="mx-auto col-lg-8">{userRightSide()}</div>
        
      </div>
    </Base>
  );
};

export default UserDashboard;
