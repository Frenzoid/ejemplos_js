/**
 * Author: @Frenzoid
 */
// Nos traemos el modulo aes256 para encriptar y desencriptar mensajes.
const aes256 = require('aes256');

// Clave para encriptar y desencriptar mensajes. Esta clave debe ser la misma en el productor y el consumidor.
/***
 * aes256.encrypt(claveCompartida, mensaje) => mensajeEncriptado -> Encripta el mensaje con la claveCompartida.
 * aes256.decrypt(claveCompartida, mensaje) => mensajeDesencriptado -> Desencripta el mensaje con la claveCompartida.
 */
const claveCompartida = "claveCompartida";

// Nos traemos el modulo de kafka-node para interacturar con un servidor kafka desde node.
const kafka = require('kafka-node');

/**
 * Creamos un cliente de kafka ( conexion con el servidor de kafka, 
 * con este objeto "client" podemos gestionar nuestro servidor de kafka,
 * crear consumidores, productores, crear topicos, borrarlos, etc... ).
 * 
 * kafka.KafkaClient(options));
 * 
 * En este caso, el objeto options contiene 2 propiedades:
 * - kafkaHost: La dirección del servidor kafka.
 * - autoConnect: Si queremos que se conecte automaticamente al servidor kafka.
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
 * 
 * 
 * NO SE PUEDEN TENER MÁS DE 2 CONSUMIDORES CON EL MISMO CLIENTE, SI QUIERES TENER 2, CREA OTRO client, y crea el consumidor desde ese client.
 * 
 * const client2 = new kafka.KafkaClient({ kafkaHost: 'oldbox:9092', autoConnect: true });
 * const consumer2 = new kafka.Consumer(client2, [{ topic: "topicoPrueba" }]);
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

  // Desencriptamos el mensaje recibido.
  message.value = aes256.decrypt(claveCompartida, message.value);
  console.log("Nuevo mensaje consumido:", message.value);
});

// Si el consumidor sufre un error, se ejecutara esta funcion.
consumer.on('error', (err) => { console.log(err) })

