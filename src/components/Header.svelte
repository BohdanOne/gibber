<script>
  import Nav from '../components/Nav.svelte';
  export let segment;
</script>

<header>
  <Nav { segment }/>
	<h1>Lets talk!</h1>
	<h2>Gibber - minimal chat app</h2>
</header>

<style>

  h1,
  h2 {
    font-weight: 400;
    margin: 0;
		text-align: center;
  }
	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
	}

	h2 {
    font-size: 1.2em;
	}
</style>