<script>
  export let dateStringPublished;
  export let dateStringUpdated;

  function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString("en-GB");
  }

  function formatDate(dateString) {
    return new Date(dateString).toDateString();
  }
</script>

<style>
  .pg-dates {
    /* font-family: "Roboto", Arial, Helvetica, sans-serif; */
    font-size: 0.7em;
    color: #999;
    text-transform: uppercase;
  }

  .pg-dates p {
    margin: 0;
    margin-bottom: 0.2em;
  }
</style>

<div class="pg-dates">
  {#if new Date(dateStringUpdated) > new Date(dateStringPublished)}
    <p>
      Published: 📅&nbsp;{formatDate(dateStringPublished)} ⌚&nbsp;{formatTime(dateStringPublished)}
    </p>
    <p>
      (Updated: {formatDate(dateStringUpdated)} {formatTime(dateStringUpdated)})
    </p>
  {:else}
    <p>
      Published: 📅&nbsp;{formatDate(dateStringPublished)} ⌚&nbsp;{formatTime(dateStringPublished)}
    </p>
  {/if}
</div>
