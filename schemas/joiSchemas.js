const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const isPhoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const joiSchemaContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(isPhoneRegex).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = {
  joiSchemaContacts,
  updateFavoriteSchema,
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifyEmailSchema,
};
