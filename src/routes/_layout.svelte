<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	export let segment;
</script>

<style>
	main {
		position: relative;
	}
</style>

<Header { segment } />
<main>
	<slot></slot>
</main>
<Footer />