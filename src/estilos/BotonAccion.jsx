import React from "react";
import PropTypes from "prop-types";

const BotonAccion = ({ Icono, onClick, color = "blue" }) => {
  const colores = {
    blue: "text-blue-600 hover:text-blue-800",
    red: "text-red-600 hover:text-red-800",
    green: "text-green-600 hover:text-green-800",
    gray: "text-gray-600 hover:text-gray-800",
  };

  return (
    <button
      onClick={onClick}
      className={`p-1 ${colores[color]} transition hover:scale-110`}
    >
      <Icono className="w-5 h-5" />
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
