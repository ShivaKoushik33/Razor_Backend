const express=require("express");
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
const port =process.env.PORT || 3000;
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
const cors=require("cors");
dotEnv.config();
const Razorpay = require("razorpay");
const processing = require("./controllers/productController");
const productRoutes=require("./routes/productRouter");
app.use(express.urlencoded({ extended: true }));
// Initialize Razorpay
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});


// Debug: check Razorpay keys
// console.log("Razorpay keys:", process.env.RAZORPAY_API_KEY, process.env.RAZORPAY_API_SECRET);



// Define route
// app.post("/payment/process",processing.processPayment);

app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use("/product",productRoutes);

app.listen(port,()=>{
    console.log('Server started at PORT '+port);
})
app.use("/",(req,res)=>{
    res.send("<h1>PAYMENT </h1>");
})      