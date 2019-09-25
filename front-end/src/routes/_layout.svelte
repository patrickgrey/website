<script>
  import HeaderContent from "../components/HeaderContent.svelte";
  import { tick } from "svelte";

  async function action1() {
    await tick();

    // 1010.517822265625
  }

  action1();

  // export let segment;
</script>

<style>
  /* https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/ */
  .pg-container {
    background: black;
  }

  .pg-content {
    background: white;
    border-top: 10px solid #999;
    border-left: 10px solid #999;
    border-top-left-radius: 20px;
    padding: 1em 1em 4em 1em;
  }

  header {
    padding: 0.45em 0;
    text-align: center;
  }

  @media (min-width: 600px) {
    header {
      position: relative;
      /* 12em is the width of the column */
      flex: 0 0 13%;
      min-width: 44px;
      /* order: -1; */
      background: black;
      color: white;
      border-bottom-right-radius: 5px;
      margin-right: 10px;
      transition: flex 0.3s;
    }
  }

  main {
    font-size: 1.3rem;
    max-width: 800px;
  }

  @media (min-width: 768px) {
    main {
      font-size: 1.6rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      font-size: 1.8rem;
    }
  }

  footer {
    border-top: solid 12px #999;
    border-left: solid 10px #999;
    background: #eee;
    min-height: 20em;
  }
</style>

<div class="pg-container">

  <header>
    <HeaderContent />
  </header>

  <div class="pg-content">

    <main>
      <slot />
    </main>

  </div>
  <!--pg-content -->

  <footer>
    <p>&copy; Patrick Grey</p>
  </footer>

</div>
