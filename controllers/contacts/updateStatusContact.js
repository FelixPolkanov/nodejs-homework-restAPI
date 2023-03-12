const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { updateFavoriteSchema } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  if (!req.body) {
    const error = new Error(`missing fields`);
    error.status = 400;
    throw error;
  }
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
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

module.exports = updateStatusContact;
