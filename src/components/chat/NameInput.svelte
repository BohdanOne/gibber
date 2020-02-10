<script>
  import { fade } from "svelte/transition";
  import { name } from "./stores.js";
  import { activeUsers } from "./stores.js";

  export let socket;

  export let usersOnline;
  activeUsers.subscribe(v => (usersOnline = v));

  let nameInput = "";
  let info = ""

  function saveName(e) {
    for (const user of usersOnline) {
      if (user.name === nameInput) {
        nameAlreadyInUse(nameInput)
        return;
      }
    }
    name.set(nameInput);
    socket.emit("new user", nameInput);
  }

  function nameAlreadyInUse(name) {
    info =`${name} is already in use. Please choose other name.`;
    nameInput = "";
  }
</script>

<style>
  section {
    height: 120px;
  }

  p {
    text-align: center;
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
    <p>{info}</p>
    <input
      autocomplete="off"
      placeholder="enter your name here..."
      maxlength="16"
      required
      bind:value={nameInput} />
    <button>let's chat</button>
  </form>
</section>
