const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
  return [
    // username must be an email
    body('name').isLength({ min: 2 }).withMessage('Esta pendejada no sirve'),
    // password must be at least 5 chars long
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const validateProduct = (req, rex, next) => {};

module.exports = {
  userValidationRules,
  validate,
  validarProduct: async function validarProduct(req, res, bext) {
    try {
      if (!req.body.name || !req.body.price || !req.body.description) {
        return res.status(409).json({
          status: 'No se puede añadir el producto, soy el validador',
        });
      }
    } catch (error) {
      return res
        .status(409)
        .json({ status: 'No se puede añadir el producto, soy el validador' });
    }
  },
};
