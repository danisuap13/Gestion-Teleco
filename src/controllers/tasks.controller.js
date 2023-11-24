import { pool } from "../db.js";

export const createTask = async (req, res, next) => {
  try {
    const { id_falla, id_equipotel, descripcion, severidad, costo, estado, fecha_deteccion, fecha_finalizacion, cedula} = req.body;

    const newTask = await pool.query(
      "INSERT INTO falla (id_falla, id_equipotel, descripcion, severidad, costo, estado, fecha_deteccion, fecha_finalizacion, cedula) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
      [id_falla, id_equipotel, descripcion, severidad, costo, estado, fecha_deteccion, fecha_finalizacion, cedula]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM falla order by id_falla asc");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
	
    const result = await pool.query("SELECT * FROM falla WHERE id_falla = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "falla not found" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_falla, id_equipotel, descripcion, severidad, costo, estado, fecha_deteccion, fecha_finalizacion, cedula} = req.body;

    const result = await pool.query(
      "UPDATE falla SET id_falla = $2, id_equipotel = $3, descripcion = $4, severidad = $5, costo = $6, estado = $7, fecha_deteccion = $8, fecha_finalizacion = $9, cedula = $10 WHERE id_falla = $1 RETURNING *",
      [id, id_falla, id_equipotel, descripcion, severidad, costo, estado, fecha_deteccion, fecha_finalizacion, cedula]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "falla not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM falla WHERE id_falla = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "falla not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
