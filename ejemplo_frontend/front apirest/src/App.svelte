<script>
  /**
   * Author: @Frenzoid
   *
   * Esta app de svelte, ataca a la API de ejemplo_apirest, obtiene los datos de la persona, y los muestra en pantalla.
   */
  import { onMount } from "svelte";
  import { users, GETUsers, DELETEUsers } from "./stores/userController";
  import Persona from "./lib/Persona.svelte";

  // Variable contenedora de los datos de la persona
  let usersData = [];

  // Cuando se renderiza por primera vez, se obtienen los datos de los usuarios
  onMount(async () => {
    users.subscribe((value) => {
      usersData = value;
    });

    users.set(await GETUsers());
  });
</script>

<main class="container text-center mt-5">
  <h1>App</h1>
  <p>Este es el componente principal de la aplicación</p>
  <h2>Lista de personas</h2>

  <div class="text-start d-flex flex-row">
    {#each $users as user}
      <Persona
        name={user.name}
        age={user.age}
        id={user.id}
        deleteFunction={() => DELETEUsers(user.id)}
      />
    {/each}
  </div>

  {#if $users.length === 0}
    <p>
      No hay personas :c Has arrancado el servidor APIRest? <a
        href="https://github.com/Frenzoid/ejemplos_js/tree/master/ejemplo_apirest"
        >./ejemplo_apirest/server.js</a
      >
    </p>
  {/if}
</main>
