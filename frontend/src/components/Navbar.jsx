import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const location =  useLocation()

  return (
    <nav className="flex items-center justify-between border-b pb-2">
      <Link to="/">
        <div className="flex mt-2">
        <h1 className="text-white font-bold text-4xl my-4">FYMET</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        </div>
        <span className="text-white ">Sistema de Gestión de Fallas y Mantenimiento de Equipos de Telecomunicaciones</span>
      </Link>

      {location.pathname === "/falla/new" || location.pathname.includes('/falla/') || location.pathname === '/mantenimiento/new' || location.pathname.includes('/mantenimiento')? (
        <button
          className="bg-slate-200 text-black font-bold py-2 px-4 rounded-lg my-2"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      ) : (
        <div>
          <button
            className="bg-white text-black font-bold py-2 px-4 mr-4 rounded-lg my-2 "
            onClick={() => navigate("/mantenimiento/new")}
          >
            Programar Mantenimiento
          </button>
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-lg my-2"
            onClick={() => navigate("/falla/new")}
          >
            Añadir Falla
          </button>
        </div>
      )}
    </nav>
  );
}
