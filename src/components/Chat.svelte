<svelte:window on:unload={emitUserDisconnect}/>

<script>
  import io from 'socket.io-client';
  import { fly, fade } from 'svelte/transition';
  export let userName;

  let messages = [`Welcome ${userName}!`];
	let message = '';
	let usersOnline = 0;

	const socket = io();
	socket.on('message', msg => {
		messages = [...messages, msg];
		updateView();
	});

	socket.on('user connected', usersCount => {
    usersOnline = usersCount;
    socket.emit('user connected', userName);
		updateView();
	});

	socket.on('user disconnected', usersCount => {
		usersOnline = usersCount;
		updateView();
	});

	function emitUserDisconnect() {
		socket.emit('user disconnected');
	};

  function handleSubmit() {
		messages = [...messages, message];
		socket.emit('message', `${userName} says: ${message}`);
		updateView();
		message = '';
	};

	function updateView() {
		const messagesWindow = document.getElementById('messagesWindow');
		setTimeout(() => {
			messagesWindow.scrollTop = messagesWindow.scrollHeight;
		}, 0)
  };

</script>

<p>
  <span>Users online: </span>
  {usersOnline}
</p>
<div id="chat" in:fly={{ x: -1000, delay: 1000}}>
  <ul id="messagesWindow" >
    { #each messages as message }
      <li transition:fade>{ message }</li>
    { /each }
  </ul>
  <form>
    <input autocomplete="off" bind:value={ message } />
      <button on:click|preventDefault={handleSubmit}>Send</button>
  </form>
</div>

<style>
  span {
    font-style: italic;
  }

	#chat {
		position: relative;
		background: var(--secondary-light-col);
		height: 200px;
  }

  ul {
    overflow: scroll;
    height: 80%;
  }

	li {
		list-style: none;
	}

	form {
		display: block;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	input {
		width: 90%;
		padding: 5px;
		border: none;
		color: inherit;
		font: inherit;
	}
	button {
		border: none;
  	color: var(--main-col);
    padding: 5px;
		font: inherit;
		background: var(--secondary-light-col);
  }
  button:hover{
    cursor: pointer;
    color: var(--ternary-col);
  }
</style>