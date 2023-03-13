var express = require("express");
var router = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById,pushOrderPurchaseList} = require("../controllers/user");
const {getCategoryById,createCategory,getCategory,getAllCategory, updateCategory,removeCategory} = require("../controllers/category");
const { getProductById, createProduct, getProduct, getAllProducts, updateProduct, removeProduct,photo,getAllUniqueCategories ,updateStock} = require("../controllers/product");

const {getOrderById, createOrder, getAllOrders, updateOrder, getOrderStatus} =require("../controllers/order")

//all of params
router.param("userId",getUserById);
// router.param("categoryId",getCategoryById);
//get product by id
// router.param("productId",getProductById);
//get order by id
router.param("orderId",getOrderById);

//create order
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderPurchaseList,updateStock,createOrder)
//read
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateOrder)

module.exports = router;