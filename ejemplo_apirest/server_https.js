/**
 * Author: @Frenzoid
 * Source: https://github.com/Frenzoid/express-apirest
 */

/***
 * Importamos https, libreria para crear un servidor https.
 * 
 * https://nodejs.org/api/https.html
 */
const https = require("https");

/***
 * Importamos fs, libreria para leer archivos del sistema.
 * 
 * https://nodejs.org/api/fs.html
 */
const fs = require("fs");

/***
 *  Importamos express, libreria para crear un servidor web.
 * 
 *  https://expressjs.com/es/starter/hello-world.html
 *  */
const express = require("express");

/**
 * Creamos una instancia de express
 * 
 * https://expressjs.com/es/starter/hello-world.html
 *  */
const app = express();

/**
 * Importamos CORS, libreria para permitir el acceso desde el mismo dominio.
 */
const cors = require('cors');

/**
 * Configuramos el body parser, esta configuracion nos permite leer el body de las peticiones ( POST, PUT, PATCH ).
 * Configuramos CORS para permitir el acceso desde el mismo dominio.
 * https://expressjs.com/es/api.html#express.json
 *  */
app.use(express.json());
app.use(cors());

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
 * Creamos el servidor https, y le pasamos las opciones y la instancia de express, para que express maneje este servidor con certificados.
 * 
 * https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
 */
const server = https.createServer(options, app);

// Array de usuarios.
let users = [
  {
    name: "Frenzoid",
    age: 21,
    id: 0,
  },
  {
    name: "Pepito",
    age: 22,
    id: 1,
  },
  {
    name: "Juanito",
    age: 23,
    id: 2,
  },
  {
    name: "Pedrito",
    age: 23,
    id: 3,
  },
];

/**
 * Creamos las rutas de la API, y las funciones a ejecutar cuando las llamemos.
 * 
 * Estas funciones reciben 2 objetos, req, y res:
 * req: Es un objeto que contiene toda la informacion de la peticion.
 * res: Es un objeto que nos permite enviar una respuesta a esta petición.
 * 
 * https://expressjs.com/es/guide/routing.html
 *  */

/**
 * GET /
 */
app.get("/", (req, res) => {
  res.json({ message: "Hola Mundo", time: new Date().toLocaleTimeString() });
});

/**
 * GET /users
 * */
app.get("/users", (req, res) => {
  res.send(users);
});

/**
 * GET /users/:id
 * 
 * :id es un parametro, que nos permite pasar un valor a la ruta, y usarlo en la funcion.
 */
app.get("/users/:id", (req, res) => {
  const id = req.params.id; // podemos acceder al parametro id, con req.params.id
  res.send(users[id]);
});

/**
 * POST /users
 * */
app.post("/users", (req, res) => {
  users.push(req.body);
  res.send(users[users.length - 1]);
});

/**
 * PUT /users/:id
 * */
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  users[id] = { ...users[id], ...req.body }; // Actualizamos el usuario, reemplazamos solo los campos que nos llegan en el body.
  res.send(users[id]);
});

/**
 * DELETE /users/:id
 */
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id != id);
  res.send(users);
});


/**
 * Iniciamos el servidor (https), escuchando en el puerto 3000.
 * 
 * https://expressjs.com/es/starter/hello-world.html
 * */
server.listen(3000, () => {
  console.log("Servidor https iniciado en el puerto 3000");
});
