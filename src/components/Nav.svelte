<script>
	export let segment;
</script>

<nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>home</a></li>
		<li><a class:selected='{segment === "chat"}' href='chat'>chat</a></li>
		<li><a class:selected='{segment === "info"}' href='info'>info</a></li>
	</ul>
</nav>

<style>
	nav {
		max-width: 200px;
	}

	ul {
		display: flex;
		justify-content: flex-end;
	}

	li {
		margin-left: 10px;
		list-style: none;
	}

	a {
		color: var(--main-col);
		font-size: var(--fs-m);
		text-decoration: none;
	}

	.selected {
		border-bottom: 2px solid var(--ternary-col);
	}
</style>