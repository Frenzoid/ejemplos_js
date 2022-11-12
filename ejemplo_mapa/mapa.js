/**
 * Author: @Frenzoid and @esv18ua
 */

/**
 * Nos traemos lo que hemos exporado en el archivo kafka.js
 * 
 * Al importar se realiza varias tareas antes de exportar:
 * 1. Se conecta al servidor de kafka.
 * 2. Se crea un topcio llamado "mapa"
 * 3. Se crea un consumidor.
 * 4. Se crea un productor.
 *
 * En este caso hemos exportado 2 cosas:
 * 1. El consumdior.
 * 2. El productor.
 */
const { consumer, producer } = require("./kafka.js");
const readline = require('readline');

/**************************************************************
 * Preparamos el lector de la consola
 *  */
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

/**************************************************************
 * Creamos un objeto para almacenar los datos del usuario
 * 
 * usuario.antiguo.x  -> Posicion antigua en x
 * usuario.antiguo.y  -> Posicion antigua en y
 * usuario.nuevo.x    -> Posicion nueva en x
 * usuario.nuevo.y    -> Posicion nueva en y
 * usuario.nombre     -> Nombre del usuario
 */
let usuario = { antiguo: { x: 10, y: 10 }, nuevo: { x: 10, y: 10 }, nombre: process.argv[2] };

// Crear array 20x20
let matriz = [];

for (let i = 0; i < 20; i++) {
    matriz[i] = [];
    for (let j = 0; j < 20; j++)
        matriz[i][j] = "  ";
}

// Inicializamos postion del usuario
matriz[usuario.antiguo.x][usuario.antiguo.y] = usuario.nombre;

// Funcion para imprimir la matriz
console.table(matriz)

// Funcion a ejecutar cuando se detecta un evento de teclado
process.stdin.on('keypress', (chunk, key) => {

    usuario.antiguo.x = usuario.nuevo.x;
    usuario.antiguo.y = usuario.nuevo.y;

    // Dependiendo de la tecla pulsada, se actualiza la posicion del usuario, o se sale del programa si es "q".
    /**
     * key.name -> Nombre de la tecla pulsada
     */
    switch (key.name) {
        case "up": usuario.nuevo.x -= 1;
            break;
        case "down": usuario.nuevo.x += 1;
            break;
        case "left": usuario.nuevo.y -= 1;
            break;
        case "right": usuario.nuevo.y += 1;
            break;
        case "q": process.exit();
    }

    // Si la posicion nueva sale de los limites, apaece por el otro lado.
    if (usuario.nuevo.x < 0)
        usuario.nuevo.x = 19;
    if (usuario.nuevo.x > 19)
        usuario.nuevo.x = 0;
    if (usuario.nuevo.y < 0)
        usuario.nuevo.y = 19;
    if (usuario.nuevo.y > 19)
        usuario.nuevo.y = 0;

    // Se actualiza el valor a enviar al resto de usuarios.
    let payloads = [{ topic: 'mapa', messages: JSON.stringify(usuario), partition: 0 }];

    // Envia el mensaje ( payload ( coordenadas nuevas de nuestro usuario )) al resto de usuarios.
    producer.send(payloads, err => console.error);
});

// Cuando se recibe un mensaje, borramos la posicion antigua y ponemos la nueva del jugador recibido.
consumer.on('message', (message) => {
    let usr = JSON.parse(message.value);

    console.clear();

    matriz[usr.antiguo.x][usr.antiguo.y] = "  ";
    matriz[usr.nuevo.x][usr.nuevo.y] = usr.nombre;

    console.table(matriz);
});