## Dependencias.

Para arrancar el siguiente ejemplo es necesario tener instalado node y npm.
Para instalarlos en ubuntu se puede hacer con el siguiente comando:

    sudo apt-get install nodejs npm

## Ejecución.

Primero hay que instalar las dependencias del proyecto con el siguiente comando ( ejecutado dentro de la carpeta del proyecto ):

    npm i


Y despues en una terminal:

    node db.js

## Explicación.

El ejemplo muestra una conexión con un servidor de bases de datos ( postgres, [pero puede ser de cualquier tipo](https://sequelize.org/docs/v6/getting-started/) ), donde se conecta a una base de datos, crea una tabla, inserta un registro, lo busca, lo lee y lo borra.

Se usa una libreria [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) llamada [Sequelize](https://sequelize.org/) para hacer la conexión con la base de datos y hacer las operaciones de manera extremadamente sencilla.

## Referencias.

[Node.js](https://nodejs.org/es/)
[Sequelize](https://sequelize.org/)
[Postgres](https://www.postgresql.org/)