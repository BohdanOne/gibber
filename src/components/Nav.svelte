<script>
	export let segment;
</script>

<style>
	nav {
		box-sizing: border-box;
		background: #698474;
		font-weight: 300;
		padding: 0 1em;
		max-width: 56em;
		margin: 0 auto;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 3px;
		background-color: #85679E;
		display: block;
		bottom: 0px;
	}

	a {
		color: #e5e4cc;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	a:hover {
		color: #85679E;
	}
</style>

<nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>home</a></li>
		<li><a class:selected='{segment === "about"}' href='about'>about</a></li>
	</ul>
</nav>
