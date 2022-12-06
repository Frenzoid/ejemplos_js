/**
 * Author: @Frenzoid
 */

/***
 * Importamos https, libreria para crear servidores https.
 * 
 * https://nodejs.org/api/https.html
 */
const https = require("https");

/***
 * Importamos fs, libreria para leer archivos.
 * 
 * https://nodejs.org/api/fs.html
 */
const fs = require("fs");

/***
 * Creamos las opciones para el servidor https
 * 
 * https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
 */
const options = {
  key: fs.readFileSync("certificados/key.pem"),
  cert: fs.readFileSync("certificados/cert.pem"),
};

/***
 * Creamos el servidor https, y le pasamos esta instancia https al servidor de sockets, para que la use.
 * 
 * https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
 */
const server = https.createServer(options);

/***
 * Importamos socket.io, libreria para crear servidores de sockets.
 * Y le pasamos al constructor el servidor https, para que lo use.
 * 
 * https://socket.io/docs/v4/server-initialization/
 * */
const io = require("socket.io")(server, {
  cors: { origin: "*", }
});

/***
 * Ponemos el servidor a escuchar en el puerto 9000.
 * 
 * https://nodejs.org/api/https.html#https_server_listen
 */
server.listen(9000, () => {
  // Una vez que el servidor esté enganchado al puerto 9000, ejecuta esta función.
  console.log("Servidor de sockets (https) escuchando en el puerto 9000!");
});


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