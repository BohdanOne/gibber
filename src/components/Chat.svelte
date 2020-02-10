<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { name, messages, activeUsers } from "./chat/stores.js";
  import UsersOnline from "./chat/UsersOnline.svelte";
  import NameInput from "./chat/NameInput.svelte";
  import io from "socket.io-client";

  const socket = io();

  let user = {
    name: "",
    isWriting: false
  };
  name.subscribe(v => (user.name = v));
  $: {
    if (user.isWriting) {
      socket.emit("user typing", user);
      setTimeout(() => (user.isWriting = false), 3000);
    }
  }

  let usersOnline = [];
  activeUsers.subscribe(v => (usersOnline = v));

  let notifications = [];
  $: {
    if (notifications.length > 0) {
      setTimeout(() => (notifications = notifications.slice(1)), 4000);
    }
  }

  let messageList = [];
  messages.subscribe(v => (messageList = v));
  let messageInput = "";

  onMount(() => {
    if (user.name) socket.emit("new user", user.name);
  });
  onDestroy(() => disconnectUser());

  socket.on("usersOnline", (users, user) => {
    const msg = `${user.name} has joined conversation 👋`;
    notifications = [...notifications, msg];
    activeUsers.update(u => [...users]);
  });

  socket.on("user left", (users, user) => {
    usersOnline = users;
    const msg = `${user.name} has left conversation 🙋🏻‍♀️`;
    notifications = [...notifications, msg];
  });

  socket.on("message", (msg, user) => {
    messages.update(m => [...messageList, { message: msg, user: user }]);
    notifications = notifications.filter(
      notification => !notification.includes(user.name)
    );
    updateView();
  });

  socket.on("user typing", user => {
    const msg = `${user.name} is typing ✍️`;
    notifications = [...notifications, msg];
  });

  function disconnectUser() {
    if (user.name) {
      socket.emit("user disconnected", user);
    }
    socket.close();
  }

  function userIsWriting(e) {
    if (e.key !== "Enter" && !user.isWriting) {
      user.isWriting = true;
    }
  }

  function handleSubmit() {
    if (messageInput) {
      socket.emit("message", messageInput, user);
      messageInput = "";
      user.isWriting = false;
      updateView();
    }
  }

  function updateView() {
    const chatWindow = document.getElementById("chat");
    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 0);
  }
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    max-height: 500px;
  }

  ul {
    background: var(--white-col);
    max-width: 333px;
    min-height: 300px;
    max-height: 60%;
    border-radius: 10px;
    overflow: scroll;
    padding: 5px 10px;
    box-shadow: var(--shadow);
  }

  button {
    color: var(--secondary-light-col);
    margin: 0 auto;
  }

  button:hover {
    color: var(--ternary-col);
  }

  li {
    list-style: none;
    font-size: 1rem;
  }

  .notification,
  span.user {
    color: var(--secondary-light-col);
  }

  span.my-msg {
    color: var(--ternary-col);
  }
</style>

<svelte:window on:unload={disconnectUser} />
<div>
  {#if user.name}
    <ul id="chat">
      {#each messageList as message, index}
        <li transition:fade class="message">
          {#if message.user.name === user.name}
            <span class="my-msg">{message.message}</span>
          {:else if index > 0 && message.user.name === messageList[index - 1].user.name}
            {message.message}
          {:else}
            <span class="user">{message.user.name} says:</span>
            {message.message}
          {/if}
        </li>
      {/each}
      {#each notifications as notification}
        <li transition:fade class="notification">{notification}</li>
      {/each}
    </ul>
    <form>
      <input
        autocomplete="off"
        bind:value={messageInput}
        on:keyup={userIsWriting}
        placeholder="write here" />
      <button on:click|preventDefault={handleSubmit}>Send!</button>
    </form>
  {:else}
    <NameInput {socket} />
  {/if}
  <UsersOnline {usersOnline} />
</div>
