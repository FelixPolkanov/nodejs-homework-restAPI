const express = require("express");
const ctrlWrapper = require("../../utils");
const { auth: ctrl } = require("../../controllers");


const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));




module.exports = router;