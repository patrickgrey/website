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
    flex: 0 0 13%;
    min-width: 44px;
    /* order: -1; */
    background: black;
    color: white;
    border-bottom-right-radius: 5px;
    margin-right: 10px;
    transition: flex 0.3s;
  }

  @media (min-width: 768px) {
    header {
      flex: 0 0 20%;
    }
  }

  main {
    flex: 1;
    background: white;
    /* border-left: 10px solid #999; */
    border-bottom-left-radius: 5px;
    /* background: red; */
    padding: 1em 1em 6em 1em;
    /* margin-right: 0.5em; */
    /* max-width: 700px; */
    /* Could I instead use padding right and calc for this?  */
    padding-right: calc(83% - 700px);
    font-size: 1.3rem;
    font-family: Arial, Helvetica, sans-serif;

    /* background-image: url("../images/bg/bg-top-straight-rainbow.svg");
    background-repeat: no-repeat;
    background-position: -16px 0;
    background-size: 841px 173px; */
  }

  .pg-main-inner {
    margin-right: 1em;
  }

  @media (min-width: 768px) {
    main {
      font-size: 1.6rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      font-size: 1.8rem;
      padding-right: calc(83% - 900px);
    }
  }

  footer {
    min-height: 20em;
  }
</style>

<div class="pg-container">

  <div class="pg-layout">

    <header>
      <HeaderContent />
    </header>

    <main>
      <div class="pg-main-inner">
        <slot />
      </div>
    </main>

  </div>
  <!--pg-layout -->

  <footer>
    <p>&copy; Patrick Grey</p>
  </footer>

</div>
