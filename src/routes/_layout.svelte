<script>
	import Header from '../components/Header.svelte';
	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: var(--main-col);
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Header { segment } />
<main>
	<slot></slot>
</main>