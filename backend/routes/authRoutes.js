const express = require("express")
const { loginController, registerController } = require("../controllers/authController")

const router= express.Router()

router.get("/login",loginController);
router.get("/register", registerController);

module.exports = router;