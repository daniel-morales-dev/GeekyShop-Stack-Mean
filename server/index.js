require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const { moongose } = require("./database");

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); //Ser capaz de convertir los datos que recibe el servidor a JSON
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:4200" }));

//Variables Globales

//Routes
app.use(require("./routes/index"));

//Starting server
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
