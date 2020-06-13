const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';
const ROL = require('../data');
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
};
