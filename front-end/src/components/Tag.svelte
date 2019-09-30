<script>
  export let tagText;
  export let tagURL;
</script>

<style>
  .pg-tag-container {
    display: inline-block;
    margin-top: 2px;
  }

  .pg-tag {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    position: relative;
    padding: 5px 10px 5px 15px;
    background-color: #3d77a4;
    color: white;
    margin-right: 22px;
    text-decoration: none;
    font-size: 15px;
    text-transform: lowercase;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .pg-tag::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 6px;
    /* float: left; */
    width: 4px;
    height: 4px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    background: #fff;
  }

  .pg-tag::after {
    content: "";
    position: absolute;
    right: -14px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 14px solid #3d77a4;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
  }
</style>

<div class="pg-tag-container">
  <a class="pg-tag" href={tagURL}>{tagText}</a>
</div>
