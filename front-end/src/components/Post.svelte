<script>
  import DatePublished from "./../components/DatePublished.svelte";
  import Tag from "./../components/Tag.svelte";

  export let title;
  export let slug;
  export let published_at;
  export let updated_at;
  export let tags;
  export let excerpt = "";
  export let html = "";
  export let hasLinks = false;
</script>

<style>
  .pg-post-link {
    position: relative;
    text-decoration: none;
    color: black;
    pointer-events: auto;
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

  h2 {
    margin: 0;
    margin-bottom: 0.5em;
    color: #666666;
    display: inline-block;
    line-height: 1em;
  }

  .pg-tags {
    margin: 0 0 1.5em 0;
  }
</style>

{#if hasLinks}
  <a class="pg-post-link" href="blog/{slug}">
    <h2>{title}</h2>
    <DatePublished
      dateStringPublished={published_at}
      dateStringUpdated={updated_at} />
  </a>
{:else}
  <h2>{title}</h2>
  <DatePublished
    dateStringPublished={published_at}
    dateStringUpdated={updated_at} />
{/if}
<div class="pg-tags">
  {#each tags as tag}
    <Tag tagText={tag.name} tagSlug="tag/{tag.slug}" />
  {/each}
</div>
{#if excerpt && excerpt != ''}
  <a class="pg-post-link" href="blog/{slug}">
    <div
      class="pg-post-excerpt {excerpt.length > 200 ? 'pg-post-excerpt-long' : ''}">
      {@html excerpt.substring(0, 200)}
    </div>
  </a>
{/if}
{#if html && html != ''}
  <div class="pg-html">
    {@html html}
  </div>
{/if}
