const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required: true
    },
    quantity: {
        type:Number,
        default: 1
    }
});

const Order = mongoose.model("Orders",orderSchema);

module.exports = Order;