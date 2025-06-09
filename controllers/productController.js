const { get } = require('mongoose');
const instance = require('../razorpayInstance');
const crypto = require('crypto');
const processPayment=async(req,res)=>{
    const options={
        amount:Number((req.body.amount)*100),
        currency:"INR",
    }
    const order=await instance.orders.create(options);
    res.status(200).json({
        success: true,
        order,
        message: "Payment endpoint working",
    })
}
const getKey=async(req,res)=>{
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    });
}
const paymentVerification=async(req,res)=>{
    console.log(req.body);
    const {razorpay_payment_id} = req.body;
    const body=razorpay_payment_id 
    // const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');
    // console.log(`Razorpay Signature: ${razorpay_signature}`);
    // console.log(`Expected Signature: ${expectedSignature}`);
    if (razorpay_payment_id) {
        return res.status(200).json({
            success: true,
            reference: razorpay_payment_id,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }
    // res.status(200).json({
    //     success:true
    // })
}
module.exports = { processPayment,getKey, paymentVerification };