// src/services/listaService.js
import api from "@/api/axiosInstance";

// Crear una nueva lista con sus variantes
export const crearLista = (variantes) => api.post("/listas", { variantes });

// Eliminar una lista por su ID (MongoDB _id)
export const eliminarListaPorId = (id) => api.delete(`/listas/${id}`);

// Eliminar una lista por su número asignado
export const eliminarListaPorNumero = (numero) => api.delete(`/listas/numero/${numero}`);
