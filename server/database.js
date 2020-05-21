const mongoose = require("mongoose");

const URI = `mongodb://localhost:27017/mean-crud`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("== DataBase Connect Succesfull =="))
  .catch((err) => console.log(err + "Error en la conexion a la BD"));

module.exports = mongoose;
