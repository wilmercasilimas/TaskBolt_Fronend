// src/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000"); // Cambia esto si estás en producción
