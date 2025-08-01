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
    <div className="mt-2 ml-2">
      <div className="flex items-center gap-2">
        {mostrarInput && (
          <div className="relative">
            <input
              type="text"
              maxLength={3}
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              onKeyDown={manejarEnter}
              placeholder="N°"
              className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {numero && (
              <button
                onClick={limpiarFiltro}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 px-1"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        <button
          onClick={manejarClickLupa}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          title="Buscar lista por número"
        >
          <Search size={15} />
        </button>
      </div>
    </div>
  );
};

FiltroNumeroLista.propTypes = {
  onFiltrar: PropTypes.func.isRequired,
};

export default FiltroNumeroLista;
