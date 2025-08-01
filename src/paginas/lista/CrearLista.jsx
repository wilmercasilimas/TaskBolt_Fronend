// src/paginas/lista/CrearLista.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusCircle, MinusCircle, ListPlus } from "lucide-react";

const CrearLista = () => {
  const [variantes, setVariantes] = useState([{ nombre: "", cantidad: 1 }]);
  const [enviando, setEnviando] = useState(false);

  const agregarVariante = () => {
    setVariantes([...variantes, { nombre: "", cantidad: 1 }]);
  };

  const quitarVariante = (index) => {
    const nuevas = [...variantes];
    nuevas.splice(index, 1);
    setVariantes(nuevas);
  };

  const handleChange = (index, campo, valor) => {
    const nuevas = [...variantes];
    nuevas[index][campo] = campo === "cantidad" ? parseInt(valor) : valor;
    setVariantes(nuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const { data } = await axios.post(
        "https://taskbolt-backend.onrender.com/api/listas",
        {
          variantes,
        }
      );

      toast.success(`Lista #${data.numero} creada`);
      setVariantes([{ nombre: "", cantidad: 1 }]); // Reiniciar formulario
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear la lista");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-2xl mx-auto mb-6"
    >
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <ListPlus size={20} />
        Crear nueva lista
      </h2>

      {variantes.map((v, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Producto"
            value={v.nombre}
            onChange={(e) => handleChange(index, "nombre", e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            min={1}
            value={v.cantidad}
            onChange={(e) => handleChange(index, "cantidad", e.target.value)}
            className="border p-2 rounded w-24"
            required
          />
          {variantes.length > 1 && (
            <button
              type="button"
              onClick={() => quitarVariante(index)}
              className="text-red-600"
              title="Quitar"
            >
              <MinusCircle />
            </button>
          )}
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={agregarVariante}
          className="flex items-center gap-1 text-blue-600"
        >
          <PlusCircle size={18} /> Agregar producto
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={enviando}
        >
          {enviando ? "Creando..." : "Crear Lista"}
        </button>
      </div>
    </form>
  );
};

export default CrearLista;
