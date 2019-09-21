<script>
  import HeaderContent from "../components/HeaderContent.svelte";
  import { tick } from "svelte";

  async function action1() {
    await tick();

    // 1010.517822265625
  }

  action1();

  // export let segment;
</script>

<style>
  /* https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/ */
  .pg-container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: #999;
  }

  .pg-layout {
    display: flex;
    flex: 1 0 0;
  }

  header {
    position: relative;
    /* 12em is the width of the column */
    flex: 0 0 13%;
    min-width: 44px;
    /* order: -1; */
    background: black;
    color: white;
    border-bottom-right-radius: 5px;
    margin-right: 10px;
    transition: flex 0.3s;
  }

  @media (min-width: 768px) {
    header {
      flex: 0 0 20%;
    }
  }

  main {
    flex: 1;
    background: white;
    /* border-left: 10px solid #999; */
    border-bottom-left-radius: 5px;
    /* background: red; */
    padding: 0 1em 6em 1em;
    /* max-width: 700px; */
    /* Could I instead use padding right and calc for this?  */
    padding-right: calc(83% - 700px);
    font-size: 1.3rem;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (min-width: 768px) {
    main {
      font-size: 1.6rem;
    }
  }

  @media (min-width: 1024px) {
    main {
      font-size: 1.8rem;
      padding-right: calc(83% - 900px);
    }
  }

  footer {
  }

  #bg-top {
    /* height: 173px; */
    /* width: 841px; */
  }

  #bg-top-container {
    width: 100%;
    /* min-width: 841px; */
    margin-left: -1.05em;
    overflow-x: hidden;
    /* position: absolute;
    top: 0;
    left: calc(13% + 10px);
    overflow: hidden; */
    /* width: calc(100% - 13% - 10px); */
    /* No, need to calculate by height and have overflow */
  }

  @media (min-width: 768px) {
    #bg-top-container {
      /* left: calc(20% + 10px); */
      /* width: calc(100% - 20% - 10px); */
    }
  }

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash 2s ease-in-out forwards;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>

<div class="pg-container">

  <div class="pg-layout">

    <header>
      <HeaderContent />
    </header>

    <main>
      <div id="bg-top-container">
        <svg
          id="bg-top"
          data-name="bg-top"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 841 173">
          <defs>
            <linearGradient
              id="linear-red"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba(255, 0, 0, 1)" />
              <stop offset="0.60" stop-color="rgba(255, 0, 0, 1)" />
              <stop offset="0.92" stop-color="rgba(255, 0, 0, 0)" />
              <stop offset="1" stop-color="rgba(255, 0, 0, 0)" />
            </linearGradient>
            <linearGradient
              id="linear-orange"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba(255, 127, 0, 1)" />
              <stop offset="0.60" stop-color="rgba(255, 127, 0, 1)" />
              <stop offset="0.92" stop-color="rgba(255, 127, 0, 0)" />
              <stop offset="1" stop-color="rgba(255, 127, 0, 0)" />
            </linearGradient>
            <linearGradient
              id="linear-yellow"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba(255, 255, 0, 1)" />
              <stop offset="0.60" stop-color="rgba(255, 255, 0, 1)" />
              <stop offset="0.92" stop-color="rgba(255, 255, 0, 0)" />
              <stop offset="1" stop-color="rgba(255, 255, 0, 0)" />
            </linearGradient>
            <linearGradient
              id="linear-green"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba(0, 255, 0, 1)" />
              <stop offset="0.60" stop-color="rgba(0, 255, 0, 1)" />
              <stop offset="0.92" stop-color="rgba(0, 255, 0, 0)" />
              <stop offset="1" stop-color="rgba(0, 255, 0, 0)" />
            </linearGradient>
            <linearGradient
              id="linear-blue"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba(0, 0, 255, 1)" />
              <stop offset="0.60" stop-color="rgba(0, 0, 255, 1)" />
              <stop offset="0.92" stop-color="rgba(0, 0, 255, 0)" />
              <stop offset="1" stop-color="rgba(0, 0, 255, 0)" />
            </linearGradient>
            <linearGradient
              id="linear-indigo"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba( 75, 0, 130, 1)" />
              <stop offset="0.60" stop-color="rgba( 75, 0, 130, 1)" />
              <stop offset="0.92" stop-color="rgba( 75, 0, 130, 0)" />
              <stop offset="1" stop-color="rgba( 75, 0, 130, 0)" />
            </linearGradient>
            <linearGradient
              id="linear-violet"
              x1="-42"
              y1="113.73"
              x2="844"
              y2="113.73"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#999" />
              <stop offset="0.06" stop-color="#999" />
              <stop offset="0.15" stop-color="rgba( 148, 0, 211, 1)" />
              <stop offset="0.60" stop-color="rgba( 148, 0, 211, 1)" />
              <stop offset="0.92" stop-color="rgba( 148, 0, 211, 0)" />
              <stop offset="1" stop-color="rgba( 148, 0, 211, 0)" />
            </linearGradient>
          </defs>
          <title>Top decoration animation</title>
          <path
            class="path"
            id="bg-top-path-1"
            stroke="url(#linear-violet)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,86.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,54,666.34,140.53,839,147.88" />
          <path
            class="path"
            id="bg-top-path-2"
            stroke="url(#linear-indigo)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,76.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,44,666.34,130.53,839,137.88" />
          <path
            class="path"
            id="bg-top-path-3"
            stroke="url(#linear-blue)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,76.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,44,666.34,130.53,839,137.88" />
          <path
            class="path"
            id="bg-top-path-4"
            stroke="url(#linear-green)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,66.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,34,666.34,120.53,839,127.88" />
          <path
            class="path"
            id="bg-top-path-5"
            stroke="url(#linear-yellow)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,56.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,24,666.34,110.53,839,117.88" />
          <path
            class="path"
            id="bg-top-path-6"
            stroke="url(#linear-orange)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,46.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,14,666.34,100.53,839,107.88" />
          <path
            class="path"
            id="bg-top-path-7"
            stroke="url(#linear-red)"
            stroke-width="10"
            fill="none"
            stroke-linecap="round"
            d="M-37,36.18c12.18-.56,12.18,24.9,25.48,25.47,14.58.62,14.58-27.3,30.65-28,17.79-.81,17.79,30.1,37.6,31,22.18.94,22.18-33.68,47.19-34.83,28.42-1.3,28.42,38.05,61,39.44,37.71,1.6,37.71-43.95,81.89-46,52.46-2.4,52.46,51.69,115.76,54.39,77.91,3.32,77.91-63.25,176.12-67.74C666.34,4,666.34,90.53,839,97.88" />
        </svg>
      </div>
      <slot />
    </main>

  </div>
  <!--pg-layout -->

  <footer>
    <p>&copy; Patrick Grey</p>
  </footer>

</div>
