const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.json({ message: "Invalid input", error });

  next();
};

const loginValidation = (req, res, next) => {

  console.log(req.body);

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.json({ message: "Invalid input", error });

  next();
};

module.exports = { signupValidation, loginValidation };