const modelProduct = require('../models/modelProducts');
const productController = {};
const path = require('path'); //Manejamos directorios
const fs = require('fs').promises; //Manejador de archivos de node

productController.getAllProducts = async (req, res, next) => {
  try {
    const productos = await modelProduct.find();
    return res.json(productos);
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

productController.createProduct = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    if (req.file !== undefined) {
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
    }
    const product = new modelProduct(data);
    const resultado = await product.save();
    return res.json({
      resultado: resultado,
      status: 'Product save',
    });
  } catch (error) {
    next(error);
  }
};

productController.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    if (req.file !== undefined) {
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
      //BUSCAMOS PRIMERO EL PRODUCTO PARA ELIMINAR LA FOTO ANTERIOR Y LUEGO AGREGAR LA NUEVA
      const productDeletePhoto = await modelProduct.findById(req.params.id);
      if (productDeletePhoto) {
        //Si existe el producto a eliminar
        if (productDeletePhoto.imageName !== 'no-image.svg') {
          //EVITAMOS BORRAR LA IMAGEN ESTANDAR POR SI NO HAY IMAGENES
          await fs.unlink(path.resolve(productDeletePhoto.imagePath), (err) => {
            //Eliminamos la foto en la ruta que tenia guardado el producto
            if (err) throw err;
            console.log('Successfully delete');
          });
        }
      }
    }
    const resultado = await modelProduct.findOneAndUpdate(
      id,
      { $set: data },
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
    const { id } = req.params;
    const product = await modelProduct.findByIdAndRemove(id);
    if (product) {
      if (product.imageName !== 'no-image.svg') {
        try {
          await fs.unlink(path.resolve(product.imagePath));
          console.log('File removed');
        } catch (err) {
          console.error('No pudimos eliminar la imagen', err);
        }
      }
    }
    return res.json({ status: 'Product Deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
