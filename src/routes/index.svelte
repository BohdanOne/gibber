<svelte:head>
	<title>Gibber</title>
</svelte:head>
<svelte:window on:unload={emitUserDisconnect}/>

<script>
	import { fade, fly } from 'svelte/transition';
	import io from 'socket.io-client';
	const socket = io();

	let messages = ['welcome to our chat'];
	let message = '';
	let name = '';
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
		// const messagesWindow = document.getElementById('messagesWindow');
		// setTimeout(() => {
		// 	messagesWindow.scrollTop = messagesWindow.scrollHeight;
		// }, 0)
	}
</script>

	<p>Users online: {usersOnline}</p>
	{#if (!name)}
		<form id="nameInputForm" on:submit|preventDefault={saveName} transition:fly={{ x: 1000, duration: 1000}}>
			<label>First tell us what's your name?
				<input autocomplete="off" value={ name } />
			</label>
			<button>Let's start</button>
		</form>
		{:else}
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
	{/if}

<style>

	#chat {
		/* display: none; */
		position: relative;
		background: var(--secondary-light-col);
		overflow: auto;
		height: 200px;
	}

	li {
		list-style: none;
	}
</style>