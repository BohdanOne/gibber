<script>
	import { fade } from 'svelte/transition';
  export let usersOnline;
  let displayUsers = false;
</script>

<aside>
  <h4>Users Online ({usersOnline.length})</h4>
  <button on:click={() => displayUsers = !displayUsers}>{ displayUsers ? 'Hide ' : 'Show ' }Online Users</button>
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
    width: 20%;
    padding: 0 10px;
    max-height: 200px;
    overflow: scroll;
  }

  h4 {
    font-weight: 200;
  }

  button {
    display: block;
    border: 2px solid;
    padding: 0 5px;
    margin: 2px auto;
  	color: var(--secondary-col);
    font: inherit;
    font-size: .7em;
    background: var(--main-col);
  }

  button:hover{
    cursor: pointer;
    color: var(--ternary-col);
  }

  li {
    list-style: none;
    font-size: .7em;
  }
</style>