import { pool } from "../db.js";

export const getAllEquipos = async (req, res, next) => {
  try {
    const allMantenimientos = await pool.query("select id_equipotel from equipo_teleco order by id_equipotel asc");
    res.json(allMantenimientos.rows);
  } catch (error) {
    next(error);
  }
};

export const getAllCedulas = async (req, res, next) => {
  try {
    const allMantenimientos = await pool.query("select cedula from tecnico order by cedula asc");
    res.json(allMantenimientos.rows);
  } catch (error) {
    next(error);
  }
};

