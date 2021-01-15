const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

const User = require("../models/users")


exports.user_signup = async (req,res,next) => {
    try {
        const userName = await User.find({username: req.body.username})
        if(userName.length <= 0) {

            await bcrypt.hash(req.body.password,11, (err,hash) => {
                if(err){
                    res.status(419).json({
                        message:"Error in Auth"
                    })
                }else {
                    const passwd = hash;
                        const userData = User.create({
                            username: req.body.username,
                            password:passwd
                    });
                    res.status(201).json({
                        message:"user successfully created"
                    })
                }
            })
        }else {
            throw new Exception();
        }
        
    } catch (error) {
        res.status(409).json({
            message:"User already exists",
            error:error
        })
    }
      
}

exports.user_login = async (req,res,next) => {

    try {
        
        const userData = await User.find({username:req.body.username})
        
        if (userData.length <=0 ){
            res.status(404).json({
                message:"User Not found"
            })
        }else {
            const passwd = req.body.password;
            const result = await bcrypt.compare(passwd,userData[0].password)

            try {
                if(!result) {
                    throw new Exception();
                }
                const token = jwt.sign({
                    username:userData[0].username,
                    _id:userData[0]._id
                },process.env.SECRET,
                {
                    expiresIn: "1h"
                })
                res.status(200).json({
                    message:"Auth successful",
                    token:token
                });

            } catch (error) {
                res.status(409).json({
                    message:"Auth failed"
                });
            }   
            
        }
    } catch (error) {
        res.status(500).json({
            message:"enter a valid entry",
            error:error
        })
    }

}

exports.user_delete = async(req,res,next) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.userId)
        res.status(201).json({
            message:"user successfully deleted"
        });

    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}