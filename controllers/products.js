const mongoose = require("mongoose");
const Product = require("../models/products");

exports.get_products = async (req,res,next) => {
    try {
        const docs = await Product.find()
        const response = {
            message: "The GET Message is Successful",
            body: docs.map(doc => {
                return {
                    id:doc._id,
                    name:doc.productName,
                    price:doc.productPrice,
                    url:"http://localhost:3000/product/"+doc._id
                }
            })
        }

        res.status(200).json({
            response:response
        });
        
        
    } catch (error) {
        res.status(500).json({
            message:"Get request unsuccessful",
            error: error
        });
    }

}

exports.post_products = async (req,res,next) => {
    try {
        const response = await Product.create({
            _id:new mongoose.Types.ObjectId,
            productName:req.body.productName,
            productPrice:req.body.productPrice,
            productImage:req.file.filename
        })
        
        res.status(201).json({
            message:"POST was successful!",
            response:response
        })
    } catch (error) {
        // console.log(req.file);
        res.status(500).json({
            message:"POST Unsuccessful",
            error:error
        });
    }
    
}

exports.get_specific_product = async (req,res,next) => {
    const id = req.params.productId
    try {
        const doc = await Product.findById(id)
        if(!doc){
            res.status(404).json({
                message:"entry not found",
                response:doc
            })
        }
        res.status(200).json({
            message:"Entry found",
            response:doc,
            url:"http://localhost:3000/product/"+doc._id
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Error encountered",
            error:error
        })
    }
}

exports.edit_specific_products = async(req,res,next) => {
    const id = req.params.productId
    const payload = {
        productName: req.body.name,
        productPrice: req.body.price
    }
    try {
        const doc = await Product.findByIdAndUpdate(id,payload)
        if(doc){
            res.status(200).json({
                message:"entry updated",
                response:doc,
                url:"http://localhost:3000/product"+doc._id
            })
        }else{
            res.status(404).json({
                message:"entry not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message:"Error encountered",
            error:error
        });
    }
}

exports.delete_product = async (req,res,next) => {
    const id = req.params.productId;
    try {
        const doc = await Product.findOneAndDelete(id);
        
            res.status(200).json({
                message:"entry deleted",
                response:doc
            })
    } catch (error) {
        res.status(500).json({
            message:"Error encountered",
            error:error
        });
    }
}