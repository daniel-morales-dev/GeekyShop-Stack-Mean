//ARCHIVO DE RUTAS DEL SERVIDOR
const express = require('express'); //IMPORTO EXPRESS
const router = express.Router(); //IMPORTO EL MANEJADOR DE SOLICITUDES
//REQUIERO TODOS LOS CONTROLADORES DE MI PROYECTO
const employee_controller = require('../controllers/employee_controller');
const user_controller = require('../controllers/user_controller');
const product_controller = require('../controllers/product_controller');
const cart_controller = require('../controllers/cart_controller');
const wishList_controller = require('../controllers/wishList_controller');
//IMPORTO EL MIDDLEWARE AUTH, QUE SE ENCARGA DE AUTENTIFICAR LAS PETICIONES POR ROLES
const auth = require('../middlewares/auth');
//MULTER, MODULO QUE ME PERMITE GUARDAR IMAGENES EN EL SERVIDOR
const multer = require('../middlewares/storage');
//VALIDATOR
const {
  userValidationRules,
  validate,
  validarProduct,
} = require('../middlewares/validator');

router.get('/', (req, res) => res.send('Hello World'));

//RUTAS IMAGENES productos
router.post(
  '/products',
  validarProduct,
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
  auth.canManageEmployees,
  user_controller.getUsers
);
router.get(
  '/user/:id',
  auth.verifyToken,
  auth.canManageEmployees,
  user_controller.getUser
);

//SESIONES Y USUARIO
router.post('/signup', user_controller.createUser);
router.post('/signin', user_controller.logInUser);
router.get('/profile', auth.verifyToken);

//RUTAS JUEGOS//
router.get('/juegos', (req, res) => {
  res.json([
    {
      _id: 1,
      name: 'The last of us',
      description: 'Juego de accion',
      category: 'accion, aventura, suspenso',
    },
    {
      _id: 2,
      name: 'Call of duty',
      description: 'Juego de accion',
      category: 'accion, shooter, fps',
    },
    {
      _id: 3,
      name: 'Forza Horizon 4',
      description: 'Juego de carreras',
      category: 'autos, deportes',
    },
  ]);
});

//CARRITO DE COMPRAS
router.get('/cart', cart_controller.getAllCarts);
router.get('/cart/:id', cart_controller.getCart);
router.post('/cart', cart_controller.addToCart);

//LISTA DE DESEOS
router.post('/wishlist', wishList_controller.addToWishList);
router.get('/wishlist', wishList_controller.getWishList);
router.delete('/wishlist/:id', wishList_controller.deleteFromWishList);

router.get('/private-games', auth.verifyToken, (req, res) => {
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

module.exports = router;
