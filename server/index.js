//LIBRERIA PARA PODER USAR VARIABLES DE ENTORNO EN NUESTRO PROYECTO Y FACILITAR SU DESPLIEGUE EN PRODUCCION
require('dotenv').config();
const express = require('express'); //LIBRERIA PARA EL SERVIDOR
const app = express(); //Express, libreria de JS que permite la creación de servidores
const cors = require('cors'); //Libreria con la que uno el backend con el fronted
const morgan = require('morgan'); //Me permite ver las peticiones al servidor
require('./database'); //PIDO MONGOOSE, LIBRERÍA PARA MANEJAR LA BD, MONGODB
const { serverConfig } = require('./config'); //REQUIERO LA CONFIGURACIÓN DEL SERVER
const path = require('path');
//Settings
const port = serverConfig.port;
//Asigno el puerto que me proporciona por defecto la maquina o en su caso el 3000
//Middlewares
app.use(morgan('dev')); //USO LA LIBRERIA MORGAN CUANDO EJECUTO NPM RUN DEV, ESTO ME SIRVE PARA VER EL ESTADO DE LAS PETICIONES
app.use(express.json()); //Ser capaz de convertir los datos que recibe el servidor a JSON
app.use(express.urlencoded({ extended: false })); //Permite establecer los datos que se suben a travez de un formulario
app.use(cors({ origin: 'http://localhost:4200' })); //Uno el backend con el fronted

/* app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/dist/fronted/index.html`);
}); */
//ESTA ES LA RUTA PARA LAS IMÁGENES, ES UNA RUTA ESTATICA, POR LO CUAL LE DIGO QUE PUBLIC, SERIA LA RUTA DEL SERVIDOR/PUBLIC/UPLOADS/IMG
//Routes
app.use(require('./routes/index')); //Importo las rutas que manejara el servidor
app.use('/public', express.static(__dirname + '/public/uploads/img'));
app.use(express.static(__dirname + '/dist/fronted'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/fronted/index.html'));
});

//Starting server
app.listen(process.env.PORT || port, () => {
  console.log('Server on port ', port);
}); //Empiezo el servidor
