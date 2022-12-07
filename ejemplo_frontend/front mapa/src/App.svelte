<script>
  // Matrix 20 x 20
  let matrix = [];

  for (let i = 0; i < 20; i++) {
    matrix[i] = [];
    for (let j = 0; j < 20; j++) {
      matrix[i][j] = {
        bgcolor: "grey",
        content: `${i},${j}`,
        name: "name",
        x: i,
        y: j,
      };
    }
  }
</script>

<main>
  <!-- Renderiza matriz 20 x 20, interactuable ( cuando aprietas encima de una celda, esta cambia de color ) -->
  {#each matrix as row}
    <div class="d-flex flex-row justify-center">
      {#each row as cell}
        <div
          class="cell"
          style="background-color: {cell.bgcolor}"
          on:click={() => (cell.bgcolor = "white")}
          on:keypress={() => (cell.bgcolor = "white")}
        >
          {cell.content}
        </div>
      {/each}
    </div>
  {/each}
</main>

<style>
  .cell {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    margin: 5px;
    min-width: 30px;
    min-height: 30px;
  }
</style>
