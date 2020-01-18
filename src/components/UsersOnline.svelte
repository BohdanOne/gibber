<script>
	import { fade } from 'svelte/transition';
  export let usersOnline;
  let displayUsers = false;
</script>

<aside>
  <button on:click={() => displayUsers = !displayUsers}>{ displayUsers ? '🔼' : '🔽' }</button>
  <h4>users online: {usersOnline.length}</h4>
  {#if displayUsers}
    <ul transition:fade>
      {#each usersOnline as user}
        <li>{ user }</li>
      {/each}
    </ul>
  {/if}
</aside>

<style>
  aside {
    padding: 0 10px;
    max-height: 200px;
    overflow: scroll;
  }

  h4 {
    font-size: 1.5rem;
    display: inline-block;
  }

  button {
    display: inline-block;
    border: none;
    padding: 1rem;
    background: transparent;
    font-size: 1.5rem;
  }

  button:hover{
    cursor: pointer;
    transform: translateY(5px);
  }

  li {
    display: block;
    text-align: center;
    list-style: none;
    font-size: 1rem;
  }
</style>