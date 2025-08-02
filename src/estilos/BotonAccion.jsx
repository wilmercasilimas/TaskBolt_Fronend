import React from "react";
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
      title={texto}
      aria-label={texto}
      className={`group flex sm:flex-col items-center justify-center sm:justify-start gap-1 sm:gap-1 ${colores[color]} text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-[1.03] active:scale-[0.97] w-full`}
    >
      <Icono className="w-5 h-5" />
      <span className="hidden sm:inline text-xs font-medium group-hover:underline">
        {texto}
      </span>
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
