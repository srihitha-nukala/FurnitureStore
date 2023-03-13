var express = require("express");
var router = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById} = require("../controllers/user");
const {getCategoryById,createCategory,getCategory,getAllCategory, updateCategory,removeCategory} = require("../controllers/category");

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here
//creating a category
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);
//getting a category
router.get("/category/:categoryId",getCategory);
//getting all categories
router.get("/categories",getAllCategory);
//updating the category
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);
////deleting the category
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);


module.exports= router;