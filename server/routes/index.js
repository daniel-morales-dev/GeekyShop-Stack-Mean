//ARCHIVO DE RUTAS DEL SERVIDOR
const express = require('express'); //IMPORTO EXPRESS, LA FORMA MAS FACIL DE CREAR UN SERVIDOR EN NODEJS
const router = express.Router(); //IMPORTO EL MANEJADOR DE SOLICITUDES
//REQUIERO TODOS LOS CONTROLADORES DE MI PROYECTO
const employee_controller = require('../controllers/employee_controller');
const user_controller = require('../controllers/user_controller');
const product_controller = require('../controllers/product_controller');
const cart_controller = require('../controllers/cart_controller');
const wishList_controller = require('../controllers/wishList_controller');
const paypal_controller = require('../controllers/paypal_controller');
const rol_controller = require('../controllers/rol_controller');
//IMPORTO EL MIDDLEWARE AUTH, QUE SE ENCARGA DE AUTENTIFICAR LAS PETICIONES POR ROLES
const auth = require('../middlewares/auth');
//MULTER, MODULO QUE ME PERMITE GUARDAR IMAGENES EN EL SERVIDOR
const multer = require('../middlewares/storage');

router.get('/', (req, res) => res.send('Hello World'));

//RUTAS IMAGENES productos
router.post(
  '/products',
  multer.single('image'),
  auth.verifyToken,
  auth.canManageProducts,
  product_controller.createProduct
);

router.get('/products', product_controller.getAllProducts);
router.get('/products/:id', product_controller.getProduct);
router.put(
  '/products/:id',
  multer.single('image'),
  auth.verifyToken,
  auth.canManageProducts,
  product_controller.updateProduct
);
router.delete(
  '/products/:id',
  auth.verifyToken,
  auth.canManageProducts,
  product_controller.deleteProduct
);

//RUTAS EMPLEADOS//
router.get(
  '/employees',
  auth.verifyToken,
  auth.canManageEmployees,
  employee_controller.getEmployees
);
router.post(
  '/employees',
  auth.verifyToken,
  auth.canManageEmployees,
  employee_controller.createEmployee
);
router.get(
  '/employees/:id',
  auth.verifyToken,
  auth.canManageEmployees,
  employee_controller.getEmployee
);
router.put(
  '/employees/:id',
  auth.verifyToken,
  auth.canManageEmployees,
  employee_controller.editEmployee
);
router.delete(
  '/employees/:id',
  auth.verifyToken,
  auth.canManageEmployees,
  employee_controller.deleteEmployee
);

//RUTAS USUARIOS//
router.get(
  '/user',
  auth.verifyToken,
  auth.canManageProducts,
  user_controller.getUsers
);
router.get(
  '/user/:id',
  auth.verifyToken,
  auth.canUpdateProfileUser,
  user_controller.getUser
);
router.put(
  '/user/:id',
  auth.verifyToken,
  auth.verifiyUserUpdateProfile,
  auth.canUpdateProfileUser,
  user_controller.updateUser
);
router.post(
  //ELIMINAMOS CON METODO POST PARA PODER PASAR UN CUERPO EN LA PETICION, ESTE CUERPO NOS PERMITE VERIFICAR QUE EL USUARIO QUE ESTAMOS BORRANDO NO SEA EL MISMO QUE ESTE HACIENDO LA PETICION
  '/user/:id',
  auth.verifyToken,
  auth.canManageEmployees,
  auth.verifyDeleteUser,
  user_controller.deleteUser
);

//SESIONES Y USUARIO
router.post('/signup', auth.verifyUserRegister, user_controller.createUser);
router.post('/signin', user_controller.logInUser);

//CARRITO DE COMPRAS
router.get(
  '/cart/:id',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  cart_controller.getAllCarts
);
router.post(
  '/cart',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  cart_controller.addToCart
);
router.put(
  '/cart/:id',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  cart_controller.deleteProductOfCart
);
router.delete(
  '/cart/:id',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  cart_controller.cleanCart
);

//LISTA DE DESEOS
router.post(
  '/wishlist',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  wishList_controller.addToWishList
);
router.get(
  '/wishlist/:id',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  wishList_controller.getWishList
);
router.put(
  '/wishlist/:id',
  auth.verifyToken,
  auth.canViewCartAndWishList,
  wishList_controller.deleteFromWishList
);

//ROLES
router.get(
  '/rol',
  auth.verifyToken,
  auth.canManageProducts,
  rol_controller.getRoles
);
router.post(
  '/rol',
  auth.verifyToken,
  auth.canManageEmployees,
  rol_controller.createRol
);

router.get('/paypal-token', paypal_controller.getTokenPaypal);
router.post('/paypal-token', paypal_controller.generatePayOut);

router.get('/private-games', auth.verifyToken, (req, res) => {
  //RUTA QUEMADA PARA PROBAR LOS JUEGOS PRIVADOS
  res.json([
    {
      _id: 1,
      name: 'The last of us 2',
      description:
        'Juego de accion y continuacion del aclamado juego The Last Of Us',
      category: 'accion, aventura, suspenso',
    },
    {
      _id: 2,
      name: 'Minecraft Dungeons',
      description:
        'Juego de accion accion/aventura rpg basado en el best seller Minecraft',
      category: 'RPG, Accion',
    },
  ]);
});

//PAYPAL

module.exports = router;
