const express = require("express");
const { balanceController } = require("../controllers/accountController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/balance",authMiddleware, balanceController);

module.exports = router;
