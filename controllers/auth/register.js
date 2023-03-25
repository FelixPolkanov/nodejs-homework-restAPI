const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { Conflict} = require("http-errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({ name, email, avatarURL, password: hashPassword });
  res.status(201).json(result);
};

module.exports = register;
