<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
</script>

<style>
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  ul {
    list-style: none;
    padding: 20px 0;
  }

  li {
    text-align: center;
  }

  span {
    color: var(--white-col);
  }

  p {
    padding: 0 1rem;
    line-height: 1.2;
    text-align: center;
  }
</style>

<svelte:head>
  <title>! gibber | info</title>
</svelte:head>

<TransitionWrapper>
  <div>
    <h2>Info</h2>
    <h3>Special commands</h3>
    <ul>
      <li>
        type
        <span>/h</span>
        and get
        <span role="img" aria-label="Waving Hand">👋</span>
      </li>
      <li>
        type
        <span>/y</span>
        and get
        <span role="img" aria-label="Thumbs Up">👍</span>
      </li>
      <li>
        type
        <span>/n</span>
        and get
        <span role="img" aria-label="Thumbs Down">👎</span>
      </li>
      <li>
        type
        <span>/l</span>
        and get
        <span role="img" aria-label="Red Heart">❤️</span>
      </li>
      <li>
        type
        <span>/chuck</span>
        and you will see..
        <span role="img" aria-label="Winking Face">😉</span>
      </li>
    </ul>

    <h3>Please note</h3>
    <p>
      This app doesn't provide any privacy - anybody can join the chat and see
      all the messages.
    </p>
    <p>Your conversations are not stored.</p>
  </div>
</TransitionWrapper>
