// src/rutas/rutas.jsx
import { Routes, Route } from "react-router-dom";
import Inicio from "../paginas/inicio";
import ListaPagina from "../paginas/lista/ListaPagina";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/lista" element={<ListaPagina />} />
    </Routes>
  );
};

export default Rutas;
