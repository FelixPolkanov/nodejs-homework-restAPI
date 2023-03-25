const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth }  = require("../../middlewares");
const {joiSchemaContacts, updateFavoriteSchema} = require("../../schemas");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth,validation(joiSchemaContacts), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validation(joiSchemaContacts), ctrlWrapper(ctrl.updateContact));

router.patch("/:contactId/favorite",validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
