const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    officine: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employe", EmployeeSchema);
