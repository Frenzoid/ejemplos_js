### Revisar el ejemplo de kafka antes.

## Dependencias.

Para arrancar el siguiente ejemplo es necesario tener instalado node y npm.
Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

## Ejecución.

Primero hay que instalar las dependencias del proyecto con el siguiente comando ( ejecutado dentro de la carpeta del proyecto ):

    npm i

Para ejecutar el ejemplo se debe abrir 2 terminales:

En la primera se ejecuta el servidor:

    node mapa.js "nombre del jugador"

En la segunda se ejecuta el cliente:
  
    node mapa.js "nombre del jugador"

## Explicación.

En este ejemplo se muestra un mapa por el cual interactuan 2 jugadores. Cada jugador puede moverse por el mapa con las teclas de dirección. El mapa se actualiza en tiempo real para todos los jugadores. El ejemplo demuestra como leer el teclado y como enviar mensajes a otros jugadores via kafka.

Cada movimiento del jugador se envía a kafka y este se envía a todos los jugadores para ser redibujado ( includo el propio jugador [el jugador recibe su propio movimiento via kafka]). En resumen, cada jugador recibe los mensajes de kafka y actualiza su mapa en función de los mensajes recibidos.

## Referencias.

[Node.js](https://nodejs.org/es/)
[Kafka dockerHub](https://hub.docker.com/r/bitnami/kafka)
[Kafka-node](https://www.npmjs.com/package/kafka-node)