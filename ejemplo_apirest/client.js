/**
 * Author: @Frenzoid
 * Source: https://axios-http.com/docs/intro
 */

/***
 * Importamos axios, libreria para realizar peticiones http.
 * 
 * https://axios-http.com/docs/intro
 */
const axios = require("axios");

/**
 * Importamos https, libreria para configurar el protocolo https, en este caso con axios.
 */
const https = require("https");

/**
 * Creamos una instancia de axios, con la configuracion de https, para que ignore los errores del certificado ( ya que estan firmados por nosotros mismos ).
 */
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Variable que usaremos para guardar el id del usuario que crearemos.
let id;

// Url de la api rest. Si has generado los certificados y tines el servidor https corriendo, cambia http por https.
const url = "http://localhost:3000/";

/**
 * Realizamos una solicitud GET a nuestro servidor, con la url /users.
 * 
 * https://axios-http.com/docs/intro
 * */
instance
  .get(url + "users")
  .then((response) => {
    // Si la solicitud es correcta, imprimimos la respuesta.
    console.log(response.data);
  })
  .catch((error) => {
    // Si la solicitud es incorrecta, imprimimos el error.
    console.log(error);
  });

// Lo mismo que arriba pero usando async/await ( mucho más comodo )
async function getUsers() {
  try {
    const response = await axios.get(url + "users");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

getUsers();

/***
 * Creamos un usuario con la funcion POST, lo obtenemos con la funcion GET y lo eliminamos con la funcion DELETE.
 */
async function creaObtenBorra() {
  // Creamos un usuario
  try {
    const response = await instance.post(url + "users", {
      name: "Jacobs",
      edad: 25,
      id: 4,
    });

    // Guardamos el id del usuario que creamos.
    id = response.data.id;
    console.log("Usuario creado!", response.data);

    // Obtenemos el usuario que creamos. V Otra forma de concatenar strings.
    const response2 = await instance.get(`${url}users/${id}`);
    console.log("Usuario con id", id, "obtenido!", response2.data);

    // Eliminamos el usuario que creamos.
    const response3 = await instance.delete(url + "users/" + id);
    console.log("Usuario eliminado, esta es la list actualizada:", response3.data);

  } catch (error) {
    console.log(error);
  }
}

creaObtenBorra();