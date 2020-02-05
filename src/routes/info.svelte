<script>
	import TransitionWrapper from '../components/TransitionWrapper.svelte'
</script>

<svelte:head>
	<title>! gibber | info</title>
</svelte:head>

<TransitionWrapper>
	<h2>Info</h2>
	<h3>Special commands</h3>
		<ul>
			<li>type <span>/h </span>and get <span>👋</span></li>
			<li>type <span>/y </span>and get <span>👋</span></li>
			<li>type <span>/n </span>and get <span>👋</span></li>
			<li>type <span>/l </span>and get <span>👋</span></li>
			<li>type <span>/chuck </span>and you will see 😉</li>
		</ul>

	<h3>Please note</h3>
	<p>This app doesn't provide any privacy - anybody can join the chat and see all the messages.</p>
	<p>Your conversations are not stored.</p>
</TransitionWrapper>

<style>
	h2 {
		font-size: 3rem;
		line-height: .8;
		margin-bottom: .5rem;
		text-align: center;
	}

	h3 {
		font-size: 1.5rem;
		text-align: center;
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