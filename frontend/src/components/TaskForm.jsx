import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const loadTask = async (id) => {
    const res = await fetch("http://localhost:4000/tasks/" + id);
    const data = await res.json();
    setTask({ title: data.title, descripcion: data.descripcion });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (params.id) {
        const response = await fetch(
          "http://localhost:4000/tasks/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:4000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        await response.json();
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-2/5">
        <h3 className="font-bold text-2xl my-3 text-white">
          {params.id ? "Update Task" : "Create Task"}
        </h3>
        <input
          type="number"
          name="title"
          placeholder="Id Equipo de Telecomunicaciones"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.id_equipotel}
          autoFocus
        />
        <textarea
          name="descripcion"
          rows={4}
          placeholder="Escriba su descripcion"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.descripcion}
        ></textarea>

			<input
          type="text"
          name="severidad"
          placeholder="Severidad"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.severidad}
          autoFocus
        />
			<input
          type="number"
          name="costo"
          placeholder="Costo"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.costo}
          autoFocus
        />
			<input
          type="text"
          name="estado"
          placeholder="Estado del equipo"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.estado}
          autoFocus
        />
			<input
          type="date"
          name="fecha_deteccion"
          placeholder="Fecha de detección"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.fecha_deteccion}
          autoFocus
        />
			<input
          type="date"
          name="fecha_finalizacion"
          placeholder="Fecha de finalización"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.fecha_finalizacion}
          autoFocus
        />

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!task.title || !task.descripcion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading
              ? // <CircularProgress color="inherit" size={25} />
                loading
              : "Save"}
          </button>

          {params.id && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
