<script>
import { fly } from 'svelte/transition';
import { name } from './stores.js';

function saveName(e) {
	name.set(e.target.elements[0].value);
};

</script>
<form
  on:submit|preventDefault={saveName}
  transition:fly={{ x: 1000, duration: 1000}}
>
  <label>First tell us what's your name?
    <input autocomplete="off" />
  </label>
  <button>Let's start</button>
</form>

<style>
  input {
    width: 300px;
    padding: 5px;
    border: none;
    color: inherit;
    font: inherit;
    background: var(--secondary-light-col);
  }
	button {
    border: 2px solid;
    padding: 5px;
  	color: var(--secondary-col);
    font: inherit;
    background: var(--main-col);
  }
  button:hover{
    cursor: pointer;
    color: var(--ternary-col);
  }
</style>