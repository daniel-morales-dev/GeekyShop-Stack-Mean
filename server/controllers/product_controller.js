const modelProduct = require('../models/modelProducts');
const modelCart = require('../models/model_cart');
const productController = {};
const path = require('path'); //Manejamos directorios
const fs = require('fs').promises; //Manejador de archivos de node

productController.getAllProducts = async (req, res, next) => {
  try {
    const productos = await modelProduct.find();
    return res.json(productos);
  } catch (error) {
    console.log(error);
  }
};
productController.getProduct = async (req, res, next) => {
  try {
    const producto = await modelProduct.findById(req.params.id);
    return res.json(producto);
  } catch (error) {
    console.log(error);
  }
};

productController.createProduct = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };

    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price ||
      !req.body.price
    ) {
      return res.status(409).json({
        status: 'No se puede añadir el producto',
      });
    }
    if (req.file !== undefined) {
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
    }
    if (!req.body.price.toString().match(/[0-9]/)) {
      return res.status(409).json({
        status: 'No se ha podido añadir el producto, el precio es erroneo',
      });
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
    if (!req.body.price.toString().match(/[0-9]/)) {
      return res.status(409).json({
        status: 'No se ha podido añadir el producto, el precio es erroneo',
      });
    }

    if (req.file !== undefined) {
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
      //BUSCAMOS PRIMERO EL PRODUCTO PARA ELIMINAR LA FOTO ANTERIOR Y LUEGO AGREGAR LA NUEVA
      const productDeletePhoto = await modelProduct.findById(req.params.id);
      if (productDeletePhoto) {
        //Si existe el producto a eliminar
        if (productDeletePhoto.imageName !== 'no-image.svg') {
          //EVITAMOS BORRAR LA IMAGEN ESTANDAR POR SI NO HAY IMAGENES
          try {
            await fs.unlink(
              path.resolve(productDeletePhoto.imagePath),
              (err) => {
                //Eliminamos la foto en la ruta que tenia guardado el producto
                if (err) {
                  console.log('No se ha podido eliminar el archivo');
                }
                console.log('Archivo eliminado');
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    const resultado = await modelProduct.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.json({
      resultado,
      status: 'producto actualizado',
    });
  } catch (error) {
    next();
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
    const carritoPorModificar = await modelCart.find({
      productId: { $all: id },
    });
    const cantidadProductosEnCarrito = carritoPorModificar[0].productId.length;
    console.log(cantidadProductosEnCarrito);
    if (cantidadProductosEnCarrito === 1) {
      const carritoPorEliminar = await modelCart.findOneAndDelete({
        productId: id,
      });
    } else {
      const carritosModificadosPorEliminacion = await modelCart.updateMany(
        {
          productId: id,
        },
        { $pull: { productId: id } }
      );
    }
    return res.json({ status: 'Product Deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
