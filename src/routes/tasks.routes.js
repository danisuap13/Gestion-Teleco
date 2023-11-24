import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasks.controller.js";
import {
	createMantenimiento,
  deleteMantenimiento,
  getAllMantenimientos,
  getMantenimiento,
  updateMantenimiento,
} from "../controllers/Mantenimientos.controller.js"

import {
	getAllEquipos,
	getAllCedulas
} from "../controllers/equipos_cedulas.controller.js"

const router = Router();

// create a task
router.post("/falla", createTask);

router.get("/falla", getAllTasks);

router.get("/falla/:id", getTask);

router.put("/falla/:id", updateTask);

router.delete("/falla/:id", deleteTask);


//mantenimiento 
router.post("/mantenimiento", createMantenimiento);

router.get("/mantenimiento", getAllMantenimientos);

router.get("/mantenimiento/:id", getMantenimiento);

router.put("/mantenimiento/:id", updateMantenimiento);

router.delete("/mantenimiento/:id", deleteMantenimiento);

// cedulas e ID de equipos

router.get("/cedulas", getAllCedulas)
router.get("/equipos", getAllEquipos)

export default router;
