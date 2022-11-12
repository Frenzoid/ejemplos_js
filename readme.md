# Sobre este repositorio.

Este repositorio contiene ejemplos en JS para realizar las prácticas de SD de la ingenieria informática de la Universidad de Alicante.

## Requisitos.

### Node.js
Para ejecutar los ejemplos es necesario tener instalado node y npm.

Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

### Docker
Para ejecutar los ejemplos de kafka y bases de datos es necesario tener instalado docker para desplegar los contenedores de kafka, zookeeper y la base de datos.


### Nociones Básicas de JS
Para poder entender los ejemplos es necesario tener nociones básicas de JS. En el siguiente enlace se puede encontrar una guía de JS:

[Guía de JS](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)

En concreto hay que entender que JS es un lenguaje de programación de tipado dinámico, es decir, no es necesario declarar el tipo de las variables. Además, JS es un lenguaje de programación orientado a objetos, es decir, las variables pueden ser de tipo objeto y los objetos pueden tener propiedades y métodos.

**Y lo más importante**, JS es un lenguaje de programación **asíncrono**. Esto significa que algunas de las operaciones que se ejecutan en el programa no se ejecutan en el orden en el que se escriben en el código. Por ejemplo, si se ejecuta el siguiente código:

    console.log("1");
    setTimeout(() => console.log("2"), 1000);
    console.log("3");

El resultado será:

    1
    3
    2

Esto se debe a que la función setTimeout se ejecuta en un hilo distinto al hilo principal del programa. Por lo tanto, la función setTimeout se ejecuta después de que se ejecuta el código que sigue a la llamada a la función setTimeout.

Para ello hay que aprender a usar las promesas y los callbacks. En el siguiente enlace se puede encontrar una guía de promesas y callbacks:

[Guía de promesas y callbacks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises).

Aunque supongo que un video explicativo es más fácil de entender:

[Video explicativo de promesas y callbacks](https://www.youtube.com/watch?v=PoRJizFvM7s).

Además de entender como funciona npm y como crear proyectos via npm:

[Guía de npm](https://docs.npmjs.com/)

## Contenido.

En este repositorio se pueden encontrar ejemplos de como realizar:

- Conexiones con sockets: 
  - [ejemplo_sockets](ejemplo_sockets).
- Conexiones con Kafka: 
  - [ejemplo_kafka](ejemplo_kafka).
- Conexiones con una base de datos ( cualquiera. En este caso se usa PostgreSQL ): 
  - [ejemplo_db](ejemplo_db).
- Servicios REST ( cliente y servidor ):
  - [ejemplo_apirest](ejemplo_apirest).
- Lectura por teclado, y impresión por pantalla:
  - [ejemplo_mapa](ejemplo_mapa).

Y de como desplegar con docker:

- Un servidor de Kafka.
- Un servidor de Zookeeper.
- Un servidor de bases de datos PostgreSQL.
- Un cliente web para interactuar con la base de datos (adminer).