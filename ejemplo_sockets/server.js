/**
 * Author: @Frenzoid
 */
// De la libreria "socket.io" importamos el metodo "Server" que nos permite crear un servidor de sockets.
const { Server } = require("socket.io");

// Creamos un servidor de sockets, y lo ponemos a esuchar en el puerto 9000.
const io = new Server();
io.listen(9000);

// Con console.log podemos imprimir mensajes en la consola.
console.log("Servidor de sockets escuchando en el puerto 9000");

/**
 * La manera en la que socket.io funciona es mediante eventos.
 * 
 * Con io.on("nombre_evento", (dato) => {}) definimos un evento de recepcion (cliente->servidor).
 *     io.on("nombre_evento", funcion a ejecutar al recibir el evento ( se pasa por parametro el dato recibido ));
 * 
 * Con socket.emit("nombre_evento", dato) definimos un evento de emisión (servidor->cliente) y emitimos el dato
 * por el evento "nombre_evento". El "dato" puede ser cualquier tipo de dato, un string, objeto, array, etc...
 * 
 * Basicamente le estamos diciendo al programa que se ponga a escuchar en el puerto 9000, y cuando reciba un 
 * evento de nombre "nombre_evento" ejecute la funcion que le pasamos como parametro, 
 * y recibiremos por parametro el mensaje recibido por dicho canal.
 * 
 * En este caso, cuando reciba un evento de nombre "hola" ejecutara la funcion que le pasamos
 * Pero lo que primero recibiremos es un evento "connection", y recibimos un objeto de tipo "socket" 
 * que nos permite interactuar con el cliente que se acaba de conectar.
 * 
 * Socket.io tiene eventos por defecto como "connection, connect_error, disconnect, error, newListener, removeListener"...
 * pero nosotros podemos definir nuestros propios eventos y crear eventos (funciones a ejecutar cuando se reciba 
 * un mensaje por ese canal) para lo que necesitemos, como en este caso con el canal "hola" y "adios".
 */
io.on("connection", (socket) => {

  // Podemos concatenar variables con comas, y autoaticamente se convertiran a string con espaciado.
  console.log("Cliente con IP", socket.handshake.address, "y id", socket.id, "conectado.");

  // Recibimos un mensaje del cliente, le enviamos un mensaje de vuelta y desconectamos el socket.
  socket.on("hola", (message) => {
    console.log("El cliente", socket.handshake.address, "ha mandado:", message);
    socket.emit("adios", "He recibido el mensaje, adios.");
    socket.disconnect();
  });

  // Si el cliente se desconecta o pierde la conexion con el servidor, se ejecuta la siguiente funcion.
  socket.on("disconnect", () => {
    console.log("Cliente con id", socket.id, "desconectado.");
  });

});

