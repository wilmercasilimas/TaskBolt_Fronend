import { useState } from "react";
import { Search, X } from "lucide-react";
import PropTypes from "prop-types";

const FiltroNumeroLista = ({ onFiltrar }) => {
  const [mostrarInput, setMostrarInput] = useState(false);
  const [numero, setNumero] = useState("");

  const manejarBusqueda = () => {
    const valor = numero.trim();
    if (valor && /^[0-9]{1,3}$/.test(valor)) {
      onFiltrar(Number(valor));
    }
  };

  const manejarEnter = (e) => {
    if (e.key === "Enter") {
      manejarBusqueda();
    }
  };

  const limpiarFiltro = () => {
    setNumero("");
    onFiltrar(null);
    setMostrarInput(false); // También oculta el input al limpiar
  };

  const manejarClickLupa = () => {
    if (!mostrarInput) {
      setMostrarInput(true);
    } else {
      const valor = numero.trim();
      if (valor && /^[0-9]{1,3}$/.test(valor)) {
        manejarBusqueda();
      } else {
        // Oculta si está visible y vacío o inválido
        setMostrarInput(false);
        setNumero("");
        onFiltrar(null);
      }
    }
  };

 return (
  <div className="relative mt-2 ml-2">
    <button
      onClick={manejarClickLupa}
      className="w-10 h-10 flex items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700"
      title="Buscar lista por número"
    >
      <Search size={14} />
    </button>

    {mostrarInput && (
      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-10 flex items-center bg-white border border-gray-300 rounded px-2 py-1 shadow-sm">
        <input
          type="text"
          maxLength={3}
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          onKeyDown={manejarEnter}
          placeholder="N°"
          className="w-16 text-center outline-none text-sm"
        />
        {numero && (
          <button
            onClick={limpiarFiltro}
            className="ml-1 text-red-500 hover:text-red-700"
            title="Limpiar"
          >
            <X size={16} />
          </button>
        )}
      </div>
    )}
  </div>
);

};

FiltroNumeroLista.propTypes = {
  onFiltrar: PropTypes.func.isRequired,
};

export default FiltroNumeroLista;
