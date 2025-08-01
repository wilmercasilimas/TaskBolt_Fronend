import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../../socket";
import TarjetaLista from "../../componente/TarjetaLista";
import CerrarSesion from "../../componente/CerrarSesion";
import CrearLista from "./CrearLista";
import { ClipboardPlus, XCircle } from "lucide-react";
import FiltroNumeroLista from "../../componente/FiltroNumeroLista";
import EliminarListaPorNumero from "../../componente/EliminarListaPorNumero";

const ListaPagina = () => {
  const [listas, setListas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const obtenerListas = async (numero = null) => {
    try {
      const url = numero
        ? `https://taskbolt-backend.onrender.com/api/variantes?numero=${numero}`
        : "https://taskbolt-backend.onrender.com/api/variantes";

      const { data } = await axios.get(url);
      setListas(data.listas);
    } catch (error) {
      console.error("❌ Error al obtener listas:", error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleFiltrarPorNumero = (numero) => {
    setCargando(true);
    obtenerListas(numero);
  };

  useEffect(() => {
    obtenerListas();

    socket.on("listaCreada", (nuevaLista) => {
      setListas((prev) => [...prev, nuevaLista]);
    });

    socket.on("variantesAgregadas", ({ listaId, variantes }) => {
      setListas((prev) =>
        prev.map((lista) =>
          lista._id === listaId
            ? { ...lista, variantes: [...lista.variantes, ...variantes] }
            : lista
        )
      );
    });

    socket.on("varianteEditada", ({ listaId, itemId, variante }) => {
      setListas((prev) =>
        prev.map((lista) => {
          if (lista._id !== listaId) return lista;
          return {
            ...lista,
            variantes: lista.variantes.map((v) =>
              v._id === itemId ? { ...v, ...variante } : v
            ),
          };
        })
      );
    });

    socket.on("varianteEliminada", ({ listaId, itemId }) => {
      setListas((prev) =>
        prev.map((lista) =>
          lista._id === listaId
            ? {
                ...lista,
                variantes: lista.variantes.filter((v) => v._id !== itemId),
              }
            : lista
        )
      );
    });

    socket.on("varianteDesactivada", ({ listaId, itemId, variante }) => {
      setListas((prev) =>
        prev.map((lista) =>
          lista._id === listaId
            ? {
                ...lista,
                variantes: lista.variantes.map((v) =>
                  v._id === itemId ? { ...v, ...variante } : v
                ),
              }
            : lista
        )
      );
    });

    return () => {
      socket.off("listaCreada");
      socket.off("variantesAgregadas");
      socket.off("varianteEditada");
      socket.off("varianteEliminada");
      socket.off("varianteDesactivada");
    };
  }, []);

  return (
    <div className="p-6 relative">
      {/* Botón cerrar sesión */}
      <div className="absolute top-4 right-4">
        <CerrarSesion />
      </div>

      {/* ➕🔍🗑️ Controles superiores */}
      <div className="flex items-center gap-4 mb-6">
        <EliminarListaPorNumero iconSize={22} />

        {/* Filtro y eliminar */}
        <FiltroNumeroLista onFiltrar={handleFiltrarPorNumero} iconSize={24} />
        {/* Crear lista */}
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="p-2 rounded bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
          title={mostrarFormulario ? "Cerrar formulario" : "Nueva lista"}
        >
          {mostrarFormulario ? (
            <XCircle size={24} />
          ) : (
            <ClipboardPlus size={24} />
          )}
        </button>
      </div>

      {/* Mostrar formulario solo si el estado lo permite */}
      {mostrarFormulario && <CrearLista />}

      {cargando ? (
        <p className="text-center text-gray-500">Cargando listas...</p>
      ) : listas.length === 0 ? (
        <p className="text-center text-gray-400">No hay listas creadas aún.</p>
      ) : (
        [...listas]
          .sort((a, b) => b.numero - a.numero)
          .map((lista) => <TarjetaLista key={lista._id} lista={lista} />)
      )}
    </div>
  );
};

export default ListaPagina;
