const modelProduct = require('../models/modelProducts');
const productController = {};
const path = require('path'); //Manejamos directorios
const fs = require('fs'); //Manejador de archivos de node
productController.createProduct = async (req, res, next) => {
  try {
    const Product = new modelProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: req.file.path,
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
productController.getAllProducts = async (req, res, next) => {
  try {
    const productos = await modelProduct.find();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

productController.getProduct = async (req, res, next) => {
  try {
    const producto = await modelProduct.findById(req.params.id);
    return res.json(producto);
  } catch (error) {
    next(error);
  }
};
productController.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: req.file.path,
    };
    console.log(req.file);
    //BUSCAMOS PRIMERO EL PRODUCTO PARA ELIMINAR LA FOTO ANTERIOR Y LUEGO AGREGAR LA NUEVA
    const productDeletePhoto = await modelProduct.findById(req.params.id);
    if (productDeletePhoto) {
      //Si existe el producto a eliminar
      fs.unlink(path.resolve(productDeletePhoto.imagePath), (err) => {
        //Eliminamos la foto en la ruta que tenia guardado el producto
        if (err) throw err;
        console.log('Successfully delete');
      });
    }
    const resultado = await modelProduct.findOneAndUpdate(
      id,
      { $set: product },
      { new: true }
    );
    return res.json({
      resultado: resultado,
      status: 'producto actualizado',
    });
  } catch (error) {
    next(error);
  }
};

productController.deleteProduct = async (req, res, next) => {
  try {
    const product = await modelProduct.findByIdAndDelete(req.params.id);
    if (product) {
      //Si existe el producto a eliminar
      if (path.resolve(product.imagePath)) {
        fs.unlink(path.resolve(product.imagePath), (err) => {
          //Eliminamos la foto en la ruta que tenia guardado el producto
          if (err) {
            throw err;
          }
          res.json({
            status: 'File succesfully deleted',
          });
        });
      }
      /* fs.unlink(path.resolve(product.imagePath), (err) => {
        //Eliminamos la foto en la ruta que tenia guardado el producto
        if (err) {
          throw err;
        }
        res.json({
          status: 'File succesfully deleted',
        });
      }); */
    }
    return res.json({
      status: 'Producto eliminado',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
