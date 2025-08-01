// src/paginas/inicio.jsx
import { useNavigate } from "react-router-dom";
import Boton from "../estilos/Botones";

const Inicio = () => {
  const navigate = useNavigate();

  const irAListas = () => {
    navigate("/lista");
  };

  return (
    <div className="relative p-6 text-center min-h-screen bg-white">
      {/* Botón en la esquina superior derecha */}
      <div className="absolute top-4 right-4">
        <Boton texto="Ver Mis Listas" onClick={irAListas} />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-gray-800 mt-12">
        Bienvenido a TaskBolt
      </h1>
      <h2 className="text-sky-600 hover:text-sky-700 transition-colors duration-200 mb-6">
        Gestiona tus listas de compras aquí.
      </h2>

      {/* Imagen responsive visible en móvil, 75% del ancho */}
      <div className="flex justify-center mb-6">
        <img
          src="/Portada.png"
          alt="Lista de mercado"
          className="w-full max-w-xl animate-float"
        />
      </div>
    </div>
  );
};

export default Inicio;
