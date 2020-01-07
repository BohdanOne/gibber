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
	let name;

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
		socket.emit('message', message);
		updateView();
		message = '';
	};

	function updateView() {
		const chat = document.getElementById('chat');
		setTimeout(() => {
			chat.scrollTop = chat.scrollHeight;
		}, 0)
	}
</script>

<header>
	<h1>Lets talk!</h1>
	<h2>Gibber - minimal chat app</h2>
</header>
<main>

	<h4>Users online: {usersOnline}</h4>

	<form>
		<label>Enter your name:
			<input id="nameInput" autocomplete="off" bind:value={ name } />
		</label>

			<!-- <button on:click|preventDefault={handleSubmit}>Send</button> -->
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
</main>

<style>
	h1 {
		text-align: center;
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
	}

	h2 {
		text-align: center;
		font-size: 1.5em;
	}

	#chat {
		position: relative;
		background: #889e81;
		overflow: auto;
		height: 200px;
	}

	li {
		list-style: none;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>