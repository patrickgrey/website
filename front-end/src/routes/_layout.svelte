<script context="module">
  export async function preload(page) {
    const pages = this.fetch(
      `${process.env.SAPPER_APP_API_URL}/ghost/api/v2/content/pages/?key=${process.env.SAPPER_APP_API_KEY}`
    ).then(response => {
      return response.json();
    });

    function filterAbout(pagesObject) {
      const pagename = "about";
      return pagesObject.pages.filter(i => pagename.includes(i.slug));
    }

    let combinedData = {};

    return Promise.all([pages]).then(function(values) {
      combinedData["about"] = filterAbout(values[0])[0];
      return combinedData;
    });
  }
</script>

<script>
  // https://josebrowne.com/tutorial-static-blog-using-headless-ghost-2-0-gatsby-netlify/
  import HeaderContent from "../components/HeaderContent.svelte";
  import { tick } from "svelte";
  import { stores } from "@sapper/app";

  const { page } = stores();
  const { path } = $page;
  let currentPath = "";
  $: currentPath = $page.path;

  export let about;
</script>

<style>
  /* https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/ */
  .pg-container {
    background: black;
  }

  @media (min-width: 600px) {
    .pg-container {
      padding-top: 6em;
    }
  }

  .pg-content {
    position: relative;
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
    margin-left: 10px;
  }

  @media (min-width: 600px) {
    .pg-content {
      /* padding-top: 10px; */
      margin-left: 15vw;
    }
  }

  @media (min-width: 1024px) {
    .pg-content {
      padding-left: 4em;
    }
  }

  header {
    position: relative;
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
    margin-top: 2.5em;
  }

  @media (min-width: 600px) {
    main {
      font-size: 1.8rem;
      margin-top: 1.5em;
    }
  }

  @media (min-width: 1024px) {
    main {
      padding-right: 20px;
      border-right: 1px dashed #eee;
    }
  }

  footer {
    position: relative;
    padding: 1em 1em 4em 1em;
    color: #eee;
    min-height: 100vh;
    text-align: center;
    font-size: 1.3rem;
    max-width: 800px;
    text-align: left;
  }

  @media (min-width: 600px) {
    footer {
      /* padding-top: 10px; */
      margin-left: 15vw;
    }
  }

  @media (min-width: 1024px) {
    footer {
      padding-left: 2.5em;
    }
  }

  .pg-strapline {
    display: none;
  }

  @media (min-width: 600px) {
    .pg-strapline {
      /* display: block; */
      text-transform: lowercase;
      /* font-weight: 100; */
      position: absolute;
      top: 1em;
      right: 1em;
      margin: 0;
      padding: 0;
      color: #ccc;
    }
  }

  .pg-nav {
    position: absolute;
    right: 0.9em;
    top: 0em;
  }

  .pg-nav a {
    text-decoration: none;
    display: inline-block;
    background: #ddd;
    color: #000;
    /* text-shadow: #000 1px 1px; */
    padding: 0.5em 1em;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .pg-nav a:hover {
    background: #eee;
    text-decoration: underline;
  }

  .pg-nav a:nth-child(1) {
    margin-right: 0.25em;
  }

  @media (min-width: 983px) {
    .pg-nav {
      right: auto;
      left: 635px;
    }
  }

  .pg-nav-top {
    position: absolute;
    right: 1em;
    top: 0em;
    font-size: 0.8em;
    text-decoration: none;
    display: inline-block;
    background: #cecece;
    color: #000;
    padding: 0.5em 1em;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .pg-invisible {
    visibility: hidden;
  }
</style>

<svelte:head>
  <!-- Chrome, Firefox OS and Opera -->
  <meta name="theme-color" content="#000000" />
  <!-- Windows Phone -->
  <meta name="msapplication-navbutton-color" content="#000000" />
  <!-- iOS Safari -->
  <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
</svelte:head>

<div class="pg-container" id="top">

  <header>
    <HeaderContent />
  </header>

  <p class="pg-strapline">Making web stuff and videos since 2001</p>

  <div class="pg-content">
    <nav class="pg-nav">
      <a class={currentPath === '/' ? 'pg-invisible' : ''} href="/">home</a>
      <a href="{currentPath}#about">about</a>
    </nav>
    <main>
      <slot />
    </main>

  </div>
  <!--pg-content -->

  <footer id="about">
    <a class="pg-nav-top" href="{currentPath}#top">top</a>
    <h2>
      {@html about.title}
    </h2>
    <div>
      {@html about.html}
    </div>
    <p>&copy; The Grey Line</p>
  </footer>

</div>
