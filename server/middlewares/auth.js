const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';
const ROL = require('../data');
const model_user = require('../models/model_user');
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
        console.log(decoded);
        console.log(req.body);
        console.log(Object.entries(req.params).length === 0);
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
  verifyUser: async function verificarUsuario(req, res, next) {
    const { email, password } = req.body;
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
        }
      });
    } catch (error) {
      return res.status(401).send('Peticion no autorizada');
    }
  },
};
