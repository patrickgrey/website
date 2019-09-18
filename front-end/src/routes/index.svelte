<script context="module">
  export async function preload(page) {
    const htmlPostsCount = 3;

    const pages = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/pages/?key=8f61b29cf34abca369566ed9a6`
    ).then(response => {
      return response.json();
    });

    const htmlPosts = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/?key=8f61b29cf34abca369566ed9a6&fields=id,title,url,excerpt&formats=plaintext&limit=${htmlPostsCount}`
    ).then(response => {
      console.log(response);
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

    let combinedData = { page: {}, htmlPostsData: {}, postsData: {} };
    // let pagedata;

    return Promise.all([pages, htmlPosts, posts]).then(function(values) {
      combinedData["page"] = filterPage(values[0])[0];
      combinedData["htmlPostsData"] = values[1];
      combinedData["postsData"] = values[2];
      combinedData["htmlPostsCount"] = htmlPostsCount;
      // .posts.splice(
      //   htmlPostsCount,
      //   values[2].posts.length
      // );
      // console.log(
      //   values[2].posts.splice(htmlPostsCount, values[2].posts.length)
      // );

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
  export let htmlPostsData;
  export let postsData;
  export let htmlPostsCount;
  const noHtmlPosts = postsData.posts.slice(htmlPostsCount);
  console.log(htmlPostsData);
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
  <title>{page.title}</title>
</svelte:head>

<h1>{page.title}</h1>

<div class="pg-container">
  {@html page.html}
</div>

<ul>

  {#each htmlPostsData.posts as htmlpost}
    <li>
      <p>{htmlpost.title}</p>
      <p>
        {@html htmlpost.excerpt}
        ...
      </p>
    </li>
  {/each}

  {#each noHtmlPosts as post}
    <li>
      <p>{post.title}</p>
    </li>
  {/each}
</ul>
