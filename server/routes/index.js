const express = require("express");
const router = express.Router();
const employee_controller = require("../controllers/employee_controller");
const user_controller = require("../controllers/user_controller");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => res.send("Hello World"));

//RUTAS EMPLEADOS//
router.get(
  "/employees",
  auth.verifyToken,
  auth.verifyRole,
  employee_controller.getEmployees
);
router.post(
  "/employees",
  auth.verifyToken,
  auth.verifyRole,
  employee_controller.createEmployee
);
router.get(
  "/employees/:id",
  auth.verifyToken,
  auth.verifyRole,
  employee_controller.getEmployee
);
router.put(
  "/employees/:id",
  auth.verifyToken,
  auth.verifyRole,
  employee_controller.editEmployee
);
router.delete(
  "/employees/:id",
  auth.verifyToken,
  auth.verifyRole,
  employee_controller.deleteEmployee
);

//RUTAS USUARIOS//
router.get(
  "/users",
  auth.verifyToken,
  auth.verifyRole,
  user_controller.getUsers
);
router.get(
  "/user/:id",
  auth.verifyToken,
  auth.verifyRole,
  user_controller.getUser
);
router.post("/signup", user_controller.createUser);
router.post("/signin", user_controller.logInUser);
router.get("/profile", auth.verifyToken, user_controller.logInUser);

//RUTAS JUEGOS//
router.get("/juegos", (req, res) => {
  res.json([
    {
      _id: 1,
      name: "The last of us",
      description: "Juego de accion",
      category: "accion, aventura, suspenso",
    },
    {
      _id: 2,
      name: "Call of duty",
      description: "Juego de accion",
      category: "accion, shooter, fps",
    },
    {
      _id: 3,
      name: "Forza Horizon 4",
      description: "Juego de carreras",
      category: "autos, deportes",
    },
  ]);
});

router.get("/private-games", auth.verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: "The last of us 2",
      description:
        "Juego de accion y continuacion del aclamado juego The Last Of Us",
      category: "accion, aventura, suspenso",
    },
    {
      _id: 2,
      name: "Minecraft Dungeons",
      description:
        "Juego de accion accion/aventura rpg basado en el best seller Minecraft",
      category: "RPG, Accion",
    },
  ]);
});

module.exports = router;
