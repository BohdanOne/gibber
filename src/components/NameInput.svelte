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