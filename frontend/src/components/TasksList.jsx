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
  }, []);
  
  useEffect(() => {
    loadMantenimientos();
  }, []);

  return (
    <>
    <div className="flex">
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id_falla} task={task} />
        ))}
      </div>
      <div>
        {mantenimientos.map((mantenimiento) => (
          <TaskCardMantenimiento key={mantenimiento.id_mantenimiento} mantenimiento={mantenimiento} />
        ))}
      </div>
    </div>
    </>
  );
};

export default TasksList;
