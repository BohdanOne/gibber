<script>
	import { fade } from 'svelte/transition';
  export let usersOnline;
</script>

<aside>
  <h3>users online: {usersOnline.length}</h3>
  <ul transition:fade>
    {#each usersOnline as user}
      <li>{ user.name }</li>
    {/each}
  </ul>
</aside>

<style>
  aside {
    padding: 0 10px;
    max-height: 200px;
    overflow: scroll;
  }

  li {
    display: block;
    text-align: center;
    list-style: none;
    font-size: var(--fs);
  }
</style>