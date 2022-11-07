## Dependencias.

Para arrancar el siguiente ejemplo es necesario tener instalado node y npm.
Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

## Ejecución.

Primero hay que instalar las dependencias del proyecto con el siguiente comando ( ejecutado dentro de la carpeta del proyecto ):

    npm i

Para ejecutar el ejemplo se debe abrir 2 terminales:

En la primera se ejecuta el servidor:

    node server.js

En la segunda se ejecuta el cliente:
  
    node client.js

## Explicación.

El ejemplo muestra como se puede crear un servidor y un cliente que se comuniquen mediante sockets. El servidor escucha en el puerto 3000 y el cliente se conecta a ese puerto. El servidor recibe un mensaje del cliente y lo envía de vuelta al cliente. El cliente muestra el mensaje recibido por pantalla.

Esta libreria ([Socket.io](https://socket.io/)) permite crear eventos ( canales ) de comunicación entre cliente y servidor mediante eventos, de forma que el servidor puede enviar mensajes a todos los clientes conectados o a un cliente en particular.

## Referencias.

[Node.js](https://nodejs.org/es/)
[Socket.io](https://socket.io/)