<svelte:head>
	<title>Gibber</title>
</svelte:head>
<svelte:window on:unload={emitUserDisconnect}/>

<script>
	import { fade } from 'svelte/transition';
	import io from 'socket.io-client';
	const socket = io();

	let messages = ['welcome to our chat'];
	let message = '';
	let name= 'anonymous';
	let usersOnline = 0;

	socket.on('message', msg => {
		messages = [...messages, msg];
		updateView();
	});

	socket.on('user connected', usersCount => {
		usersOnline = usersCount;
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
		socket.emit('message', `${name} says: ${message}`);
		updateView();
		message = '';
	};

	function saveName(e) {
		name = e.target.elements[0].value;
	};

	function updateView() {
		const chat = document.getElementById('chat');
		setTimeout(() => {
			chat.scrollTop = chat.scrollHeight;
		}, 0)
	}
</script>

	<p>Users online: {usersOnline}</p>

	<form on:submit|preventDefault={saveName}>
		<label>Enter your name:
			<input id="nameInput" autocomplete="off" value={ name } />
		</label>
		<button>Save name</button>
	</form>

	<ul id="chat">
		{ #each messages as message }
			<li transition:fade>{ message }</li>
		{ /each }
	</ul>
	<form>
		<input id="msgInput" autocomplete="off" bind:value={ message } />
			<button on:click|preventDefault={handleSubmit}>Send</button>
	</form>

<style>

	#chat {
		position: relative;
		background: var(--secondary-light-col);
		overflow: auto;
		height: 200px;
	}

	li {
		list-style: none;
	}
</style>