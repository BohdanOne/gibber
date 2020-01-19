<script>
	import TransitionWrapper from '../components/TransitionWrapper.svelte';
	import NameInput from '../components/NameInput.svelte';
</script>

<svelte:head>
	<title>! gibber</title>
</svelte:head>

<TransitionWrapper>
	<h2>welcome to <span>! gibber</span></h2>
	<h3>a minimal chat app</h3>
	<NameInput />
	<section>
		<h4>PLEASE NOTE!</h4>
		<p>This app doesn't provide any privacy - anybody can join the chat and see all the messages. Your conversations are not stored.</p>
		<p>! gibber is my personal project build for fun to learn Svelte, Sapper & Sockets.IO - see the source code here:</p>
		<a href ="https://github.com/BohdanOne/gibber">github.com/BohdanOne/gibber</a>
	</section>
</TransitionWrapper>

<style>
	h2 {
		font-size: 2rem;
		text-align: center;
	}

	span {
		color: var(--white-col);
	}

	h3 {
		font-size: 1.5rem;
		text-align: center;
	}

	section {
		margin-top: 30%;
		text-align: center;
	}

	p {
		padding: 0 1rem;
		line-height: 1.2;
	}

	a {
		color: var(--main-col);
	}

	a:hover {
    cursor: pointer;
    color: var(--white-col);
  }
</style>