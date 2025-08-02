import { useState } from "react";
import PropTypes from "prop-types";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { eliminarListaPorNumero } from "@/services/listaService";
import { socket } from "@/socket";

const EliminarListaPorNumero = ({ onRestaurarListas }) => {
  const [visible, setVisible] = useState(false);
  const [numero, setNumero] = useState("");

  const handleTrashClick = async () => {
    if (!visible) {
      setVisible(true);
      return;
    }

    if (!numero.trim()) {
      setVisible(false);
      return;
    }

    const confirmar = window.confirm(`¿Eliminar lista número ${numero}?`);
    if (!confirmar) return;

    try {
      await eliminarListaPorNumero(numero);
      toast.success(`Lista ${numero} eliminada`);

      // Emitir por socket
      socket.emit("listaEliminada", { numero });

      // 🧼 Limpiar y ocultar
      setNumero("");
      setVisible(false); // ✅ esto oculta el buscador
      onRestaurarListas();
    } catch (error) {
      const msg = error?.response?.data?.message || "Error al eliminar";
      toast.error(msg);
    }
  };

  const handleChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "").slice(0, 3);
    setNumero(valor);
  };

  const limpiar = () => {
    setNumero("");
    onRestaurarListas();
  };

  return (
    <div className="relative">
      <button
        onClick={handleTrashClick}
       className=" w-10 h-10 flex items-center justify-center rounded bg-white border border-red-600 text-red-600 hover:bg-red-50"

        title="Eliminar lista por número"
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      {visible && (
       <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 z-10 flex items-center bg-white border border-gray-300 rounded px-2 py-1 shadow-sm">

          <input
            type="text"
            value={numero}
            onChange={handleChange}
            placeholder="N°"
            maxLength={3}
            className="w-16 text-sm outline-none text-center"
          />
          {numero && (
            <button
              onClick={limpiar}
              className="ml-1 text-gray-500 hover:text-gray-800"
              title="Limpiar"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

EliminarListaPorNumero.propTypes = {
  onRestaurarListas: PropTypes.func.isRequired,
};

export default EliminarListaPorNumero;
