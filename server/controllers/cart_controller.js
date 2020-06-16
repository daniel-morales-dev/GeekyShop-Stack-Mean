const model_cart = require('../models/model_cart');
const model_product = require('../models/modelProducts');
const model_user = require('../models/model_user');
const cartController = {};
const errors_http = {
  //OBJETO CON CODIGOS DE ERROR QUE RECIBO EN FRONT Y MUESTRO EL MENSAJE ASIGNADO A ESTE ERROR
  product_exist: 'product_exist',
  producto_not_available: 'product_not_available',
};

cartController.getAllCarts = async (req, res, next) => {
  try {
    const userId = await model_user.findById(req.params.id); //BUSCO EL USUARIO QUE QUIERE BUSCAR EL CARRITO CON LOS PARAMETROS QUE RECIBO EN LA PETICION
    const carts = await model_cart.find({ userId: userId._id }); // CUANDO ENCUENTRO EL USUARIO, BUSCO LOS CARRITOS QUE TENGAN ASIGNADO ESTE ID DE USUARIO, SIEMPRE VA SER 1, POR LO GENERAL
    const productsOfCart = carts.map(({ productId }) => productId); //USO LA FUNCION MAP, QUE ME SACA UN ARRAY DE UN ARRAY, EN ESTE CASO, SACO EL ARRAY PRODUCTID DEL ARRAY DE CARTS
    const producto = await model_product
      .find() //BUSCO LOS PRODUCTOS
      .where('_id') // QUE EN EL CAMPO ID
      .in(productsOfCart[0]) // TENGAN UN DE LOS ID QUE HAY EN EL ARRAY DE PRODUCTS OF CART, LE PUSE 0 PORQUE ES UN ARRAY DE MAS POSICION
      .exec(); //SI LLEGAS A CAMBIAR ESTA MIERDA TE MATO ****, LA VERDAD NO SE QUE SIGNIFICA EXEC JSJSJS
    res.json({ carts, producto }); // DEVUELVO EL CARRO Y EL PRODUCTO, POR QUE? PORQUE EN EL CARRO DIRIA QUE VA LA LOGICA, LOS ID CON LOS QUE HAGO ALGUNOS PROCESOS EN EL FRONT Y EN EL PRODUCTO, VA LO QUE QUIERO PINTAR
  } catch (err) {
    next(err); // SI HAY UN ERROR EN LA FUNCION ASINCRONA NO DETENGO EL SV SI NO QUE LE DIGO QUE SIGA, ASI PARA LOS DEMAS TRY CATCH, POR LO GENERAL, CUANDO SE USABA LAS PROMESAS, ESTAS TERMINABAN EN THEN(), PERO AHORA SE USA ASYNC AWAIT Y ESTABAS DEBEN IR EN UN BLOQUE TRY CATCH O SI NO, CADA VEZ QUE TENGAS UN ERROR TE MANDARA UNA EXCEPCION
  }
};
cartController.addToCart = async (req, res, next) => {
  try {
    const data = {
      productId: req.body.productId,
      userId: req.body.userId,
    }; //OBTENGO LOS DATOS QUE VIENEN EN EL BODY, O SEA, LO QUE PLANEO ALMACENAR
    const cartExits = await model_cart.find({ userId: data.userId }); //BUSCO SI EL CARRO EXISTE, PORQUE SOLO SE HARA UN CARRO POR PERSONA
    const productExits = await model_product.findById(data.productId); // BUSCO PRIMER SI EL PRODUCTO EXISTE
    if (!productExits) {
      //SI PRODUCTEXITS ES FALSE, O SEA QUE NO ENCONTRO NADA, RETORNO UN CODIGO DE CONFLICTO, DICIENDO QUE EL PRODUCTO NO EXISTE
      return res.status(409).json({
        code_error: errors_http.producto_not_available,
        status: 'No se puede añadir al carrito',
      });
    } else if (cartExits.length > 0) {
      // COMO CARTEXITS RETORNA UN ARRAY, YA QUE CONTIENE UN CAMPO QUE ES UN ARRAY, LE DIGO QUE SI SU TAMAÑO ES MAYOR 0, ES PORQUE ENCONTRO UN CARRITO
      const verifyProductInCart = await model_cart.findOne({
        productId: data.productId,
        userId: data.userId,
      }); //ACA VERIFICO SI EL PRODUCTO QUE QUIERO AÑADIR YA EXISTE EN EL CARRO
      if (!verifyProductInCart) {
        //SI NO EXISTE, HAGO UN PUSH AL ARRAY DE LOS PRODUCTOS, QUE LO QUE HACE ES AÑADIR UN NUEVO ID.
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
          //POR SI YA EXISTE, SE LE DICE QUE YA TIENE UN PRODUCTO IGUAL
          code_error: errors_http.product_exist,
          status:
            'No se ha podido añadir el producto, ya tienes uno igual añadido',
        });
      }
    } else {
      //ACA LLEGA SI EL CARRITO NO EXISTE, PUES LO CREA, CON EL PRODUCTO QUE QUIERO AÑADIR
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
cartController.deleteProductOfCart = async (req, res) => {
  try {
    const idProduct = req.body.productId;
    const userId = await model_user.findById(req.params.id);
    const carritosModificadosPorEliminacion = await model_cart.updateOne(
      {
        userId: userId._id,
      },
      { $pull: { productId: idProduct } }
    );
    if (!req.body.userId || !req.body.productId) {
      return res.status(409).json({
        status: 'Error',
        message: 'Faltan campos',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Producto eliminado de tu carrito',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = cartController;
