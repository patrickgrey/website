<script>
  import DatePublished from "./../components/DatePublished.svelte";
  import Tag from "./../components/Tag.svelte";

  export let title;
  export let url;
  export let published_at;
  export let updated_at;
  export let tags;
  export let excerpt = "";

  // console.log(excerpt);
</script>

<style>
  li {
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

<li>
  <a class="pg-post-link" href={url}>
    <h2>{title}</h2>
    <DatePublished
      dateStringPublished={published_at}
      dateStringUpdated={updated_at} />
  </a>
  <div class="pg-tags">
    {#each tags as tag}
      <Tag tagText={tag.name} tagURL={tag.url} />
    {/each}
  </div>
  {#if excerpt}
    <a class="pg-post-link" href={url}>
      <div
        class="pg-post-excerpt {excerpt.length > 200 ? 'pg-post-excerpt-long' : ''}">
        {@html excerpt.substring(0, 200)}
      </div>
    </a>
  {/if}

  <hr />
</li>
