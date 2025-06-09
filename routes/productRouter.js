const productController = require('../controllers/productController');
const express=require("express");
const router=express.Router();
router.post("/payment/process",productController.processPayment);

router.get("/razorpaykey",productController.getKey);
router.post("/paymentVerification",productController.paymentVerification);
module.exports=router;