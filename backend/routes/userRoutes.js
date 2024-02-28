
const { userController, filterUser } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const express = require("express")
const router= express.Router()



router.put("/",authMiddleware, userController)
router.get("/bulk", authMiddleware, filterUser);

module.exports = router;