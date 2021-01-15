const jwt = require("jsonwebtoken");


module.exports = (req,res,next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]

        const verified = jwt.verify(token,process.env.SECRET);

        next()
    } catch (error) {
        res.status(500).json({
            message:"Server failed"
        })
    }

    
}