const model_wishList = require('../models/model_wishlist');
const wishListController = {};

wishListController.addToWishList = async (req, res, next) => {
  try {
    const data = new model_wishList({
      productId: req.body._id,
    });
    const resultado = await data.save();
    res.json({
      resultado: resultado,
      status: 'Product add to wishList',
    });
  } catch (error) {
    next(error);
  }
};
wishListController.getWishList = async (req, res, next) => {
  try {
    const data = await model_wishList.find();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
wishListController.deleteFromWishList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await model_wishList.findOneAndDelete({ productId: id });
    if (!data) {
      return res.status(409).json({
        status: 'No se pudo encontrar tu lista de deseos',
      });
    } else {
      return res.status(200).json({
        status: 'Producto eliminado de tu lista de deseos',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = wishListController;
