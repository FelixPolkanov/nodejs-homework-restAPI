const express = require("express");

const ctrlWrapper = require("../../utils");
const { auth, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars",auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;