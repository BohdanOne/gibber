<svelte:window on:unload={emitUserDisconnect}/>

<script>
  import io from 'socket.io-client';
	import { fly, fade } from 'svelte/transition';
	import UsersOnline from './UsersOnline.svelte';

  export let userName;
  let messages = [];
	let message = '';
	let usersOnline = [];

	const socket = io();
	socket.on('user connected', users => {
		usersOnline = [userName, ...users];
		socket.emit('user connected', userName);
	});

	socket.on('new user', user => {
		usersOnline = [...usersOnline, user];
	})

	socket.on('user left', users => {
		usersOnline = [...users];
	});

	socket.on('message', msg => {
		messages = [...messages, msg];
		updateView();
	});

	function emitUserDisconnect() {
		socket.emit('user disconnected', userName);
	};

	function notifyAboutInput() {
		socket.emit('message', `${userName} is writing...`);
	}

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

<div id="chat" in:fly={{ x: -1000, delay: 1000}}>
  <ul id="messagesWindow" >
    { #each messages as message }
      <li transition:fade>{ message }</li>
    { /each }
  </ul>
  <form>
    <input autocomplete="off" bind:value={ message } on:keyup|once={ notifyAboutInput }/>
      <button on:click|preventDefault={handleSubmit}>Send</button>
  </form>
</div>
<UsersOnline {usersOnline} />

<style>
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