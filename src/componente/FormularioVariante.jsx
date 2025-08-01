// src/componente/FormularioVariante.jsx
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";

const FormularioVariante = ({ listaId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const nuevaVariante = [
        { nombre: data.nombre, cantidad: Number(data.cantidad) },
      ];
      await axios.post(
        `https://taskbolt-backend.onrender.com/api/variantes/${listaId}/multiples`,
        { variantes: nuevaVariante }
      );

      toast.success("Producto agregado correctamente");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al agregar producto");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 bg-gray-100 p-4 rounded-lg space-y-3"
    >
      <h3 className="text-blue-700 font-semibold">Agregar nuevo producto</h3>

      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          {...register("nombre", { required: "Este campo es obligatorio" })}
          className="w-full border p-2 rounded"
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          min={1}
          placeholder="Cantidad"
          {...register("cantidad", { required: "Este campo es obligatorio" })}
          className="w-full border p-2 rounded"
        />
        {errors.cantidad && (
          <p className="text-red-500 text-sm">{errors.cantidad.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Agregar
      </button>
    </form>
  );
};

FormularioVariante.propTypes = {
  listaId: PropTypes.string.isRequired,
};

export default FormularioVariante;
