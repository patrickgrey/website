<script context="module">
  export async function preload(page) {
    const htmlPostsCount = 5;

    const pages = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/pages/?key=8f61b29cf34abca369566ed9a6`
    ).then(response => {
      return response.json();
    });

    const htmlPosts = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/?key=8f61b29cf34abca369566ed9a6&fields=id,title,url,html&limit=${htmlPostsCount}`
    ).then(response => {
      return response.json();
    });

    const posts = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/?key=8f61b29cf34abca369566ed9a6&fields=id,title,url&limit=100`
    ).then(response => {
      return response.json();
    });

    function filterPage(pagesObject) {
      const pagename = page.path != "/" ? page.path : "index";
      return pagesObject.pages.filter(i => pagename.includes(i.slug));
    }

    let combinedData = { page: {}, htmlPosts: {}, posts: {} };
    // let pagedata;

    return Promise.all([pages, htmlPosts, posts]).then(function(values) {
      combinedData["page"] = filterPage(values[0])[0];
      combinedData["htmlPosts"] = values[1];
      combinedData["posts"] = values[2];
      // pagedata = combinedData["page"];
      // console.log(combinedData["page"]);
      // console.log(
      //   combinedData["posts"].posts.splice(
      //     htmlPostsCount,
      //     combinedData["posts"].posts.length
      //   )
      // );
      // console.log(combinedData["posts"].posts);
      return combinedData;
    });
  }
</script>

<script>
  export let page;
  export let htmlPosts;
  export let posts;
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Hi</title>
</svelte:head>

<h1>{page.title}</h1>

<div class="pg-container">
  {@html page.html}
</div>
