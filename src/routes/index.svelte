<script>
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import NameInput from "../components/NameInput.svelte";
</script>

<style>
  h2 {
    font-size: 3.157rem;
    line-height: 1;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  span {
    color: var(--white-col);
  }

  h3 {
    font-size: var(--fs-m);
    text-align: center;
  }

  section {
		margin-top: 30%;
		max-width: 600px;
    text-align: center;
  }

  @media (max-height: 750px) {
    section {
      margin-top: 0;
    }
  }

	h4 {
		font-size: var(--fs);
		margin-bottom: 1rem;
	}

  p {
		padding: 0 1rem;
		font-size: var(--fs);
    line-height: 1.333;
  }

  a {
		color: var(--main-col);
		font-size: var(--fs);
		margin-top: 1rem;
  }

  a:hover {
    cursor: pointer;
    color: var(--white-col);
  }
</style>

<svelte:head>
  <title>! gibber</title>
</svelte:head>

<TransitionWrapper>
  <h2>
    welcome to
    <br />
    <span>!gibber</span>
  </h2>
  <h3>a minimal chat app</h3>
  <NameInput />
  <section>
    <h4>PLEASE NOTE!</h4>
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
</TransitionWrapper>
