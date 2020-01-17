<svelte:head>
	<title>! gibber</title>
</svelte:head>

<script>
	import { fade, fly } from 'svelte/transition';
	import NameInput from '../components/NameInput.svelte';
	import Chat from '../components/Chat.svelte';
	import { name } from '../components/stores.js';

	let userName;
	name.subscribe( v => userName = v);

</script>

<h2>Gibber - minimal chat app</h2>
{#if (!userName)}
	<NameInput />
	{:else}
	<Chat {userName} />
{/if}