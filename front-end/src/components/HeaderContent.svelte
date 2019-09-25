<style>
  h1 {
    width: 100vh;
    position: absolute;
    right: 0.2em;
    top: -1em;
    padding: 0;
    margin: 0;
    text-align: right;
    font-size: 4vh;
    transform-origin: bottom right;
    transform: rotate(-90deg);
    color: #999;
    /* background: rgb(153, 153, 153); */
    background: linear-gradient(
      179deg,
      rgba(153, 153, 153, 0) 0%,
      rgba(153, 153, 153, 0) 43%,
      rgba(153, 153, 153, 0.2) 45%,
      rgba(153, 153, 153, 0.2) 55%,
      rgba(153, 153, 153, 0) 57%,
      rgba(153, 153, 153, 0) 100%
    );
    background-position: bottom 0.1vh right -85.5vh;
    background-repeat: no-repeat;
    transition: font-size 0.3s, background-position 0.3s;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 7vh;
      background-position: bottom -0.3vh right -55vh;
    }
  }
</style>

<h1>The Grey Line</h1>
