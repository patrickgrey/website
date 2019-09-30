<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(
      `http://localhost:2368/ghost/api/v2/content/posts/slug/${params.slug}/?key=8f61b29cf34abca369566ed9a6&include=tags`
    );
    const data = await res.json();

    if (res.status === 200) {
      return { postData: data.posts[0] };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Post from "./../../components/Post.svelte";
  export let postData;
</script>

<style>

</style>

<!-- <h1>{postData.title}</h1> -->

<svelte:head>
  <title>{postData.title}</title>
</svelte:head>

<Post
  title={postData.title}
  slug={postData.slug}
  published_at={postData.published_at}
  updated_at={postData.updated_at}
  tags={postData.tags}
  html={postData.html} />
