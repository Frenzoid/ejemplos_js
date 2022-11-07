/**
 * Author: @Frenzoid
 */
// Nos traemos el modulo de kafka-node para interacturar con un servidor kafka desde node.
const kafka = require('kafka-node');

// Nos traemos el modulo de readline para leer desde la terminal.
const reader = require("read-console");

/**
 * Creamos un cliente de kafka ( conexion con el servidor de kafka, 
 * con este objeto "client" podemos gestionar nuestro servidor de kafka,
 * crear consumidores, productores, crear topicos, borrarlos, etc... ).
 * 
 * kafka.KafkaClient(options));
 * 
 * https://npmjs.com/package/kafka-node#kafkaclient
 * */
const client = new kafka.KafkaClient({ kafkaHost: 'oldbox.cloud:9092' });

/**
 * Creamos un productor.
 * https://www.npmjs.com/package/kafka-node#producer
 * */
const producer = new kafka.Producer(client);

/**
 * Payload, es el mensaje que vamos a enviar. El mensaje no puede ser solo un string como en los sockets,
 * el objeto del mensaje debe ser un array de mensajes ( ya que por defecto kafka soporta la emisión
 * de varios mensajes a la vez, enpaquetados en arrrays ), cada mensje debe tener unos datos.
 * 
 * - messages: El mensaje en si.
 * - topic: El topico al que se va a enviar el mensaje.
 * - partition: La partición a la que se va a enviar el mensaje.
 * 
 * https://www.npmjs.com/package/kafka-node#sendpayloads-cb
 * */
let payloads = [{ topic: "topicoPrueba", messages: "Hola :)", partition: 0 }];


/**
 * Creamos los topicos.
 * https://www.npmjs.com/package/kafka-node#createtopicstopics-cb
 */
client.createTopics(["topicoPrueba"], (err, data) => {
  if (err) console.error("Error!", err)
  else console.log("Topicos creados!", data);
});

/**
 * Cuando el productor este listo, se ejecutara esta funcion.
 * */
producer.on('ready', () => {
  console.log("Productor listo para producir!");
  emiteMensaje();
});

/**
 * Si el productor tiene un error, se ejecutara esta funcion.
 * */
producer.on('error', (err) => { console.log(err) })


function emiteMensaje() {
  reader.read("Mensaje: ", mensaje => {

    // Cambiamos el mensaje del payload.
    /**
     * Payload, es el mensaje que vamos a enviar. El mensaje DEBE ser un string, no puede ser un objeto.
     * Si queremos enviar un objeto, debemos convertirlo a string usando la funcion
     * JSON.stringify(objeto).
     * 
     * Eje: payloads[0].messages = JSON.stringify({ nombre: "Fernando", edad: 20 })
     */
    payloads[0].messages = mensaje;

    /**
     * Enviamos el mensaje.
     * https://www.npmjs.com/package/kafka-node#sendpayloads-cb
     * 
     * Prueba a cerrar el consumidor, y a enviar un mensaje, cuando vuelvas a abrir el consumidor,
     * el mensaje se enviara al consumidor automáticamente, similar a los mensajes del whatsapp.
     * */
    producer.send(payloads, (err, data) => {
      if (err) console.error("Error!", err);
      else console.log("Mensaje enviado!", data);
      emiteMensaje();
    });
  });
}