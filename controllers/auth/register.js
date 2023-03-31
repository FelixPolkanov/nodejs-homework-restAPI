const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");

const { User } = require("../../models");
const { Conflict } = require("http-errors");
const { sendEmail } = require("../../helpers");


const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const veryficationToken = uuid();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({ name, email, avatarURL, veryficationToken, password: hashPassword });
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://local host:3000/api/users/verify/${veryficationToken}">подтвердить email</a>`
  };
  await sendEmail(mail);
  res.status(201).json(result);
};

module.exports = register;
