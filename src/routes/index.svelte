<svelte:head>
	<title>Gibber</title>
</svelte:head>

<script>
	import { fade, fly } from 'svelte/transition';
	import NameInput from '../components/NameInput.svelte';
	import Chat from '../components/Chat.svelte';
	import { name } from '../components/stores.js';

	let userName;
	const unsubscribe = name.subscribe( v => userName = v);
</script>

{#if (!userName)}
	<NameInput />
	{:else}
	<Chat {userName}/>
{/if}