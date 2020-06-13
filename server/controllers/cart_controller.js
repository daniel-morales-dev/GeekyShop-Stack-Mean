const model_cart = require('../models/model_cart');
const model_product = require('../models/modelProducts');
const model_user = require('../models/model_user');
const cartController = {};
const errors_http = {
  product_exist: 'product_exist',
  producto_not_available: 'product_not_available',
};

cartController.getAllCarts = async (req, res, next) => {
  try {
    const userId = await model_user.findById(req.params.id);
    const carts = await model_cart.find({ userId: userId._id });
    const productsOfCart = carts.map(({ productId }) => productId); //Me saca en un array, un array de productId
    const producto = await model_product
      .find()
      .where('_id')
      .in(productsOfCart[0])
      .exec(); //SI LLEGAS A CAMBIAR ESTA MIERDA TE MATO HPTA
    res.json({ carts, producto });
  } catch (err) {
    next(err);
  }
};
cartController.addToCart = async (req, res, next) => {
  try {
    const data = {
      productId: req.body.productId,
      userId: req.body.userId,
    };
    const cartExits = await model_cart.find({ userId: data.userId });
    const productExits = await model_product.findById(data.productId);
    if (!productExits) {
      return res.status(409).json({
        code_error: errors_http.producto_not_available,
        status: 'No se puede añadir al carrito',
      });
    } else if (cartExits.length > 0) {
      const verifyProductInCart = await model_cart.findOne({
        productId: data.productId,
        userId: data.userId,
      });
      if (!verifyProductInCart) {
        const resultado = await model_cart.findOneAndUpdate(
          { userId: req.body.userId },
          {
            $push: {
              productId: data.productId,
            },
          }
        );
        return res.status(200).json({
          resultado,
          status: 'Carrito Actualizado',
        });
      } else {
        return res.status(409).json({
          code_error: errors_http.product_exist,
          status:
            'No se ha podido añadir el producto, ya tienes uno igual añadido',
        });
      }
    } else {
      const product = new model_cart(data);
      const resultado = await product.save();
      return res.status(200).json({
        resultado,
        status: 'Carrito Añadido',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = cartController;
