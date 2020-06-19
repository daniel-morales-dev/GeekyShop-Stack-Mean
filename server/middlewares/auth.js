const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';
const ROL = require('../data');
const model_user = require('../models/model_user');
const bcrypt = require('bcryptjs');
const errors_http = {
  password_invalid: 'password_invalid',
  email_existent: 'email_existent',
  email_err: 'email_invalid',
  noexits_acc: 'account_noexists',
  password_wrong: 'password_wrong',
};
module.exports = {
  verifyToken: async function verificarToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ err: 'Peticion no autorizada' });
      }
      const token = req.headers.authorization.split(' ')[1];
      if (token == '' || null) {
        return res.status(401).json({ err: 'Peticion no autorizada' });
      }
      const payload = await jwt.verify(token, secretKey);
      if (!payload) {
        return res.status(401).json({ err: 'Peticion no autorizada' });
      }
      req.userId = payload._id;
      next();
    } catch (e) {
      return res.status(401).send('Peticion no autorizada');
    }
  },
  canManageEmployees: async function canManageEmployees(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await jwt.verify(token, secretKey, function (
        err,
        decoded
      ) {
        if (decoded.rol != ROL.ADMIN) {
          return res.status(401).json({ err: 'Peticion no autorizada' });
        } else {
          next();
        }
      });
    } catch (e) {
      return res.status(401).send('Peticion no autorizada');
    }
  },
  canViewCartAndWishList: async function canViewCartAndWishList(
    req,
    res,
    next
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await jwt.verify(token, secretKey, function (
        err,
        decoded
      ) {
        if (Object.entries(req.params).length > 0) {
          if (decoded.id != req.params.id) {
            return res.status(401).json({
              err:
                'Peticion no autorizada, no eres el dueño del carrito/WishList',
            });
          }
        } else if (decoded.id != req.body.userId) {
          return res.status(401).json({
            err:
              'Peticion no autorizada, no eres el dueño del carrito/WishList, PUT - POST',
          });
        }
        next();
      });
    } catch (err) {
      return res.status(401).send('Peticion no autorizada, en try catch');
    }
  },
  verifiyUserUpdateProfile: async function verificarUsuario(req, res, next) {
    try {
      const id = req.params.id;
      const user = await model_user.findById(id);
      const busqueda = await model_user.findOne({ email: req.body.email });
      if (user.email != req.body.email) {
        if (busqueda) {
          return res.status(409).json({
            code_error: errors_http.email_existent, //Retorna que ya existe una cuenta asociada al email
          });
        }
      }
      if (
        (!req.body.passwordActual || req.body.passwordActual === '') &&
        req.body.passwordNueva
      ) {
        return res.status(409).json({
          status: 'error',
          message: 'Por favor, ingrese su contraseña actual',
        });
      }
      if (req.body.passwordActual) {
        const match = await bcrypt.compare(
          req.body.passwordActual,
          user.password
        );
        if (!match) {
          return res.status(409).json({
            status: 'Error',
            message: 'Su contraseña actual esta incorrecta',
          });
        }
        if (req.body.passwordNueva.length < 4) {
          return res.status(409).json({
            status: 'Error',
            code_error: errors_http.password_invalid,
          });
        }
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
      if (!user) {
        return res.status(409).json({
          status: 'Error',
          message: 'No existe el usuario',
        });
      }
      next();
    } catch (error) {
      return res.status(409).json({
        status: 'Error',
        message: 'No puede terminarse su solictud',
      });
    }
  },
  verifyUserRegister: async function verificarUsuario(req, res, next) {
    const busqueda = await model_user.findOne({ email: req.body.email });
    if (busqueda) {
      return res.status(409).json({
        code_error: errors_http.email_existent, //Retorna que ya existe una cuenta asociada al email
      });
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
    next();
  },
  canManageProducts: async function canManageProducts(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await jwt.verify(token, secretKey, function (
        err,
        decoded
      ) {
        if (decoded.rol != ROL.ADMIN && decoded.rol != ROL.EMPLEADO) {
          return res.status(401).json({ err: 'Peticion no autorizada' });
        } else {
          next();
        }
      });
    } catch (e) {
      return res.status(401).send('Peticion no autorizada');
    }
  },
  canUpdateProfileUser: async function canUpdateProfileUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await jwt.verify(token, secretKey, function (
        err,
        decoded
      ) {
        if (decoded.rol == ROL.ADMIN || decoded.rol == ROL.EMPLEADO) {
          next();
        } else if (decoded.id == req.params.id) {
          next();
        } else {
          return res.status(401).json({
            status: 'Error',
            message: 'No puedes hacer cambios que no sean a tu perfil',
          });
        }
      });
    } catch (error) {
      return res.status(401).send('Peticion no autorizada');
    }
  },

  verifyDeleteUser: async function deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const idUserModificador = req.body._id;
      const userPorEliminar = await model_user.findById(id);
      if (!userPorEliminar) {
        return res.status(409).json({
          status: 'Error',
          message: 'No existe dicho usuario',
        });
      }
      if (idUserModificador === id) {
        return res.status(409).json({
          status: 'Error',
          message: 'No puedes eliminar tu propia cuenta',
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(409).json({
        status: 'Error',
        message: 'No puedes eliminar tu propia cuenta',
      });
    }
  },
};
