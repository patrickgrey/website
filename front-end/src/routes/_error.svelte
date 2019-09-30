<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>

</style>

<svelte:head>
  <title>
    {status === 404 ? "404: Sorry that page doesn't exist!" : status}
  </title>
</svelte:head>

<h1>{status === 404 ? "404: Sorry that page doesn't exist!" : status}</h1>

<p>
  You can search through all our content by returnin to the
  <a href="/">Home Page</a>
  , thank you.
</p>

<p>Error message: {error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
