const express = require("express");

const ctrlWrapper = require("../../utils");
const { auth: ctrl } = require("../../controllers");
const { auth }  = require("../../middlewares");

const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;