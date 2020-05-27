const model_user = require("../models/model_user");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const bcrypt = require("bcryptjs");

const userController = {};

userController.getUsers = async (req, res) => {
  const users = await model_user.find();
  res.json(users);
};

userController.getUser = async (req, res) => {
  const user = await model_employee.findById(req.params.id);
  res.json(user);
};

userController.createUser = async (req, res) => {
  const { email, password } = req.body;
  const newUser = new model_user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const busqueda = await model_user.findOne({ email });
  if (busqueda) {
    return res.status(409).send("El correo ya existe");
  }
  if (req.body.password.length < 4) {
    const error_clave_corta = res
      .status(409)
      .send("Lo sentimos, su clave debe tener mas de 4 caracteres");
    return error_clave_corta;
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

userController.logInUser = async (req, res) => {
  const { email } = req.body;
  const user = await model_user.findOne({ email });
  if (!user) {
    return res.status(409).send("El correo no existe");
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
      return res.status(409).send("Contraseña erronea");
    }
  }
};

module.exports = userController;
