// src/estilos/Botones.jsx
import PropTypes from "prop-types";
import { LogOut } from "lucide-react"; // Puedes usar cualquier ícono de react-icons o lucide

const Boton = ({ texto, onClick, soloIcono }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      <LogOut className="w-5 h-5" />
      {/* Solo muestra texto en pantallas md o superiores */}
      {!soloIcono && <span className="hidden md:inline">{texto}</span>}
    </button>
  );
};

Boton.propTypes = {
  texto: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  soloIcono: PropTypes.bool, // true = solo ícono
};

export default Boton;
