const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized, NotFound } = require("http-errors");

const { User } = require("../../models");
const { joiLoginSchema } = require("../../schemas");

const login = async (req, res) => {
  const { error } = joiLoginSchema.validate(req.body);
  if (error) {
    throw new NotFound(`missing required name field`);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const passwordCompare = bcrypt.compareSync(password, user.password);
  if (!passwordCompare) {
    throw new Unauthorized("Password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
