import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

// create a task
router.post("/falla", createTask);

router.get("/falla", getAllTasks);

router.get("/falla/:id", getTask);

router.put("/falla/:id", updateTask);

router.delete("/falla/:id", deleteTask);

export default router;
