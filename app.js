const express = require('express');
const app = express();

const morgan = require('morgan');

const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
app.use(cors());


mongoose.Promise = global.Promise;

// Mongoose config
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true},()=> {
    console.log("DB connected!")
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('tiny'));

app.use("/uploads", express.static("uploads"));

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");


app.use("/product",productRoutes);
app.use("/order", orderRoutes);
app.use("/user",userRoutes);

app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status = 404
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;