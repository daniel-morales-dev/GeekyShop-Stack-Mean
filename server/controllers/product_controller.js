const modelProduct = require('../models/modelProducts');
const modelWishList = require('../models/model_wishlist');
const modelCart = require('../models/model_cart');
const productController = {};
const path = require('path'); //Manejamos directorios
const fs = require('fs').promises; //Manejador de archivos de node, LE AGREGO PROMISES PORQUE MANEJAREMOS FUNCIONES ASINCRONAS

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
    }; //DATA SON LOS DATOS DEL PRODUCTO QUE SE ALMACENARAN
    if (!req.body.name || !req.body.description || !req.body.price) {
      //SI EL NOMBRE,DESCRIPCION Y PRECIO ESTAN VACIOS, NO SE GUARDA UN PRODUCTO, PERO TENGO UN BUG, QUE SI LE PONGO UN IMAGEN, GUARDA LA IMAGEN IGUAL, NO SE COMO RESOLVER ESTE ERROR
      return res.status(409).json({
        status: 'No se puede añadir el producto, aqui',
      });
    }
    if (req.file !== undefined) {
      //si el req.FILE ES UNDEFINED, O SEA, LA PETICION PARA GUARDAR LA IMAGEN, ESTA VACIA, ES PORQUE A LO MEJOR YA EXISTE EL PRODUCTO CON SU IMAGEN Y NO SE QUIERE ACTUALIZAR, POR LO TANTO SE LE ASIGNA LA MISMA RUTA Y EL MISMO NOMBRE
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
      //SE AGREGAN ESTOS DATOS AL OBJETO
    }
    if (!req.body.price.toString().match(/[0-9]/)) {
      //SI EL PRECIO NO CUADRA CON EL PATRON, QUE SON NUMEROS POSITIVOS ENTRE 0 Y 9 NO SE GUARDARA EL PRODUCTO
      return res.status(409).json({
        status: 'No se ha podido añadir el producto, el precio es erroneo',
      });
    }
    const product = new modelProduct(data); //CREO EL PRODUCTO CON LOS DATOS
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
    if (carritoPorModificar.length > 0) {
      const cantidadProductosEnCarrito =
        carritoPorModificar[0].productId.length;
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
    }
    const wishListPorModificar = await modelWishList.find({
      productId: { $all: id },
    });
    if (wishListPorModificar.length > 0) {
      const cantidadProductosEnWishList =
        wishListPorModificar[0].productId.length;
      if (cantidadProductosEnWishList === 1) {
        const wishListPorEliminar = await modelWishList.findOneAndDelete({
          productId: id,
        });
      } else {
        const listasModificadasPorEliminacion = await modelWishList.updateMany(
          { productId: id },
          {
            $pull: { productId: id },
          }
        );
      }
    }
    return res.json({ status: 'Product Deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = productController;
