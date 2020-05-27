const express = require("express");
const app = express();//Express, libreria de JS que permite la creacion de servidores
const cors = require("cors");//Uno el backend con el fronted
const morgan = require("morgan");//Me permite ver las peticiones al servidor
const { moongose } = require("./database");

//Settings
app.set("port", process.env.PORT || 3000); //Asigno el puerto que me proporciona por defecto la maquina o en su caso el 3000

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); //Ser capaz de convertir los datos que recibe el servidor a JSON
app.use(express.urlencoded({ extended: false })); //https://expressjs.com/es/api.html#express.urlencoded
app.use(cors({ origin: "http://localhost:4200" })); //Uno el backend con el fronted

//Routes
app.use(require("./routes/index")); //Importo las rutas que manejara el servidor

//Starting server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});//Empiezo el servidor
