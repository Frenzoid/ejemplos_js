/**
 * Author: @Frenzoid
 */
// Nos traemos el modulo de kafka-node para interacturar con un servidor kafka desde node.
const kafka = require('kafka-node');

/**
 * Creamos un cliente de kafka ( conexion con el servidor de kafka, 
 * con este objeto "client" podemos gestionar nuestro servidor de kafka,
 * crear consumidores, productores, crear topicos, borrarlos, etc... ).
 * 
 * kafka.KafkaClient(options));
 * 
 * https://npmjs.com/package/kafka-node#kafkaclient
 * */
const client = new kafka.KafkaClient({ kafkaHost: 'oldbox.cloud:9092', autoConnect: true });


/**
 * Creamos los topicos.
 * https://www.npmjs.com/package/kafka-node#createtopicstopics-async-cb
 */
client.createTopics(["topicoPrueba", "topicoPrueba2"], (err, data) => {
  if (err) console.error("Error!", err)
  else console.log("Topicos creados!", data);
})


/**
 * Creamos un consumidor, que consuma de un topico en concreto, y que automaticamente deje los mensajes recibidos como "leeidos".
 * 
 * En kafka, los mensajes se pueden consumir de dos formas: autoCommit: true o false.
 * - autoCommit = true ( por defecto ): De forma automatica, cuando el consumidor recibe un mensaje, lo marca como leido y lo consume ( no se volverá a leer ).
 * - autoCommit = false: De forma manual, cuando el consumidor recibe un mensaje, lo marca como leido, pero no lo consume, el consumidor volverá a leer el mensaje si reinicias la aplicación.
 * 
 * Eje: const consumer = new kafka.Consumer(client, [{ topic: "topicoPrueba" }], { autoCommit: false });
 * 
 * https://www.npmjs.com/package/kafka-node#consumer
 * */
const consumer = new kafka.Consumer(client, [{ topic: "topicoPrueba" }]);


// Cuando el consumidor este listo y reciba un mensaje, se ejecutara esta funcion.
consumer.on('message', (message) => {
  /**
   * El mensaje recibido ES un string SIEMPRE, si lo que recibimos es objeto en formato string
   * (JSON), lo podemos parsear ( convertir de JSON a objeto JS ) con JSON.parse().
   * 
   * Eje: console.log("Nuevo mensaje consumido:", JSON.parse(message.value));
   *  */
  console.log("Nuevo mensaje consumido:", message.value);
});

// Si el consumidor sufre un error, se ejecutara esta funcion.
consumer.on('error', (err) => { console.log(err) })

