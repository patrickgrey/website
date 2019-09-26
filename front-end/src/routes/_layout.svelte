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

  @media (min-width: 600px) {
    .pg-container {
      padding-top: 2em;
    }
  }

  .pg-content {
    background: white;
    border-top: solid 10px transparent;
    border-left: solid 10px transparent;
    border-bottom: solid 10px transparent;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-image: linear-gradient(white, white),
      linear-gradient(
        85deg,
        rgba(153, 153, 153, 1) 0%,
        rgba(153, 153, 153, 1) 60%,
        rgba(239, 250, 0, 1) 65%,
        rgba(255, 153, 0, 1) 75%,
        rgba(255, 80, 60, 1) 80%,
        rgba(255, 151, 252, 1) 85%,
        rgba(112, 220, 255, 1) 90%,
        rgba(51, 190, 0, 1) 95%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    /* border: 10px solid #999;
    border-left: 10px solid #999;
    border-image: linear-gradient(
        to right,
        rgba(153, 153, 153, 1) 0%,
        rgba(153, 153, 153, 1) 25%,
        rgba(239, 250, 0, 1) 35%,
        rgba(255, 153, 0, 1) 45%,
        rgba(255, 80, 60, 1) 55%,
        rgba(255, 151, 252, 1) 65%,
        rgba(112, 220, 255, 1) 75%,
        rgba(51, 190, 0, 1) 85%,
        rgba(153, 153, 153, 1) 95%
      )
      1 1;
    border-top-left-radius: 20px; */
    padding: 1em 1em 4em 1em;
  }

  @media (min-width: 600px) {
    .pg-content {
      /* padding-top: 10px; */
      margin-left: 15vw;
    }
  }

  @media (min-width: 1024px) {
    .pg-content {
      padding-left: 2.5em;
    }
  }

  header {
    padding: 0.45em 0;
    text-align: center;
  }

  @media (min-width: 600px) {
    header {
      position: absolute;
      top: 0;
      left: 0;
      width: 15vw;
    }
  }

  main {
    font-size: 1.3rem;
    max-width: 800px;
  }

  @media (min-width: 1024px) {
    main {
      font-size: 1.8rem;
      margin-top: 1em;
    }
  }

  footer {
    color: #999;
    min-height: 20em;
    text-align: center;
  }

  .pg-strapline {
    display: none;
  }

  @media (min-width: 600px) {
    .pg-strapline {
      display: block;
      text-transform: lowercase;
      position: absolute;
      top: 0.25em;
      right: 1em;
      margin: 0;
      padding: 0;
      color: #ccc;
    }
  }
</style>

<div class="pg-container">

  <header>
    <HeaderContent />
  </header>

  <p class="pg-strapline">Making web stuff and videos since 2001</p>

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
