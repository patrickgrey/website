<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(
      `${process.env.SAPPER_APP_API_URL}/ghost/api/v2/content/posts/?key=${process.env.SAPPER_APP_API_KEY}&filter=tags%3A%5B${params.slug}%5D&include=tags`
    );
    const data = await res.json();

    if (res.status === 200) {
      return { postData: data, slug: params.slug };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Post from "./../../components/Post.svelte";
  import Tag from "./../../components/Tag.svelte";
  export let postData;
  export let slug;
</script>

<style>
  .pg-search-container {
    margin: 0 0 2.5em 0;
    padding: 0.5em 1em 0.75em 1em;
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
    height: 1px;
    border: none;
    color: #ccc;
    background-color: #ccc;
    margin-top: 1.5em;
    margin-bottom: 2.5em;
  }
</style>

<!-- <h1>{postData.title}</h1> -->

<svelte:head>
  <title>Posts with the {slug} tag</title>
</svelte:head>

<div class="pg-search-container">
  <Tag
    tagText={slug + ' (' + postData.meta.pagination.total + ' posts)'}
    tagSlug={'tag/' + slug} />
</div>

<ul class="pg-posts">

  {#each postData.posts as post}
    <li>
      <Post
        title={post.title}
        slug={post.slug}
        published_at={post.published_at}
        updated_at={post.updated_at}
        tags={post.tags}
        excerpt={post.excerpt}
        hasLinks="true" />
      <hr />
    </li>
  {/each}
</ul>
