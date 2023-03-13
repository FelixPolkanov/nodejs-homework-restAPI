
const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const { joiSchema } = require("../../schemas");

const addContact = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new NotFound(`missing required name field`);
    }
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

module.exports = addContact;
