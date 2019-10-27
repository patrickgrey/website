<style>
  @keyframes spin {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(720deg);
    }
  }

  h1 {
    position: relative;
    display: inline-block;
    padding: 0;
    margin: 0;
    font-size: 2em;
    font-family: "Header", Georgia, "Times New Roman", Times, serif;
    color: #999;
  }

  h1::after {
    content: "";
    display: inline-block;
    position: absolute;
    right: -0.65em;
    top: 0;
    width: 0.5em;
    height: 0.5em;
    background: url("../images/logo/tgl-logo-v1.png");
    background-size: 100%;
    animation: spin 2s ease-in-out;
  }

  @media (min-width: 600px) {
    h1 {
      width: 100vh;

      position: absolute;
      right: 0.25em;
      top: -0em;
      padding: 0;
      margin: 0;
      text-align: right;
      font-size: 2.4em;
      transform-origin: bottom right;
      transform: rotate(-90deg);
    }
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 3.8em;
      top: -0.25em;
    }
  }

  @supports (mix-blend-mode: lighten) {
    h1 {
      background: #000;
      color: white;
      mix-blend-mode: lighten;
    }

    @media (min-width: 600px) {
      h1 {
        width: max-content;
      }
    }

    h1::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(153, 153, 153, 1) 0%,
        rgba(153, 153, 153, 1) 60%,
        rgba(239, 250, 0, 1) 65%,
        rgba(255, 153, 0, 1) 75%,
        rgba(255, 80, 60, 1) 80%,
        rgba(255, 151, 252, 1) 85%,
        rgba(112, 220, 255, 1) 90%,
        rgba(51, 190, 0, 1) 95%
      );
      mix-blend-mode: multiply;
      border: 1px solid black;
    }
  }
</style>

<h1>
  <!-- <img src="images/logo/tgl-logo-v1.png" alt="The Grey Line logo" /> -->
  The Grey Line
</h1>
