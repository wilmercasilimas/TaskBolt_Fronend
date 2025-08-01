import { useState } from "react";
import { Trash2, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EliminarListaPorNumero = () => {
  const [mostrarInput, setMostrarInput] = useState(false);
  const [numero, setNumero] = useState("");

  const manejarEliminar = async () => {
    const valor = numero.trim();

    if (!/^[0-9]{1,3}$/.test(valor)) {
      toast.error("Ingresa un número de lista válido (1 a 3 dígitos)");
      return;
    }

    const confirmado = window.confirm(
      `¿Estás seguro de eliminar la lista número ${valor}?\nEsta acción es irreversible.`
    );
    if (!confirmado) return;

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/listas/numero/${valor}`
      );
      toast.success(data.message);
      setNumero("");
      setMostrarInput(false);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Error al eliminar la lista.";
      toast.error(`❌ ${msg}`);
    }
  };

  const limpiar = () => {
    setNumero("");
    setMostrarInput(false);
  };

  return (
    <div className="flex items-center gap-2">
      {mostrarInput && (
        <div className="relative">
          <input
            type="text"
            maxLength={3}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="N°"
            className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
          {numero && (
            <button
              onClick={limpiar}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 px-1"
              title="Limpiar"
            >
              <X size={12} />
            </button>
          )}
        </div>
      )}

      <button
        onClick={() => {
          if (mostrarInput && numero) {
            manejarEliminar();
          } else {
            setMostrarInput(!mostrarInput);
          }
        }}
        className="p-2 bg-red-600 hover:bg-red-700 rounded text-white"
        title="Eliminar lista por número"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
};

export default EliminarListaPorNumero;
