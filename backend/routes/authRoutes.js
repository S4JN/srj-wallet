const express = require("express")
const { loginController, registerController } = require("../controllers/authController");


const router= express.Router()

//inko post krna h na dada
router.post("/login",loginController);
router.post("/signup", registerController);
// router.put("/",authMiddleware, userController)

module.exports = router;