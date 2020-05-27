const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
//CREACION DEL MODELO DE USUARIOS
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rol: {
      type: String,
      default: "usuario",
      enum: ["usuario", "admin", "empleado"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //CREA UN CAMPO DE CUANDO SE CREO Y CUANDO SE ACTUALIZO
  }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model("User", userSchema);
