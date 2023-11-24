import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskCardMantenimiento from "./TaskCardMantenimiento";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [mantenimientos, setMantenimientos] = useState([])

  const loadTasks = async () => {
    const response = await fetch("http://localhost:4000/falla");
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };
  const loadMantenimientos = async () => {
    const response = await fetch("http://localhost:4000/mantenimiento");
    const data = await response.json();
    console.log(data);
    setMantenimientos(data);
  };

  useEffect(() => {
		loadTasks();
		loadMantenimientos();
 }, []);

  return (
    <>
    <div className="flex">
      <div className="w-1/2 p-4">
				<h1 className="text-white font-bold text-3xl text-center">Fallas</h1>
        {tasks.map((task) => (
					<TaskCard key={task.id_falla} task={task} />
					))}
      </div>
      <div className="w-1/2 p-4">
				<h1 className="text-white font-bold text-3xl text-center">Mantenimientos</h1>
        {mantenimientos.sort().map((mantenimiento) => (
          <TaskCardMantenimiento key={mantenimiento.id_mantenimiento} mantenimiento={mantenimiento} />
        ))}
      </div>
    </div>
    </>
  );
};

export default TasksList;
