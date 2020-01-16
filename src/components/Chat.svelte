<svelte:window on:unload={emitUserDisconnect}/>

<script>
  import io from 'socket.io-client';
	import { fly, fade } from 'svelte/transition';
	import UsersOnline from './UsersOnline.svelte';

  export let userName;
	let messages = [];
	let message = '';
	let usersOnline = [];

	let notifications = [];
	$: {
		if (notifications.length > 0) {
			setTimeout(() => notifications = notifications.slice(1), 3000);
		}
	}

	let userIsWriting = false;
	$: {
		if (userIsWriting) {
			const msg = `${userName} is writing...`;
			socket.emit('user typing', msg);
			setTimeout(()=> userIsWriting = false, 3000);
		}
	}

	const socket = io();
	socket.on('user connected', users => {
		usersOnline = [userName, ...users];
		socket.emit('user connected', userName);
	});

	socket.on('new user', user => {
		usersOnline = [...usersOnline, user];
		const msg = `${user} has joined the chat`;
		notifications = [...notifications, msg];
		updateView();
	})

	socket.on('user left', users => {
		usersOnline = [...users];
	});

	socket.on('message', msg => {
		userIsWriting = false;
		messages = [...messages, msg];
		updateView();
	});

	socket.on('user typing', msg => {
		notifications = [...notifications, msg];
		updateView();
	});

	function emitUserDisconnect() {
		socket.emit('user disconnected', userName);
	};

  function handleSubmit() {
		if (message) {
			messages = [...messages, message];
			socket.emit('message', `${userName} says: ${message}`);
			updateView();
			message = '';
		}
	};

	function updateView() {
		const messagesWindow = document.getElementById('messagesWindow');
		setTimeout(() => {
			messagesWindow.scrollTop = messagesWindow.scrollHeight;
		}, 0)
  };

</script>

<div class="chat-wrapper"in:fly={{ x: -1000, delay: 1000}}>
	<div class="chat">
		<ul id="messagesWindow" >
			{ #each messages as message }
				<li transition:fade>{ message }</li>
			{ /each }
			{#each notifications as notification}
				<li transition:fade>{ notification }</li>
			{/each}
		</ul>
		<form>
			<input autocomplete="off" bind:value={ message } on:keyup={e => {if (e.key !== 'Enter') userIsWriting = true}}/>
				<button on:click|preventDefault={handleSubmit}>Send</button>
		</form>
	</div>
	<UsersOnline {usersOnline} />
</div>

<style>
	.chat-wrapper {
		display: flex;
	}

	.chat {
		position: relative;
		background: var(--secondary-light-col);
		height: 200px;
		width: 80%;
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