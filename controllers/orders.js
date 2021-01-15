const mongoose = require("mongoose");
const Product = require("../models/products");
const Order = require("../models/orders");


exports.get_orders_all = async(req,res,next) => {

    try {
        const docs = await Order.find()
        .populate('productId')
        res.status(200).json({
            message:"get order successful",
            result: docs.map(doc => {
                return {
                    _id:doc._id,
                    productId:doc.productId,
                    quantity:doc.quantity
                }
            })
        });

    } catch (error) {
        res.status(500).json({
            message:"get order unsuccessful",
            error:error
        })
    }
    
}

exports.post_orders_order = async(req,res,next) => {
    const productIdRecieved = req.body.productId;

    try {
        const productDocs = Product.findById(productIdRecieved)

        if(!productDocs) {
            throw new Error("Product Id not found.");
        }else{
            try {
                const docs = await Order.create({
                    _id:new mongoose.Types.ObjectId(),
                    productId: req.body.productId,
                    quantity: req.body.quantity
                });
                
                res.status(201).json({
                    message:"post order successful",
                    response: docs
                });
            } catch (error) {
                res.status(500).json({
                    message:"Post not successful",
                    error:error
                });
            }
        }

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }    
}

exports.get_specific_order = async(req,res,next) => {
    const id = req.params.orderId

    try {
    const docs = await Order.findById(id)
    .populate('productId')
    if(!docs){
        throw new Error("Id invalid");
    }
    res.status(200).json({
        _id:docs._id,
        productId:docs.productId,
        quantity:docs.quantity
    })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

exports.delete_order = async(req,res,next) => {
    const id = req.params.orderId;

    try {
        const docs = await Order.findByIdAndDelete(id)
        .populate("productId")
        res.status(201).json({
            message:`deleted order ${id} successfully.`,
            product:{
                _id:docs._id,
                productId:docs.productId,
                quantity:docs.quantity
            }
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
 
}