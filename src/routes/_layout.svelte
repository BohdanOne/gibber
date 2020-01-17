<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	export let segment;
</script>

<style>
	main {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>

<Header { segment } />
<main>
	<slot></slot>
</main>
<Footer />