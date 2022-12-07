## Dependencias.

Para arrancar el siguiente ejemplo es necesario tener instalado node y npm.
Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

## Ejecución.

Primero hay que instalar las dependencias del proyecto con el siguiente comando ( ejecutado dentro de la carpeta del proyecto ):

    npm i

### Ejemplo 1.

Para ejecutar el solo hay que ejeuctar el siguiente comando:

    npm run dev

Este programa arranca un entorno de desarollo web, usando svelte y vite, que se puede acceder desde el navegador en la dirección [http://localhost:5000](http://localhost:5000).

## Explicación.
En este ejemplo se muestra como se puede usar svelte para crear una aplicación web que se conecta a un servidor APIRest que usa el protocolo http. En este caso se usa el servidor web que se encuentra en el ejemplo [ejemplo_apirest](ejemplo_apirest). Para ello se usa un cliente apirest nativo de cada navegador (fetch) para hacer peticiones http.
[fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)

## Referencias.

[Official Svelte Tutorial](https://svelte.dev/tutorial/basics)
[Svelte.dev](https://svelte.dev/)
[Vite](https://vitejs.dev/)

