/**
 * Author: @Frenzoid
 */
// De la libreria "socket.io-client" importamos el metodo "io" que nos permite conectarnos a un servidor de sockets.
const { io } = require("socket.io-client");

// De la libreria read-console importamos todo, usaremos esta variable "reader" para leer datos desde la consola.
const reader = require("read-console");

// Creamos una conexion con el servidor de sockets en el puerto 9000.
const socket = io("http://localhost:9000");

// contandor de reintentos.
let intentos = 0;


// Con nuestro socket (cliente) podemos definir ciertos eventos a manejar entre cliente y servidor.
// Con socket.on("nombre_event", (dato) => {}}) definimos un evento de recepcion (servidor->cliente)
// Con socket.emit("nombre_event", "dato") definimos un evento de emisión (cliente->servidor)


// Funcion que se ejecuta cuando el servidor confirma nuestra conexión.
socket.on("connect", () => {
  intentos = 0;
  console.log("Conectado al servidor.");

  // Leemos desde la consola.
  reader.read("Escribe un mensaje: ", (message) => {
    // "message" es el mensaje que escribimos en la consola.
    // Emitimos el mensaje al servidodr por el evento "hola".
    socket.emit("hola", message);
  });
});

// Función que se ejecuta cando recibimos un mensaje del servidor por el evento "adios".
socket.on("adios", (dato) => {
  console.log("El servidor ha dicho:", dato);
});

// Si nos hemos desconectado ( o el servidor nos ha kickeado ) se ejecuta la siguiente funcion.
socket.on("disconnect", (error) => {
  console.log("Se ha perdido la conexion con el servidor por el siguiente motivo:", error);

  // El motivo de la desconexión es la de que el servidor nos ha desconectado.
  if (error === "io server disconnect") process.exit(0);
});

// Por cada reintento fallido, ejecutamos la siguiente funcion ( prueba a cerrar el servidor antes de mandar nada, y arrancalo denuevo! ).
socket.on("connect_error", (error) => {
  intentos++;
  console.log("Reintentando... Intento:", intentos);

  if (intentos >= 10) process.exit(1);
});