const model_rol = require('../models/model_rol');
const rolController = {};

rolController.createRol = async (req, res, next) => {
  try {
    const data = {
      nombreRol: req.body.nombreRol,
    };

    const rol = new model_rol(data);
    const resultado = await rol.save();
    res.status(200).json({
      status: 'success',
      message: 'rol guardado con exito',
    });
  } catch (error) {
    next(error);
  }
};

rolController.getRoles = async (req, res, next) => {
  try {
    const resultado = await model_rol.find({}, { nombreRol: 1, _id: 0 });
    const nombreRoles = resultado.map(({ nombreRol }) => nombreRol);
    return res.status(200).json(nombreRoles);
  } catch (error) {
    next(error);
  }
};

module.exports = rolController;
