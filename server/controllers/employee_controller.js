const model_employee = require("../models/model_employee");
const jwt = require("jsonwebtoken");
const employeController = {};

employeController.getEmployees = async (req, res, next) => {
  const employees = await model_employee.find();
  res.json(employees);
};

employeController.getEmployee = async (req, res, next) => {
  const employee = await model_employee.findById(req.params.id);
  res.json(employee);
};

employeController.createEmployee = async (req, res, next) => {
  const Employee = new model_employee({
    name: req.body.name,
    position: req.body.position,
    officine: req.body.officine,
    salary: req.body.salary,
  });
  const resultado = await Employee.save();
  res.json({
    resultado: resultado,
    status: "Employee save",
  });
};

employeController.editEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employee = {
    name: req.body.name,
    position: req.body.position,
    officine: req.body.officine,
    salary: req.body.salary,
  };
  const resultado = await model_employee.findOneAndUpdate(
    id,
    { $set: employee },
    { new: true }
  );
  res.json({
    resultado: resultado,
    status: "Employee update",
  });
};
employeController.deleteEmployee = async (req, res, next) => {
  await model_employee.findByIdAndRemove(req.params.id);
  res.json({
    status: "Employee delete",
  });
};

module.exports = employeController;
