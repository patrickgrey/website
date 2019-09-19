<script>
  import HeaderContent from "../components/HeaderContent.svelte";

  // export let segment;
</script>

<style>
  /* https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/ */
  .pg-container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: #999;
  }

  .pg-layout {
    display: flex;
    flex: 1 0 0;
  }

  header {
    position: relative;
    /* 12em is the width of the column */
    flex: 0 0 20%;
    min-width: 50px;
    /* order: -1; */
    background: black;
    color: white;
    border-bottom-right-radius: 5px;
    margin-right: 10px;
  }

  main {
    flex: 1;
    background: white;
    /* border-left: 10px solid #999; */
    border-bottom-left-radius: 5px;
    /* background: red; */
  }

  footer {
  }

  /* .pg-container,
.pg-layout {
  display: flex;
  flex-direction: column;
}

header {
  order: -1;
}

@media (min-width: 768px) {
  .pg-layout {
    flex-direction: row;
    flex: 1;
  }
  main {
    flex: 1;
  }
  header {
    flex: 0 0 12em;
  }
} */
</style>

<div class="pg-container">

  <div class="pg-layout">

    <header>
      <HeaderContent />
    </header>

    <main>
      <slot />
    </main>

  </div>
  <!--pg-layout -->

  <footer>
    <p>&copy; Patrick Grey</p>
  </footer>

</div>
