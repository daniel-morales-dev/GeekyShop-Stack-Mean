const model_user = require('../models/model_user');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;
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
  try {
    const users = await model_user.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
//TRAER USUARIO
userController.getUser = async (req, res) => {
  try {
    const user = await model_user.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

userController.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resultado = await model_user.findByIdAndDelete(id);
    return res.status(200).json({
      status: 'success',
      message: 'Eliminacion exitosa',
    });
  } catch (error) {
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const user = await model_user.findById(id);
    const data = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.rol != undefined) {
      data.rol = req.body.rol;
    }
    if (
      (req.body.passwordActual == undefined &&
        req.body.passwordNueva == undefined) ||
      (req.body.passwordActual == '' && req.body.passwordNueva == '')
    ) {
      data.password = user.password;
    } else {
      data.password = req.body.passwordNueva;
      const passwordHash = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);
      data.password = passwordHash;
    }

    const resultado = await model_user.findByIdAndUpdate(
      id,
      { $set: data },
      { $new: true }
    );
    res.status(200).json({
      resultado,
      status: 'Usuario actualizado',
    });
  } catch (err) {
    next(err);
  }
};

//REGISTER USUARIOS
userController.createUser = async (req, res) => {
  const { email, password } = req.body;
  const newUser = new model_user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const passwordHash = await bcrypt.hash(newUser.password, BCRYPT_SALT_ROUNDS);
  newUser.password = passwordHash;
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
