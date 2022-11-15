<script>
  export let name;
  export let age;
  export let id;

  export let deleteFunction;
</script>

<div class="text-start card card-body w">
  <h2>{name}</h2>
  <p>Este es el componente Persona</p>
  <p><strong>Nombre:</strong> {name}</p>
  <p><strong>Edad:</strong> {age}</p>
  <p><strong>ID:</strong> {id}</p>
  <button class="btn btn-danger" on:click={deleteFunction}> Eliminar</button>
</div>

<style>
  .card {
    max-width: 15rem;
    margin: 1rem;
  }
</style>
