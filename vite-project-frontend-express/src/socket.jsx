import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:3002"; // server URL
export const socket = io(SOCKET_URL);
