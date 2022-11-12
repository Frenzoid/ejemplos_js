/**
 * Author: @Frenzoid
 * Source: https://axios-http.com/docs/intro
 */

// Importamos axios
const axios = require("axios");

/**
 * Realizamos una solicitud GET a nuestro servidor, con la url /users.
 * 
 * https://axios-http.com/docs/intro
 * */
axios
  .get("http://localhost:3000/users")
  .then((response) => {
    // Si la solicitud es correcta, imprimimos la respuesta.
    console.log(response.data);
  })
  .catch((error) => {
    // Si la solicitud es incorrecta, imprimimos el error.
    console.log(error);
  });