const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", ctrlWrapper(ctrl.updateContact));

router.patch("/:contactId/favorite", ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
