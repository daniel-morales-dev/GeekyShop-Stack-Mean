const model_user = require('../models/model_user');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';
const bcrypt = require('bcryptjs');
const userController = {};

const errors_http = {
  password_invalid: 'password_invalid',
  email_existent: 'email_existent',
  email_err: 'email_invalid',
  noexits_acc: 'account_noexists',
  password_wrong: 'password_wrong',
};

//TRAER USUARIOS
userController.getUsers = async (req, res) => {
  const users = await model_user.find();
  res.json(users);
};

//TRAER USUARIO
userController.getUser = async (req, res) => {
  const user = await model_employee.findById(req.params.id);
  res.json(user);
};

//REGISTER USUARIOS
userController.createUser = async (req, res) => {
  const { email, password } = req.body;
  const newUser = new model_user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const busqueda = await model_user.findOne({ email });
  if (busqueda) {
    return res.status(409).json({
      code_error: errors_http.email_existent, //Retorna que ya existe una cuenta asociada al email
    });
  }
  if (req.body.password.length < 4) {
    const error_clave_corta = res.status(409).json({
      code_error: errors_http.password_invalid,
    });
    return error_clave_corta;
  }
  if (
    !req.body.email.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ) //EXPRESION REGULAR PARA VALIDAR EMAILS
  ) {
    return res.status(409).json({
      code_error: errors_http.email_err,
    });
  }
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  const datos = {
    id: newUser._id,
    email: newUser.email,
    nombre_usuario: newUser.name,
    rol: newUser.rol,
  };
  const token = jwt.sign(datos, secretKey);
  return res.status(200).json({ datos, token });
};

//LOGIN USUARIOS
userController.logInUser = async (req, res) => {
  const { email } = req.body;
  const user = await model_user.findOne({ email });
  if (!user) {
    return res.status(409).json({
      code_error: errors_http.noexits_acc,
    });
  } else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const datos = {
        id: user._id,
        email: user.email,
        nombre_usuario: user.name,
        rol: user.rol,
      };
      const token = jwt.sign(datos, secretKey);
      return res.status(200).json({ datos, token });
    } else {
      return res.status(409).json({
        code_error: errors_http.password_wrong,
      });
    }
  }
};

module.exports = userController;
