const moongose = require('mongoose');
const { Schema } = moongose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,
    },
  },
  {
    timestamps: true, //CREA UN CAMPO DE CUANDO SE CREO Y CUANDO SE ACTUALIZO
  }
);

module.exports = moongose.model('Product', productSchema);
