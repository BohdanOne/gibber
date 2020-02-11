<script>
  import { fade } from "svelte/transition";
  import { name } from "./stores.js";

  export let socket;

  let nameInput = "";
  let info = "";

  socket.on("valid name", validName => {
    name.set(validName);
    socket.emit("new user", validName);
  });

  socket.on("name not valid", name => {
    nameAlreadyInUse(name);
  });

  function saveName(e) {
    socket.emit("save user", nameInput);
  }

  function nameAlreadyInUse(name) {
    info = `${name} is already in use. Please choose other name.`;
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
