## Dependencias.

Para arrancar el siguiente ejemplo es necesario tener instalado node y npm.
Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

## Ejecución.

Primero hay que instalar las dependencias del proyecto con el siguiente comando ( ejecutado dentro de la carpeta del proyecto ):

    npm i

Para ejecutar el ejemplo se debe abrir 2 terminales:

En la primera se ejecuta el servidor:

    node producer.js

En la segunda se ejecuta el cliente:
  
    node consumer.js

## Explicación.

Kafka es una plataforma distribuida de gestion de eventos via streaming, pero tambien puede actuar como un productor / consumidor clasico, en la que los productores envian mensajes a un topico y los consumidores los reciben de ese topico. Kafka soporta una barbaridad de opciones, pero podemos usarlo como gestor de mensajes encolados.

## Referencias.

[Kafka](https://kafka.apache.org/)
[Node.js](https://nodejs.org/es/)
[kafka-node](https://www.npmjs.com/package/kafka-node)
