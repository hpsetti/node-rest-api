const express = require("express");
const router = express.Router();

const multer = require("multer");
const tokenVerify = require("../../middleware/tokenVerify");
const ProductController = require("../../controllers/products");

const fileFilter = function fileFilter (req, file, cb) {
 
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }
    cb(null, false)
  }

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb) {
        cb(null,new Date().toISOString()+file.originalname);
    }
})

const upload = multer({ storage:storage , fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 8}});

router.get("/",ProductController.get_products);

router.post("/",tokenVerify,upload.single('productImage'),ProductController.post_products);

router.get("/:productId",tokenVerify, ProductController.get_specific_product);

router.patch("/:productId",tokenVerify, ProductController.edit_specific_products);

router.delete("/:productId",tokenVerify, ProductController.delete_product);

module.exports = router;