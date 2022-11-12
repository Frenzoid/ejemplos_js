// Importamos la libreria de kafka-node para poder interactuar con kafka.
const kafka = require("kafka-node");

// Creamos una conexión con kafka, donde kafkaHost es la dirección:puerto de kafka.
const client = new kafka.KafkaClient({ kafkaHost: 'oldbox.cloud:9092' });

// Creamos el topico que vamos a usar.
client.createTopics(["mapa"], (err, data) => {
    if (err) console.error("Error!", err);
});

// Creamos un productor y consumidor de kafka.
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(client, [{ topic: 'mapa', partition: 0 }]);

// Exportamos el consumidor y el productor para poder usarlos en otro fichero.
module.exports = { consumer, producer }