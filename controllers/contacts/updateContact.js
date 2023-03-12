const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { joiSchema } = require("../../models/contact");

const updateContact = async (req, res) => {
  if (!req.body) {
    const error = new Error(`missing fields`);
    error.status = 400;
    throw error;
  }
  const { error } = joiSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
