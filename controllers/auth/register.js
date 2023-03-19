const { User } = require("../../models");
const { Conflict, NotFound } = require("http-errors");
const { joiRegisterSchema } = require("../../schemas");

const bcrypt  = require("bcryptjs");

const register = async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    throw new NotFound(`missing required name field`);
    }
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
   throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword});
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};


module.exports = register;
