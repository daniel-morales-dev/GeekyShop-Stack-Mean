const mongoose = require('mongoose');
const { Schema } = mongoose;
const { serverConfig } = require('../config');

const rolSchema = new Schema(
  {
    nombreRol: {
      type: String,
      required: true,
      enum: ['usuario', 'admin', 'empleado'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Rol', rolSchema);
