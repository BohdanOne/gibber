<script>
  import { fade } from "svelte/transition";
  import { name } from "./stores.js";
  import { activeUsers } from "./stores.js";

  export let socket;

  export let usersOnline;
  activeUsers.subscribe(v => (usersOnline = v));

  let nameInput = "";

  function saveName(e) {
    for (const user of usersOnline) {
      if (user.name === nameInput) {
        alert(`${user.name} is already chatting. Please choose other name.`);
        nameInput = "";
        return;
      }
    }
    name.set(nameInput);
    socket.emit("new user", nameInput);
  }
</script>

<style>
  section {
    height: 120px;
  }

  input {
    margin: 20px auto;
  }

  button {
    color: var(--secondary-light-col);
    margin: 0 auto;
  }

  button:hover {
    color: var(--ternary-col);
  }
</style>

<section>
  <form on:submit|preventDefault={saveName} out:fade={{ duration: 300 }}>
    <input
      autocomplete="off"
      placeholder="enter your name here..."
      maxlength="16"
      bind:value={nameInput} />
    <button>let's chat</button>
  </form>
</section>
