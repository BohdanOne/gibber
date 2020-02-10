<script>
  import { fade } from "svelte/transition";
  import { name } from "./stores.js";

  export let usersOnline;
  let nameInput = '';

  function saveName(e) {
    for (const user of usersOnline) {
      if (user.name === nameInput) {
        alert(`${user.name} is already chatting. Please choose other name.`);
        nameInput = '';
        return
      }
    }
    name.set(nameInput);
  }
</script>

<style>
  section {
    height: 120px;
  }

  input {
    display: block;
    margin: 20px auto;
    height: 40px;
    font: inherit;
    color: var(--white-col);
    text-align: center;
  }

  input {
    background: var(--ternary-col);
    box-shadow: var(--shadow);
    min-width: 300px;
    max-width: 333px;
    border-radius: 10px;
    border: none;
    font-size: var(--fs-m);
  }

  input::placeholder {
    font: inherit;
    color: var(--white-col);
  }

  button {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    border-radius: 10px;
    font: inherit;
    font-size: var(--fs-m);
    color: var(--secondary-light-col);
    background: var(--main-col);
    box-shadow: var(--shadow);
    width: 160px;
    height: 40px;
    margin: 0 auto;
    display: block;
  }

  button:hover {
    cursor: pointer;
    color: var(--ternary-col);
  }
</style>

<section>
  <form on:submit|preventDefault={saveName} out:fade={{ duration: 300 }}>
    <input
      autocomplete="off"
      placeholder="enter your name here..."
      maxlength="16"
      bind:value = {nameInput} />
    <button>let's chat</button>
  </form>
</section>
