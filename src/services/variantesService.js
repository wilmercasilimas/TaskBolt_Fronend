// src/services/variantesService.js
import api from "@/api/axiosInstance";

export const obtenerListas = () => api.get("/variantes");

export const editarVariante = (listaId, itemId, data) =>
  api.put(`/variantes/${listaId}/${itemId}`, data);

export const eliminarVariante = (listaId, itemId) =>
  api.delete(`/variantes/${listaId}/${itemId}`);

export const completarVariante = (listaId, itemId) =>
  api.patch(`/variantes/${listaId}/${itemId}/estado`);

export const agregarMultiplesVariantes = (listaId, variantes) =>
  api.post(`/variantes/${listaId}/multiples`, { variantes });
