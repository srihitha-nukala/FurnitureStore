var express = require("express");
var router = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById} = require("../controllers/user");
const {getCategoryById,createCategory,getCategory,getAllCategory, updateCategory,removeCategory} = require("../controllers/category");
const { getProductById, createProduct, getProduct, getAllProducts, updateProduct, removeProduct,getPhoto,getAllUniqueCategories } = require("../controllers/product");

//all of params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);
//get product by id
router.param("productId",getProductById);


//creating a product
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
//getting a product
router.get("/product/:productId",getProduct);
//to get photo
router.get("/product/photo/:productId",getPhoto);
//to get all products
router.get("/products",getAllProducts);
//to update products
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
//to delete products
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,removeProduct);

router.get("/products/categories",getAllUniqueCategories)

module.exports=router;