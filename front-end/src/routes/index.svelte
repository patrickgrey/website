<script context="module">
  export async function preload(page) {
    const htmlPostsCount = 3;

    const pages = this.fetch(
      `${process.env.SAPPER_APP_API_URL}/ghost/api/v2/content/pages/?key=${process.env.SAPPER_APP_API_KEY}`
    ).then(response => {
      return response.json();
    });

    const htmlPosts = this.fetch(
      `${process.env.SAPPER_APP_API_URL}/ghost/api/v2/content/posts/?key=${process.env.SAPPER_APP_API_KEY}&include=tags&fields=id,title,published_at,updated_at,slug,excerpt&formats=plaintext&limit=${htmlPostsCount}`
    ).then(response => {
      return response.json();
    });

    const posts = this.fetch(
      `${process.env.SAPPER_APP_API_URL}/ghost/api/v2/content/posts/?key=${process.env.SAPPER_APP_API_KEY}&include=tags&fields=id,title,published_at,updated_at,slug&limit=100`
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
  import Post from "./../components/Post.svelte";

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
</script>

<style>
  /* .pg-search-container {
    margin: 0 0 2.5em 0;
    padding: 1em;
    background: #eee;
    border-radius: 5px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
      0 16px 16px rgba(0, 0, 0, 0.12);
  } */

  .pg-posts {
    list-style: none;
    margin: 0;
    margin-top: 1.5em;
    padding: 0;
  }

  @media (min-width: 600px) {
    .pg-posts {
      margin-top: 0;
    }
  }

  .pg-posts li {
    margin-bottom: 0.3em;
  }

  @media (min-width: 1024px) {
    .pg-posts li {
      position: relative;
      pointer-events: none;
    }

    .pg-posts li::before,
    .pg-posts li::after {
      content: "";
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .pg-posts li::before {
      box-shadow: 0 -1px 1px -2px rgba(0, 0, 0, 0.22),
        0 -2px 2px -4px rgba(0, 0, 0, 0.22), 0 -4px 4px -6px rgba(0, 0, 0, 0.22),
        0 -8px 8px -10px rgba(0, 0, 0, 0.22),
        0 -16px 16px -18px rgba(0, 0, 0, 0.22);
    }
    .pg-posts li::after {
      box-shadow: 0 1px 1px -2px rgba(0, 0, 0, 0.22),
        0 2px 2px -4px rgba(0, 0, 0, 0.22), 0 4px 4px -6px rgba(0, 0, 0, 0.22),
        0 8px 8px -10px rgba(0, 0, 0, 0.22),
        0 16px 16px -18px rgba(0, 0, 0, 0.22);
    }

    .pg-posts li:hover::after,
    .pg-posts li:hover::before {
      opacity: 1;
    }
  }

  hr {
    border: 0 none;
    border-top: 1px dashed #ccc;
    margin-top: 1.5em;
    margin-bottom: 2.5em;
  }
</style>

<svelte:head>
  <title>The Grey Line: {page.title}</title>
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
      <Post
        title={htmlpost.title}
        slug={htmlpost.slug}
        published_at={htmlpost.published_at}
        updated_at={htmlpost.updated_at}
        tags={htmlpost.tags}
        excerpt={htmlpost.excerpt}
        hasLinks="true" />
      <hr />
    </li>
  {/each}

  {#each noHtmlPosts as post}
    <li>
      <Post
        title={post.title}
        slug={post.slug}
        published_at={post.published_at}
        updated_at={post.updated_at}
        tags={post.tags}
        hasLinks="true" />
      <hr />
    </li>
  {/each}
</ul>
