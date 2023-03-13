const User = require("../models/user")
const express = require("express");
const router = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById, getUser,getAllUsers,updateUser, userPurchaseList} = require("../controllers/user");

//to get userby id
router.param("userId",getUserById);
//to get user 
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
//to Update user
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
//allow order to purchase list
router.put("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);
//to get all users
router.get("/users",getAllUsers)

module.exports= router;
