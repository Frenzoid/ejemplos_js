/**
 * Author: @Frenzoid
 */

// Importamos md5, un algoritmo ( deprecado ) de generación de hashes, si no sabes que es un hash, atiende más a clase o buscalo en google.
// IMPORTANTE: Usaremos este algoritmo para encriptar las contraseñas, y así evitar guardarlas en texto plano en la base de datos.
// https://www.npmjs.com/package/md5
const md5 = require("md5");

// Importamos la libreria reader para leer desde la consola.
const reader = require("read-console");

// De la libreria Sequelize, nos traemos el objeto Sequelize y DataTypes.
const { Sequelize, DataTypes } = require("sequelize");

/**
 * Creamos una instancia de sequelize, que nos permitira interactuar con la base de datos.
 * new Sequelize("dialecto://usuario:contraseña@host:puerto/nombre_base_de_datos");
 * El dialecto es el tipo de base de datos que vamos a usar, en este caso es postgres.
 * 
 * https://sequelize.org/docs/v6/getting-started/
 * */
const sequelize = new Sequelize("postgres://root:root@oldbox.cloud:5432/root");

/**
 * Creamos un modelo de datos, que es una tabla en la base de datos.
 * El primer parametro es el nombre de la tabla, el segundo es un objeto con los campos de la tabla.
 * 
 * https://sequelize.org/docs/v6/core-concepts/model-basics/
 * */
const User = sequelize.define("User", {
  // El campo id es un campo autoincremental, que se genera automaticamente.
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // El campo name es un campo de texto, que no puede ser nulo.
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    validate: {
      // El campo email tiene una validacion, que es que el email introducido sea un email valido, y unico en la DB.
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      unique: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // El campo age es un campo de numero entero, que no puede ser nulo.
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      // Para comprobar minimos y máximos, podemos usar la validacion min y max.
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations
      max: 100,
      min: 0,
    },
  },
  x: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      // O, se pueden definir funciones que se ejecutan para realizar validaciones PROPRIAS, con mensajes de error personalizados.
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      esMayorQue19(value) {
        if (value >= 20) throw new Error("La coordenada X debe ser menor o igual a 20");
      },
      esMenoQue0(value) {
        if (value < 0) throw new Error("La coordenada X debe ser mayor o igual a 0");
      },
    },
  },
  y: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      // O, se pueden definir funciones que se ejecutan para realizar validaciones PROPRIAS, con mensajes de error personalizados.
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      esMayorQue19(value) {
        if (value >= 20) throw new Error("La coordenada Y debe ser menor o igual a 20");
      },
      esMenoQue0(value) {
        if (value < 0) throw new Error("La coordenada Y debe ser mayor o igual a 0");
      },
    },
  },
},
  // Los Hooks son triggers ( lo que habeis visto en DBD ), funciones que se ejecutan antes o despues de realizar una accion en la base de datos.
  {
    hooks: {
      beforeUpdate: async (user) => {
        // Si el usuario ha cambiado la contraseña, la encriptamos.
        if (user.changed("password")) user.password = md5(user.password);
      },
      beforeCreate: async (user) => {
        // Cuando el usuario se crea, encriptamos la contraseña.
        user.password = md5(user.password);
      },
    },
  },
);


/**
 * Definimos una funcion asincrona, que nos permitira interactuar con la base de datos usando async/await.
 * 
 * https://javascript.info/async-await
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function
 * */
async function HazMasCosasEnLaBaseDeDatos() {
  try {

    /**
     *  Conectamos a la base de datos.
     * 
     * https://sequelize.org/docs/v6/getting-started/#testing-the-connection
     * */
    await sequelize.authenticate();
    console.log("Conectado a la base de datos.");

    /**
     * Inicializamos la base de datos, esto crea la tabla en la base de datos basado en el modelo (User) definido más arriba.
     * Si la tabla ya existe, no hace nada, pero si ponemos la opcion force: true, la borra y la crea de nuevo.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
     * */
    await User.sync({ force: true });
    console.log("Tabla creada.");

    /**
     * Vamos a añadir un usuario personalizado :)
     * Primero, vamos a pedir los datos.
     * 
     * Prueba a añadir un usuario con un x = 100 o una edad negativa :)
     */
    const name = await consoleRead("Introduce tu nombre: ");
    const age = await consoleRead("Introduce tu edad: ");
    const x = await consoleRead("Introduce la coordenada x: ");
    const y = await consoleRead("Introduce la coordenada y: ");
    const password = await consoleRead("Introduce tu contraseña: ");

    /**
     * Creamos un usuario con los datos introducidos.
     * MIRAR db_sentencias.js PARA VER MÁS EJEMPLOS.
     */
    const user = await User.create({ name, age, x, y, password });
    console.log("Usuario creado:", user.dataValues);
    process.exit(0);

  } catch (exception) {

    // Para no llenar la consola, vamos a mostrar por consola solo los mensajes de error.
    exception.errors.forEach(error => {
      console.error(error.type, error.message);
    });

    process.exit(1);
  }
}

// Funcion que lee por consola y devuelve el valor introducido. ( En este caso, hemos convertido una funcion callback en una funcion asincrona ( promesa ). )
async function consoleRead(msg) {
  return new Promise((resolve) => {
    reader.read(msg, (answer) => {
      resolve(answer);
    });
  });
}



// Llamamos a la función asincrona que acabamos de crear.
HazMasCosasEnLaBaseDeDatos();

/**
 * Exportamos el modelo User, para poder usarlo en otros archivos.
 * 
 * Eje: En otro archivo: const { User } = require("./db.js");
 * 
 * https://nodejs.org/api/modules.html#modules_module_exports
 * */
module.exports = { User };
