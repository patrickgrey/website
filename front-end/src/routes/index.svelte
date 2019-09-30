<script context="module">
  export async function preload(page) {
    const htmlPostsCount = 3;

    const pages = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/pages/?key=8f61b29cf34abca369566ed9a6`
    ).then(response => {
      return response.json();
    });

    const htmlPosts = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/?key=8f61b29cf34abca369566ed9a6&include=tags&fields=id,title,published_at,updated_at,url,excerpt&formats=plaintext&limit=${htmlPostsCount}`
    ).then(response => {
      return response.json();
    });

    const posts = this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/?key=8f61b29cf34abca369566ed9a6&include=tags&fields=id,title,published_at,updated_at,url&limit=100`
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
  import DatePublished from "./../components/DatePublished.svelte";
  import Tag from "./../components/Tag.svelte";

  export let page;
  export let htmlPostsData;
  export let postsData;
  export let htmlPostsCount;
  const noHtmlPosts = postsData.posts.slice(htmlPostsCount);

  function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString("en-GB");
  }

  function formatDate(dateString) {
    return new Date(dateString).toDateString();
  }

  // formatDates();
</script>

<style>
  .pg-search-container {
    margin: 0 0 2.5em 0;
    padding: 1em;
    background: #eee;
    border-radius: 5px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
      0 16px 16px rgba(0, 0, 0, 0.12);
  }

  .pg-posts {
    list-style: none;
    margin: 0;
    margin-top: 1.5em;
    padding: 0;
  }

  .pg-posts li {
    margin-bottom: 0.3em;
  }

  .pg-post-link {
    position: relative;
    text-decoration: none;
    color: black;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.5em;
    color: #666666;
    display: inline-block;
    line-height: 1em;
  }

  .pg-post-excerpt-long::after {
    content: "";
    display: inline-block;
    margin-left: -60px;
    width: 60px;
    height: 1em;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 80%
    );
  }

  hr {
    height: 1px;
    border: none;
    color: #ccc;
    background-color: #ccc;
    margin-top: 1.5em;
    margin-bottom: 2.5em;
  }

  .pg-tags {
    margin: 0 0 1.5em 0;
  }
</style>

<svelte:head>
  <title>{page.title}</title>
  <meta
    name="Description"
    content="The Grey Line: web and video development studio." />
</svelte:head>

<!-- <div class="pg-search-container">
  {@html page.html}
</div> -->

<ul class="pg-posts">

  {#each htmlPostsData.posts as htmlpost}
    <li>
      <a class="pg-post-link" href={htmlpost.url}>
        <h2>{htmlpost.title}</h2>
        <DatePublished
          dateStringPublished={htmlpost.published_at}
          dateStringUpdated={htmlpost.updated_at} />
      </a>
      <div class="pg-tags">
        {#each htmlpost.tags as tag}
          <Tag tagText={tag.name} tagURL={tag.url} />
        {/each}
      </div>

      <a class="pg-post-link" href={htmlpost.url}>
        <div
          class="pg-post-excerpt {htmlpost.excerpt.length > 200 ? 'pg-post-excerpt-long' : ''}">
          {@html htmlpost.excerpt.substring(0, 200)}
        </div>
      </a>

      <hr />
    </li>
  {/each}

  {#each noHtmlPosts as post}
    <li>
      <a class="pg-post-link" href={post.url}>
        <h2>{post.title}</h2>
        <DatePublished
          dateStringPublished={post.published_at}
          dateStringUpdated={post.updated_at} />
      </a>
      <div class="pg-tags">
        {#each post.tags as tag}
          <Tag tagText={tag.name} tagURL={tag.url} />
        {/each}
      </div>

      <hr />
    </li>
  {/each}
</ul>
