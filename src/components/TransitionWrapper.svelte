<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let show = false;
  onMount(() => show = true);
</script>

{#if show}
  <div in:fade out:fade>
    <slot></slot>
  </div>
{/if}

<style>
  div {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>