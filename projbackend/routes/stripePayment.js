var express = require("express");
var router = express.Router();
// const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { makePayment } = require("../controllers/stripePayment");

router.post("/stripepayment",makePayment);

module.exports = router;