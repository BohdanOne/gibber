<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
</script>

<style>
  span {
    color: var(--white-col);
  }

  section {
    margin-top: 20%;
    max-width: 600px;
    text-align: center;
  }

  p {
    padding: 0 1rem;
    font-size: var(--fs);
    line-height: 1.333;
    text-align: center;
  }

  button {
    margin: 2rem auto;
  }

  button a {
    color: #fff;
    font-size: var(--fs-m);
    text-decoration: none;
  }
</style>

<svelte:head>
  <title>! gibber</title>
</svelte:head>

<TransitionWrapper>
  <div>

    <h2>
      welcome to
      <br />
      <span>!gibber</span>
    </h2>
    <p>a minimal chat app</p>

    <button>
      <a href="/chat">start chatting</a>
    </button>

    <section>
      <h3>PLEASE NOTE!</h3>
      <p>
        This app doesn't provide any privacy - anybody can join the chat and see
        all the messages. Your conversations are not stored.
      </p>
      <p>
        ! gibber is my personal project build for fun to learn Svelte, Sapper &
        Sockets.IO - see the source code here:
      </p>
      <a href="https://github.com/BohdanOne/gibber">
        github.com/BohdanOne/gibber
      </a>
    </section>
  </div>
</TransitionWrapper>
