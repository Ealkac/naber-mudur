const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => ({ path: err.path[0], message: err.message }));
    return res.status(400).json({ errors });
  }
  next();
};

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const projectSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).optional().allow(''),
  imageUrl: Joi.string().uri().optional().allow(''),
  projectUrl: Joi.string().uri().optional().allow(''),
  githubUrl: Joi.string().uri().optional().allow(''),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
exports.validateProject = validate(projectSchema);
