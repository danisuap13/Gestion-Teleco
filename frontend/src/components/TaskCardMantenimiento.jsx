import { useNavigate } from "react-router-dom";

function TaskCard({ mantenimiento }) {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-slate-300"
      onClick={() => navigate(`/mantenimiento/${mantenimiento.id_mantenimiento}/edit`)}
    >
      <h3 className="font-bold text-xl">ID: {mantenimiento.id_mantenimiento}</h3>
      <p>Descripción: {mantenimiento.descripcion}</p>
      <p>ID equipo: {mantenimiento.id_equipotel}</p>
      <p>Tipo: {mantenimiento.tipo}</p>
      <p>Fecha de Inicio: {mantenimiento.fecha_inicio.slice(0,10)}</p>

			{/* <h3 className="font-bold text-xl">ID: {task.id_falla}</h3>
      <p>Descripcion: {task.descripcion}</p>
      <p>ID equipo: {task.id_equipotel}</p>
      <p>Severidad: {task.severidad}</p>
      <p>Fecha detección: {task.fecha_deteccion.slice(0,10)}</p> */}
    </div>
  );
}

export default TaskCard;
