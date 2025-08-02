// src/estilos/BotonAccion.jsximport React from "react";
import PropTypes from "prop-types";

const BotonAccion = ({ texto, Icono, onClick, color = "blue" }) => {
  const colores = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col items-center gap-1 ${colores[color]} text-white px-3 py-2 rounded transition text-sm`}
    >
      <Icono className="w-5 h-5" />
      <span>{texto}</span>
    </button>
  );
};

BotonAccion.propTypes = {
  texto: PropTypes.string.isRequired,
  Icono: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(["blue", "red", "green", "gray"]),
};

export default BotonAccion;
