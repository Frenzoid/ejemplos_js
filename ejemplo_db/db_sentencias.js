/**
 * Author: @Frenzoid
 */
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
const sequelize = new Sequelize("postgres://root:root@localhost:5432/root");

/**
 * Creamos un modelo de datos, que es una tabla en la base de datos.
 * El primer parametro es el nombre de la tabla, el segundo es un objeto con los campos de la tabla.
 * 
 * https://sequelize.org/docs/v6/core-concepts/model-basics/
 * */
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


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
     * Creamos un usuario, la función create devuelve el usuario recien creado, es como hacer un insert y un select del mismo dato.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-instances/#a-very-useful-shortcut-the-create-method
     * */
    const user = await User.create({ name: "Frenzoid", age: 26 });
    console.log("Usuario creado:", user.dataValues);

    /**
     * Buscamos un usuario por su id, la función findByPk devuelve el usuario encontrado por su clave primaria.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findbypk
     * */
    const userFound = await User.findByPk(user.id);
    console.log("Usuario encontrado:", userFound.dataValues);

    /**
     * Buscamos un usuario por su nombre, la función findOne devuelve el primer usuario encontrado.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone
     * */
    const userFoundByName = await User.findOne({ where: { name: "Frenzoid" } });
    console.log("Usuario encontrado por nombre:", userFoundByName.dataValues);

    /**
     * Buscamos todos los usuarios, la función findAll devuelve un array con todos los usuarios de la tabla Users.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findall
     * */
    const users = await User.findAll();
    console.log("Usuarios encontrados:", users);

    /**
     * Actualizamos un usuario, la función update actualiza los campos del usuario.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
     * */
    const updatedUser = await user.update({ name: "Ghostman", age: 27 });
    console.log("Usuario actualizado:", updatedUser.dataValues);

    /**
     * Eliminamos un usuario, la función destroy elimina el usuario de la base de datos.
     * 
     * https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-delete-queries
     * */
    await user.destroy();
    console.log("Usuario eliminado.");


  } catch (exception) {
    // Mostramos toda la excepción en caso de que haya algún error.
    console.error(exception);
    process.exit(1);
  }
}

// Llamamos a la función asincrona que acabamos de crear.
HazMasCosasEnLaBaseDeDatos();