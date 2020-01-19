<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let show = false;
  onMount(() => show = true);
</script>

{#if show}
  <div in:fade>
    <slot></slot>
  </div>
{/if}

<style>
  div {
    position: relative;
  }
</style>