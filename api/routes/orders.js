const express = require("express");

const router = express.Router();

const OrdersController = require("../../controllers/orders");

const tokenVerify = require("../../middleware/tokenVerify");


router.get("/",OrdersController.get_orders_all);

router.post("/",tokenVerify,OrdersController.post_orders_order);

router.get("/:orderId", tokenVerify,OrdersController.get_specific_order);

router.delete("/:orderId",tokenVerify,OrdersController.delete_order);

module.exports = router;