const mongoose = require('mongoose');
const { Schema } = mongoose;
const { serverConfig } = require('../config');

const cartSchema = new Schema(
  {
    productId: {
      //VA SER UN ARRAY, QUE CONTIENE SOLO EL ID DE LOS PRODUCTOS
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);
