import PropTypes from "prop-types";
import BotonAccion from "../estilos/BotonAccion";
import { Edit3, Trash2, CheckCircle, PlusCircle } from "lucide-react";
import FormularioVariante from "./FormularioVariante";
import {
  eliminarVariante,
  completarVariante,
  editarVariante
} from "../services/variantesService";
import { toast } from "react-hot-toast";

// 🆕 Agregados
import { useState } from "react";
import ModalEditar from "./ModalEditar";

const TarjetaLista = ({ lista }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  // 🆕 Mostrar/ocultar formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleEliminar = async (variante) => {
    try {
      await eliminarVariante(lista._id, variante._id);
      toast.success("Producto eliminado");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al eliminar");
    }
  };

  const handleCompletar = async (variante) => {
    try {
      await completarVariante(lista._id, variante._id);
      toast.success("Producto marcado como completado");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al completar");
    }
  };

  const handleEditar = (variante) => {
    setVarianteSeleccionada(variante);
    setModalAbierto(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-xl mx-auto">
      {/* 🆕 Encabezado con botón en esquina superior derecha */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-blue-700">Lista #{lista.numero}</h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">
            {mostrarFormulario ? "Ocultar" : "Agregar"}
          </span>
        </button>
      </div>

      {/* 🆕 Formulario condicional */}
      {mostrarFormulario && <FormularioVariante listaId={lista._id} />}

      {lista.variantes.length === 0 ? (
        <p className="text-gray-500 italic">Esta lista está vacía.</p>
      ) : (
        <ul className="space-y-2">
          {lista.variantes.map((variante) => (
            <li
              key={variante._id}
              className={`p-3 border rounded ${
                !variante.estado
                  ? "bg-green-100 line-through text-gray-400"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="block font-medium">{variante.nombre}</span>
                  <span className="block text-sm">Cantidad: {variante.cantidad}</span>
                </div>

                {variante.estado && (
                  <div className="flex gap-2 flex-wrap">
                    <BotonAccion
                      texto="Editar"
                      Icono={Edit3}
                      onClick={() => handleEditar(variante)}
                      color="blue"
                    />
                    <BotonAccion
                      texto="Eliminar"
                      Icono={Trash2}
                      onClick={() => handleEliminar(variante)}
                      color="red"
                    />
                    <BotonAccion
                      texto="Completar"
                      Icono={CheckCircle}
                      onClick={() => handleCompletar(variante)}
                      color="green"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🆕 Modal de edición */}
      {varianteSeleccionada && (
        <ModalEditar
          isOpen={modalAbierto}
          onClose={() => {
            setModalAbierto(false);
            setVarianteSeleccionada(null);
          }}
          variante={varianteSeleccionada}
          listaId={lista._id}
        />
      )}
    </div>
  );
};

TarjetaLista.propTypes = {
  lista: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    numero: PropTypes.number.isRequired,
    variantes: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        nombre: PropTypes.string,
        cantidad: PropTypes.number,
        estado: PropTypes.bool,
      })
    ),
  }).isRequired,
};

export default TarjetaLista;
