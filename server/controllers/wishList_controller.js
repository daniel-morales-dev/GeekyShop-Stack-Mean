const model_product = require('../models/modelProducts');
const model_wishList = require('../models/model_wishlist');
const wishListController = {};
const errors_http = {
  product_exist: 'product_exist',
  producto_not_available: 'product_not_available',
  campos_requeridos: 'Campos_Requeridos',
};
wishListController.addToWishList = async (req, res, next) => {
  try {
    const data = {
      productId: req.body.productId,
      userId: req.body.userId,
    };
    if (!data.productId || !data.userId) {
      return res.status(409).json({
        code_error: errors_http.campos_requeridos,
        status: 'No se puede añadir los productos, tus campos son requeridos',
      });
    }
    const WishListExits = await model_wishList.find({ userId: data.userId });
    const productExits = await model_product.findById(data.productId);
    if (!productExits) {
      return res.status(409).json({
        code_error: errors_http.producto_not_available,
        status: 'No se puede añadir al carrito',
      });
    } else if (WishListExits.length > 0) {
      const verifyProductInWishList = await model_wishList.findOne({
        productId: data.productId,
        userId: data.userId,
      });
      if (!verifyProductInWishList) {
        const resultado = await model_wishList.findOneAndUpdate(
          { userId: req.body.userId },
          {
            $push: {
              productId: data.productId,
            },
          }
        );
        return res.status(200).json({
          resultado,
          status: 'Wish List Actualizada',
        });
      } else {
        return res.status(409).json({
          code_error: errors_http.product_exist,
          status:
            'No se ha podido añadir el producto, ya tienes uno igual añadido',
        });
      }
    } else {
      const product = new model_wishList(data);
      const resultado = await product.save();
      return res.status(200).json({
        resultado: resultado,
        status: 'Producto añadido a la wishList',
      });
    }
  } catch (error) {
    next(error);
  }
};
wishListController.getWishList = async (req, res, next) => {
  try {
    const wishLists = await model_wishList.find({ userId: req.params.id });
    const productsOfWishList = wishLists.map(({ productId }) => productId);
    const products = await model_product
      .find()
      .where('_id')
      .in(productsOfWishList[0])
      .exec();
    return res.json({ wishLists, products });
  } catch (error) {
    next(error);
  }
};
wishListController.deleteFromWishList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = req.body._id;
    const wishList = await model_wishList.find({ userId: id });
    const productsOfWishList = wishList.map(({ productId }) => productId);
    for (const key of productsOfWishList) {
      for (let i = 0; i < key.length; i++) {
        const products = await model_wishList.find({
          userId: id,
          productId: productsOfWishList[0][i],
        });
        const arrayOfProductsInList = products[0].productId;
        if (!arrayOfProductsInList.includes(productId)) {
          return res.status(409).json({
            status: 'El producto no existe en tu lista',
          });
        }
      }
    }

    if (wishList[0].productId.length < 1) {
      return res.status(409).json({
        status: 'Tu Lista de deseos esta vacia',
      });
    }
    if (!productId) {
      return res.status(409).json({
        status:
          'No se pudo eliminar el producto de tu lista de deseos, falta el ID',
      });
    }
    if (!wishList) {
      return res.status(409).json({
        status: 'No se pudo encontrar tu lista de deseos',
      });
    } else {
      const productoPorEliminar = await model_wishList.updateMany(
        {
          userId: id,
          productId: productId,
        },
        {
          $pull: { productId: productId },
        }
      );
      return res.status(200).json({
        status: 'Producto eliminado de tu lista de deseos',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = wishListController;
