require('dotenv').config();
const express = require('express');
const app = express(); //Express, libreria de JS que permite la creacion de servidores
const cors = require('cors'); //Uno el backend con el fronted
const morgan = require('morgan'); //Me permite ver las peticiones al servidor
const moongose = require('./database');
const { serverConfig, db } = require('./config');
//const multer = require('multer');

//Settings
const port = serverConfig.port;
//Asigno el puerto que me proporciona por defecto la maquina o en su caso el 3000

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); //Ser capaz de convertir los datos que recibe el servidor a JSON
app.use(express.urlencoded({ extended: false })); //https://expressjs.com/es/api.html#express.urlencoded
app.use(cors({ origin: 'http://localhost:4200' })); //Uno el backend con el fronted
//Routes
app.use(require('./routes/index')); //Importo las rutas que manejara el servidor

//Starting server
app.listen(port, () => {
  console.log('Server on port ', port);
}); //Empiezo el servidor
