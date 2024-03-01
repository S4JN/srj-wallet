const express = require("express");
const { balanceController, transferController } = require("../controllers/accountController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/balance",authMiddleware, balanceController);
router.post("/transfer",authMiddleware, transferController);

module.exports = router;
