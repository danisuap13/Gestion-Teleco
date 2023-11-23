import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const response = await fetch("http://localhost:4000/falla");
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id_falla} task={task} />
      ))}
    </>
  );
};

export default TasksList;
