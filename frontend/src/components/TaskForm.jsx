import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    id_falla: "" , 
		id_equipotel:"",
		descripcion:"",
		severidad:"",
		costo:"",
		estado:"",
		fecha_deteccion:"",
		fecha_finalizacion:"",
		cedula:""
  });
  const [loading, setLoading] = useState(false);
  const [cedulas, setCedulas] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const loadEquipos = async () => {
    const response = await fetch("http://localhost:4000/equipos");
    const data = await response.json();
    console.log(data);
    setEquipos(data);
  };

  const loadCedulas = async () => {
    const response = await fetch("http://localhost:4000/cedulas");
    const data = await response.json();
    console.log(data);
    setCedulas(data);
  };

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
			loadCedulas()
			loadEquipos()
    }
  }, [params.id]);

  const loadTask = async (id) => {
    const res = await fetch("http://localhost:4000/falla/" + id);
    const data = await res.json();
    setTask({ 
		id_falla: data.id_falla,
		id_equipotel: data.id_equipotel,
		descripcion: data.descripcion,
		severidad: data.severidad,
		costo: data.costo,
		estado: data.estado,
		fecha_deteccion: data.fecha_deteccion,
		fecha_finalizacion: data.fecha_finalizacion,
		cedula: data.cedula 
	});
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/falla/${id}`, {
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
          "http://localhost:4000/falla/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:4000/falla", {
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
    <div className="flex flex-col items-center justify-center pt-10">
      <form onSubmit={handleSubmit} className="w-2/5">
        <h3 className="font-bold text-2xl my-3 text-white text-center">
            {params.id ? "Actualizar Falla" : "Publicar Falla"}
        </h3>

        <label className="flex justify-evenly"> 
          <span className="w-full m-2 h-auto text-center p-3 text-white border border-solid rounded-md  ">Id Falla</span>
          <input
            type="number"
            name="id_falla"
            placeholder= "Id Falla"
            className="border border-gray-400 p-2 rounded-md block my-2 w-full"
            onChange={handleChange}
            value={task.id_falla}
            autoFocus
          />
        </label>

        <label className="flex justify-evenly pb-2"> 
          <span className="w-full m-2 h-auto text-center p-3 text-white border border-solid rounded-md  ">Id Equipo Teleco</span>
          <select 
						name="id_equipotel" 
						className="border border-gray-400 p-2 rounded-md block my-2 w-full"
						onChange={handleChange}
						>
							<option value={task.id_equipotel} disabled selected> {task.id_equipotel} </option>
						{equipos.map((equipo) => (
							<option key={equipo.id_equipotel} value={equipo.id_equipotel}>{equipo.id_equipotel}</option>
						))}
						</select>          
        </label>

        <label className="flex-col items-center justify-center pt-10"> 
          <p className="w-full text-center text-white text-lg border border-solid rounded-md p-2">Escriba la descripción de la falla</p>
          <textarea
            name="descripcion"
            rows={4}
            placeholder="Escriba su descripcion"
            className="border border-gray-400 p-2 rounded-md block my-2 w-full"
            onChange={handleChange}
            value={task.descripcion}
          ></textarea>
        </label>

        <label className="flex justify-evenly"> 
          <span className="w-1/3 m-2 h-auto text-center p-3 text-white border border-solid rounded-md ">Severidad</span>
          <input
            type="text"
            name="severidad"
            placeholder="Grave, Urgente, Ninguna, ..."
            className="border border-gray-400 p-2 rounded-md block my-2 w-full"
            onChange={handleChange}
            value={task.severidad}
            autoFocus
          />
        </label>

        <label className="flex justify-evenly"> 
          <span className="w-full m-2 h-auto text-center p-3 text-white border border-solid rounded-md ">Ingrese el costo de reparación</span>     
          <input
              type="number"
              name="costo"
              placeholder="Costo"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full"
              onChange={handleChange}
              value={task.costo}
              autoFocus
            />
        </label>  

        <label className="flex justify-evenly"> 
          <span className="w-1/3 m-2 h-auto text-center p-3 text-white border border-solid rounded-md ">Estado del equipo</span>
          <input
              type="text"
              name="estado"
              placeholder="Dañado, reparado, en funcionamiento, ..."
              className="border border-gray-400 p-2 rounded-md block my-2 w-full"
              onChange={handleChange}
              value={task.estado}
              autoFocus
            />
        </label>

        <label className="flex justify-evenly"> 
          <span className="w-full m-2 h-auto text-center p-3 text-white border border-solid rounded-md  ">Fecha Descubrimiento</span>
          <input
              type="text"
              placeholder="AAAA-MM-DD"
              name="fecha_deteccion"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full"
              onChange={handleChange}
              value={task.fecha_deteccion.slice(0,10)}
              autoFocus
            />
        </label> 

        <label className="flex justify-evenly"> 
          <span className="w-full m-2 h-auto text-center p-3 text-white border border-solid rounded-md  ">Fecha Finalizacion</span>
          <input
              type="text"
              placeholder="AAAA-MM-DD"
              name="fecha_finalizacion"
              className="border border-gray-400 p-2 rounded-md block my-2 w-full"
              onChange={handleChange}
              value={task.fecha_finalizacion.slice(0,10)}
              autoFocus
            />
        </label>

        <label className="flex justify-evenly"> 
          <span className="w-full m-2 h-auto text-center p-3 text-white border border-solid rounded-md  ">Cedula Tecnico Encargado</span>
						<select 
						name="cedula" 
						className="border border-gray-400 p-2 rounded-md block my-2 w-full"
						onChange={handleChange}
						>
							<option value={task.cedula} disabled selected> {task.cedula} </option>
						{cedulas.map((cedula) => (
							<option key={cedula.cedula} value={cedula.cedula}>{cedula.cedula}</option>
						))}
						</select>
        </label>

        

        <div className="flex justify-between p-10">
          <button
            type="submit"
						disabled={
							!task.id_falla||
							!task.id_equipotel||
							!task.descripcion||
							!task.severidad||
							!task.costo||
							!task.estado||
							!task.fecha_deteccion||
							!task.fecha_finalizacion||
							!task.cedula}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading
              ? // <CircularProgress color="inherit" size={25} />
                loading
              : "Publicar"}
          </button>

          {params.id && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              onClick={() => handleDelete(params.id)}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
