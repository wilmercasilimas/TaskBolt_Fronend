// src/componente/ModalEditar.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { editarVariante } from "../services/variantesService";
import { toast } from "react-hot-toast";

const ModalEditar = ({ isOpen, onClose, variante, listaId }) => {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm({
  defaultValues: {
    nombre: variante?.nombre || "",
    cantidad: variante?.cantidad || 1
  }
});

useEffect(() => {
  if (isOpen && variante) {
    reset({
      nombre: variante.nombre || "",
      cantidad: variante.cantidad || 1
    });
  }
}, [isOpen, variante, reset]);



  const onSubmit = async (data) => {
    try {
      await editarVariante(listaId, variante._id, data);
      toast.success("Producto editado correctamente");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al editar");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-50 p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-4 text-blue-700">
              Editar producto
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  {...register("nombre", { required: "Este campo es obligatorio" })}
                  className="w-full border p-2 rounded"
                />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Cantidad</label>
                <input
                  type="number"
                  min={1}
                  {...register("cantidad", { required: "Este campo es obligatorio" })}
                  className="w-full border p-2 rounded"
                />
                {errors.cantidad && <p className="text-red-500 text-sm">{errors.cantidad.message}</p>}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

ModalEditar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variante: PropTypes.object,
  listaId: PropTypes.string.isRequired
};

export default ModalEditar;
