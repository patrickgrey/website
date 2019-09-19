<script>
  // import Nav from '../components/Nav.svelte';

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
    flex: 1;
  }

  header {
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
    background: red;
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
      <h1>The Grey line</h1>
      <!-- <button>About</button>
      <div class="pg-about">
        <p>
          I'm Patrick Grey. I develop websites, applications and motion graphic
          videos.
        </p>
      </div> -->
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
