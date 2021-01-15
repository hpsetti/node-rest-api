const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type:Number,
        required:true
    },
    productImage: {
        type:String,
        required:true
    }
});

const Product = mongoose.model("Products",productSchema);

module.exports = Product