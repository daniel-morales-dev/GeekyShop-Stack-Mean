//LIBRERIA PARA PODER USAR VARIABLES DE ENTORNO EN NUESTRO PROYECTO Y FACILITAR SU DESPLIEGUE EN PRODUCCION
require('dotenv').config();
const express = require('express'); //LIBRERIA PARA EL SERVIDOR
const app = express(); //Express, libreria de JS que permite la creacion de servidores
const cors = require('cors'); //Libreria con la que uno el backend con el fronted
const morgan = require('morgan'); //Me permite ver las peticiones al servidor
const moongose = require('./database'); //PIDO MONGOOSE, LIBRERIA PARA MANEJAR LA BD, MONGODB
const { serverConfig } = require('./config'); //REQUIERO LA CONFIGURACION DEL SERVER

//Settings
const port = serverConfig.port;
//Asigno el puerto que me proporciona por defecto la maquina o en su caso el 3000

//Middlewares
app.use(morgan('dev')); //USO LA LIBRERIA MORGAN CUANDO EJECUTO NPM RUN DEV, ESTO ME SIRVE PARA VER EL ESTADO DE LAS PETICIONES
app.use(express.json()); //Ser capaz de convertir los datos que recibe el servidor a JSON
app.use(express.urlencoded({ extended: false })); //https://expressjs.com/es/api.html#express.urlencoded
app.use(cors({ origin: 'http://localhost:4200' })); //Uno el backend con el fronted
app.use('/public', express.static(`${__dirname}/public/uploads/img`)); //ESTA ES LA RUTA PARA LAS IMAGENES, ES UNA RUTA ESTATICA, POR LO CUAL LE DIGO QUE PUBLIC, SERIA LA RUTA DEL SERVIDOR/PUBLIC/UPLOADS/IMG
//Routes
app.use(require('./routes/index')); //Importo las rutas que manejara el servidor

//Starting server
app.listen(port, () => {
  console.log('Server on port ', port);
}); //Empiezo el servidor
