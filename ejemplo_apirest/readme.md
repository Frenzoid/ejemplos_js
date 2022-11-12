## Dependencias.

Para arrancar el siguiente ejemplo es necesario tener instalado node y npm.
Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

## Ejecución.

Primero hay que instalar las dependencias del proyecto con el siguiente comando ( ejecutado dentro de la carpeta del proyecto ):

    npm i

Y despues en una terminal:

    node server.js

Y en otra terminal, una vez arrancado el servidor:

    node client.js

## Explicación.
En este ejemplo se muestra como crear una api rest con express. Para ello se crea un servidor que escucha en el puerto 3000 y que tiene dos rutas:

    GET  /
    GET  /usuarios
    GET  /usuarios/:id
    POST /usuarios
    PUT  /usuarios/:id
    DELETE /usuarios/:id

- La ruta / devuelve un mensaje de bienvenida con la hora actual.
- La ruta GET /usuarios devuelve un array de usuarios.
- La ruta GET /usuarios/:id devuelve un usuario concreto.
- La ruta POST /usuarios crea un usuario y la ruta PUT /usuarios/:id actualiza un usuario existente.
- La ruta DELETE /usuarios/:id elimina un usuario existente.

Tambien enseña a usar la libreria Axios para hacer peticiones http desde JS.

## Referencias.

[Node.js](https://nodejs.org/es/)
[Express](https://expressjs.com/es/)
[Peticiones HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
[Thunderclient](https://www.thunderclient.io/)
[postman](https://www.postman.com/)