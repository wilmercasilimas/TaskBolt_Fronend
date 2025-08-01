// src/services/listaService.js
import api from "@/api/axiosInstance";

export const crearLista = (variantes) => api.post("/listas", { variantes });

export const eliminarListaPorId = (id) => api.delete(`/listas/${id}`);

export const eliminarListaPorNumero = (numero) =>
  api.delete(`/listas/numero/${numero}`);
