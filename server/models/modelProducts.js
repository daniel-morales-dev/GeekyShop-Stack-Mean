const moongose = require('mongoose');
const { Schema } = moongose;
const { serverConfig } = require('../config');

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    imagePath: String,
  },
  {
    timestamps: true, //CREA UN CAMPO DE CUANDO SE CREO Y CUANDO SE ACTUALIZO
  }
);

module.exports = moongose.model('Product', productSchema);
