// src/componente/EliminarListaPorNumero.jsx
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";
import { eliminarListaPorNumero } from "@/services/listaService";
import { socket } from "@/socket"; // Asegúrate que la ruta sea correcta

const EliminarListaPorNumero = ({ onRestaurarListas }) => {
  const eliminar = async () => {
    const numeroStr = prompt("Ingrese el número de la lista que desea eliminar:");
    if (!numeroStr) return;

    const numero = Number(numeroStr.trim());
    if (isNaN(numero)) {
      return toast.error("Número inválido");
    }

    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la lista número ${numero}?`
    );
    if (!confirmar) return;

    try {
      const res = await eliminarListaPorNumero(numero);
      toast.success(`Lista número ${numero} eliminada correctamente`);

      // Emitir evento de eliminación por socket (opcional si backend ya lo hace)
      socket.emit("listaEliminada", { id: res.data._id, numero });

      if (onRestaurarListas) onRestaurarListas();
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Error al eliminar la lista";
      toast.error(msg);
    }
  };

  return (
    <button
      onClick={eliminar}
      className="p-2 rounded bg-white border border-red-600 text-red-600 hover:bg-red-50"
      title="Eliminar lista por número"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};

EliminarListaPorNumero.propTypes = {
  onRestaurarListas: PropTypes.func.isRequired,
};

export default EliminarListaPorNumero;
