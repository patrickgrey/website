<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/?key=8f61b29cf34abca369566ed9a6&filter=tags%3A%5B${params.slug}%5D&include=tags`
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
  console.log(postData.meta);
</script>

<style>
  .pg-search-container {
    margin: 0 0 2.5em 0;
    padding: 0.5em 1em;
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
  <p>
    {postData.meta.pagination.total} posts with the
    <Tag class="pg-tag-inline" tagText={slug} />
    tag
  </p>
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
        hasLinks="true" />
      <hr />
    </li>
  {/each}
</ul>
