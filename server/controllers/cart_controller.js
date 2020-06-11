const model_cart = require('../models/model_cart');
const model_product = require('../models/modelProducts');
const model_user = require('../models/model_user');
const cartController = {};

cartController.getAllCarts = async (req, res, next) => {
  try {
    const userId = await model_user.findById(req.params.id);
    const carts = await model_cart.find({ userId: userId._id });
    return res.json(carts);
  } catch (err) {
    next(err);
  }
};
cartController.addToCart = async (req, res, next) => {
  try {
    const data = {
      productId: req.body.productId,
      name: req.body.name,
      price: req.body.price,
      userId: req.body.userId,
    };
    const productExits = await model_product.findById(req.body.productId);
    if (!productExits) {
      return res.status(409).json({
        status: 'No se puede añadir al carrito ',
      });
    } else {
      const product = new model_cart(data);
      const resultado = await product.save();
      res.status(200).json({
        resultado,
        status: 'Carrito Añadido',
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = cartController;
