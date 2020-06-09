const model_cart = require('../models/model_cart');
const model_product = require('../models/modelProducts');
const cartController = {};

cartController.getCart = async (req, res, next) => {
  try {
    const cart = await model_cart.findById(req.params.id);
    return res.json(cart);
  } catch (err) {
    next(err);
  }
};
cartController.getAllCarts = async (req, res, next) => {
  try {
    const carts = await model_cart.find();
    return res.json(carts);
  } catch (err) {
    next(err);
  }
};
cartController.addToCart = async (req, res, next) => {
  try {
    const data = new model_cart({
      productId: req.body._id,
      name: req.body.name,
      price: req.body.price,
    });
    const resultado = await data.save();
    res.json({
      resultado: resultado,
      status: 'cart add',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = cartController;
