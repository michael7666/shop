const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//import routers
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const paystackRoute = require("./routes/paystack");


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log("DB Connection is successful")).catch((err)=>{
    console.log(err)
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkouts", stripeRoute);
app.use("/api/paystacks", paystackRoute);

app.listen(process.env.PORT || 8800,() =>{
    console.log("server is running is port 8800!");
});