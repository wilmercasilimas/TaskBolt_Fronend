// src/componente/CerrarSesion.jsx
import { useNavigate } from "react-router-dom";
import Boton from "../estilos/Botones";

const CerrarSesion = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear(); // o removeItem('token') si usas JWT
    navigate("/");
  };

  return <Boton texto="Cerrar sesión" onClick={cerrarSesion} soloIcono={false} />;
};

export default CerrarSesion;
