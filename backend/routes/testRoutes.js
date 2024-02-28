const express = require("express")
const { testController, protectedController } = require("../controllers/testController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router= express.Router()

router.get("/",testController);
router.get("/prt",authMiddleware, protectedController );


module.exports = router;