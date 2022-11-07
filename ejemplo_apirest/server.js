/**
 * Author: @Frenzoid
 * Source: https://github.com/Frenzoid/express-apirest
 */

/***
 *  Importamos express
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
 * Configuramos el body parser, esta configuracion nos permite leer el body de las peticiones ( POST, PUT, PATCH ).
 * 
 * https://expressjs.com/es/api.html#express.json
 *  */
app.use(express.json());


// Array de usuarios.
const users = [
  {
    name: "Frenzoid",
    age: 21,
  },
  {
    name: "Pepito",
    age: 22,
  },
  {
    name: "Juanito",
    age: 23,
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
 */
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(users[id]);
});

/**
 * POST /users
 * */
app.post("/users", (req, res) => {
  users.push(req.body);
  res.send("Usuario creado");
});

/**
 * PUT /users/:id
 * */
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  users[id] = req.body;
  res.send("Usuario actualizado");
});

/**
 * DELETE /users/:id
 */
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users.splice(id, 1);
  res.send("Usuario eliminado");
});


/**
 * Iniciamos el servidor, escuchando en el puerto 3000.
 * 
 * https://expressjs.com/es/starter/hello-world.html
 * */
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
