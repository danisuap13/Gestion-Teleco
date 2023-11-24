import { pool } from "../db.js";

export const createMantenimiento = async (req, res, next) => {
  try {
    const { id_mantenimiento, descripcion, costo, tipo, fecha_inicio, fecha_finalizacion, cedula, id_equipotel} = req.body;

    const newMantenimiento = await pool.query(
      "INSERT INTO mantenimiento (id_mantenimiento, descripcion, costo, tipo, fecha_inicio, fecha_finalizacion, cedula, id_equipotel) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [id_mantenimiento, descripcion, costo, tipo, fecha_inicio, fecha_finalizacion, cedula, id_equipotel]
    );

    res.json(newMantenimiento.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getAllMantenimientos = async (req, res, next) => {
  try {
    const allMantenimientos = await pool.query("SELECT * FROM mantenimiento order by id_mantenimiento asc");
    res.json(allMantenimientos.rows);
  } catch (error) {
    next(error);
  }
};

export const getMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;
	
    const result = await pool.query("SELECT * FROM mantenimiento WHERE id_mantenimiento = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "mantenimiento not found" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateMantenimiento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_mantenimiento, descripcion, costo, tipo, fecha_inicio, fecha_finalizacion, cedula, id_equipotel} = req.body;

    const result = await pool.query(
      "UPDATE mantenimiento SET id_mantenimiento = $2, descripcion = $3, costo = $4, tipo = $5, fecha_inicio = $6, fecha_finalizacion = $7, cedula = $8, id_equipotel = $9 WHERE id_mantenimiento = $1 RETURNING *",
      [id, id_mantenimiento, descripcion, costo, tipo, fecha_inicio, fecha_finalizacion, cedula, id_equipotel]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "mantenimiento not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteMantenimiento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM mantenimiento WHERE id_mantenimiento = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "mantenimiento not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
