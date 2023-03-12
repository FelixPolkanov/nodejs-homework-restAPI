const { Contact } = require("../../models");
const { joiSchema } = require("../../models/contact");

const addContact = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

module.exports = addContact;
