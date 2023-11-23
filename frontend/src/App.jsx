import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";
import Navbar from "./components/Navbar";
import TaskFormMantenimiento from "./components/TaskFormMantenimiento";

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-20">
        <Navbar />
        <Routes>
          <Route index path="/" element={<TasksList />} />
          <Route path="/falla/new" element={<TaskForm />} />
          <Route path="/mantenimiento/new" element={<TaskFormMantenimiento />} />
          <Route path="/falla/:id/edit" element={<TaskForm />} />
          <Route path="/mantenimiento/:id/edit" element={<TaskFormMantenimiento/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
