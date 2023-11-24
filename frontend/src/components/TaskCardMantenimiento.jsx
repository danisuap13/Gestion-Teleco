import { useNavigate } from "react-router-dom";

function TaskCard({ mantenimiento }) {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-slate-300"
      onClick={() => navigate(`/mantenimiento/${mantenimiento.id_mantenimiento}/edit`)}
    >
      <h3 className="font-bold text-xl">{mantenimiento.id_mantenimiento}</h3>
      <p>{mantenimiento.descripcion}</p>
      <p>{mantenimiento.id_equipotel}</p>
      <p>{mantenimiento.tipo}</p>
    </div>
  );
}

export default TaskCard;
