const modelProduct = require('../models/modelProducts');
const productController = {};

productController.createProduct = async (req, res, next) => {
  try {
    const Product = new modelProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    const resultado = await Product.save();
    res.json({
      resultado: resultado,
      status: 'Product save',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
