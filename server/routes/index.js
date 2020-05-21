const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const employee_controller = require('../controllers/employee_controller');
const user_controller = require('../controllers/user_controller');

router.get('/', (req, res) =>
    res.send("Hello World")
);

//RUTAS EMPLEADOS//
router.get('/employees', verificarToken, employee_controller.getEmployees);
router.post('/employees', verificarToken, employee_controller.createEmployee);
router.get('/employees/:id', verificarToken, employee_controller.getEmployee);
router.put('/employees/:id', verificarToken, employee_controller.editEmployee);
router.delete('/employees/:id', verificarToken, employee_controller.deleteEmployee);

//RUTAS USUARIOS//
router.get('/users', verificarToken, user_controller.getUsers);
router.get('/user/:id', verificarToken, user_controller.getUser);
router.post('/signup', user_controller.createUser);
router.post('/signin', user_controller.logInUser);
router.get('/profile', verificarToken, user_controller.logInUser);

//RUTAS JUEGOS//
router.get('/juegos', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'The last of us',
            description: 'Juego de accion',
            category: 'accion, aventura, suspenso'
        },
        {
            _id: 2,
            name: 'Call of duty',
            description: 'Juego de accion',
            category: 'accion, shooter, fps'
        },
        {
            _id: 3,
            name: 'Forza Horizon 4',
            description: 'Juego de carreras',
            category: 'autos, deportes'
        },
    ])
})

router.get('/private-games', verificarToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'The last of us 2',
            description: 'Juego de accion y continuacion del aclamado juego The Last Of Us',
            category: 'accion, aventura, suspenso'
        },
        {
            _id: 2,
            name: 'Minecraft Dungeons',
            description: 'Juego de accion accion/aventura rpg basado en el best seller Minecraft',
            category: 'RPG, Accion'
        },
    ])
})



async function verificarToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({err:"Peticion no autorizada"})
        }

        const token = req.headers.authorization.split(' ')[1]
        if (token == '' || null) {
            return res.status(401).json({err:"Peticion no autorizada"})
        }
        const payload = await jwt.verify(token, 'secretKey')
        if (!payload) {
			return res.status(401).json({err:"Peticion no autorizada"});
		}
        req.userId = payload._id;
        next();
    }catch(e){
        return res.status(401).send('Peticion no autorizada');
    }
    
}

module.exports = router;