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

    let combinedData = {};

    return Promise.all([pages, htmlPosts, posts]).then(function(values) {
      combinedData["page"] = filterPage(values[0])[0];
      combinedData["htmlPostsData"] = values[1];
      combinedData["postsData"] = values[2];
      combinedData["htmlPostsCount"] = htmlPostsCount;
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
</script>

<style>
  h1 {
    margin-top: 0;
  }
</style>

<svelte:head>
  <title>{page.title}</title>
  <meta
    name="Description"
    content="Patrick Grey: web and video developer, international man of
    mystery!" />
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
