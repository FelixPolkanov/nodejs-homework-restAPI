const express = require("express");

const { ctrlWrapper, auth, validation, upload } = require("../../middlewares");
const {joiVerifyEmailSchema} = require("../../schemas");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars",auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(joiVerifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;