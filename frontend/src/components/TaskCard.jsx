import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-slate-300"
      onClick={() => navigate(`/tasks/${task.id_falla}/edit`)}
    >
      <h3 className="font-bold text-xl">{task.id_falla}</h3>
      <p>{task.descripcion}</p>
      <p>{task.id_equipotel}</p>
      <p>{task.severidad}</p>
    </div>
  );
}

export default TaskCard;
