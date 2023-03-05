const express = require("express");

const router = express.Router();
const contactsOperation = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
         error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const result = await contactsOperation.addContact(req.body);
//     res.json({ message: "tem" });
//   }
//   catch (error) {
//     next(error)
//   }
// }
// )






router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template me4444ssage" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
