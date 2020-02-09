<script>
import { fade } from 'svelte/transition';
import { name } from './stores.js';

let userName;

function saveName(e) {
  name.subscribe( v => userName = v);
  name.set(e.target.elements[0].value);
};
</script>

<section>
  {#if !userName}
    <form
      on:submit|preventDefault={saveName}
      out:fade={{duration: 300}}
    >
      <input
        autocomplete="off"
        placeholder="enter your name here..."
        maxlength="16"
      />
      <button>save name</button>
    </form>
  {:else}
    <div in:fade={{delay: 300}}>
      <p>Hi {userName}!</p>
      <a href='chat'>let's chat!</a>
    </div>
{/if}
</section>

<style>
  section {
    height: 120px;
  }

  p, input {
    display: block;
    margin: 20px auto;
    height: 40px;
    font: inherit;
    color: var(--white-col);
    text-align: center;
  }

  p {
    font-size: var(--fs-m);
    max-width: 90%;
  }

  input {
    background: var(--ternary-col);
    box-shadow: var(--shadow);
    min-width: 300px;
    max-width: 333px;
    border-radius: 10px;
    border: none;
    font-size: var(--fs-m);
  }

  input::placeholder {
    font: inherit;
    color: var(--white-col);
  }

	button, a {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    border-radius: 10px;
    font: inherit;
    font-size: var(--fs-m);
    color: var(--secondary-light-col);
    background:var(--main-col);
    box-shadow: var(--shadow);
    width: 160px;
    height: 40px;
    margin: 0 auto;
    display: block;
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover, a:hover {
    cursor: pointer;
    color: var(--ternary-col);
  }
</style>