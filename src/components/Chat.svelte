<svelte:window on:unload={emitUserDisconnect}/>

<script>
  import io from 'socket.io-client';
	import { fade } from 'svelte/transition';
	import { name } from './stores.js';
	import UsersOnline from './UsersOnline.svelte';

	let userName;
	name.subscribe( v => userName = v);

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
			socket.emit('user typing', userName);
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
		const msg = `${user} has joined conversation 👋`;
		notifications = [...notifications, msg];
		updateView();
	})

	socket.on('user left', (users, user) => {
		usersOnline = [...users];
		const msg = `${user} has left conversation 🙋🏻‍♀️`;
		notifications = [...notifications, msg];
		updateView();
	});

	socket.on('message', (msg, user) => {
		userIsWriting = false;
		messages = [...messages, { message: msg, user: user}];
		updateView();
	});

	socket.on('user typing', user => {
		const msg = `${user} is typing ✍️`
		notifications = [...notifications, msg];
		updateView();
	});

	function emitUserDisconnect() {
		socket.emit('user disconnected', userName);
	};

  function handleSubmit() {
		if (message) {
			messages = [...messages, {message: message, user: userName}];
			socket.emit('message', message, userName);
			updateView();
			message = '';
		}
	};

	function updateView() {
		const messagesWindow = document.getElementById('chat');
		setTimeout(() => {
			messagesWindow.scrollTop = messagesWindow.scrollHeight;
		}, 0)
  };

</script>

<div>
	{#if userName}
		<ul id="chat">
			{ #each messages as message }
				<li transition:fade class="message">
					{ #if message.user === userName }
						{ message.message }
						{ :else }
							<span>{ message.user } says: </span>{ message.message }
					{ /if }
				</li>
			{ /each }
			{#each notifications as notification}
				<li transition:fade class="notification">{ notification }</li>
			{/each}
		</ul>
		<form>
			<input
				autocomplete="off"
				bind:value={ message }
				on:keyup={e => {if (e.key !== 'Enter') userIsWriting = true}}
				placeholder="write here"
			/>
			<button
				on:click|preventDefault={handleSubmit}
			>Send!</button>
		</form>
		<UsersOnline {usersOnline} />
	{:else}
		<p>We don't chat with strangers!</p>
		<p>Go here <span role="img" aria-label="Down-Right Arrow">↘️</span> and provide your name.</p>
		<a href='/'>here</a>
	{/if}
</div>

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
	}

	input {
    display: block;
    margin: 10px auto;
    height: 40px;
    font: inherit;
    color: var(--white-col);
    text-align: center;
    background: var(--ternary-col);
    box-shadow: var(--shadow);
    max-width: 333px;
    border-radius: 10px;
    border: none;
    font-size: 1.5rem;
  }

  input::placeholder {
    font: inherit;
    font-size: 1.5rem;
    color: var(--white-col);
	}

	button, a {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    border-radius: 10px;
    font: inherit;
    font-size: 1.5rem;
    color: var(--secondary-light-col);
    background:var(--main-col);
    box-shadow: var(--shadow);
    width: 160px;
    height: 40px;
    margin: 0 auto;
    display: block;
  }

	button:hover,
	a:hover {
    cursor: pointer;
    color: var(--ternary-col);
	}

	a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

	li {
		list-style: none;
		font-size: 1rem;
	}

	.notification,
	span {
		color: var(--secondary-light-col);
	}

	p {
		font-size: 2rem;
		text-align: center;
	}
</style>