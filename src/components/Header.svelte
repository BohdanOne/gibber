<script>
  import Nav from '../components/Nav.svelte';
  export let segment;
</script>

<header>
  <h1>!gibber</h1>
  <Nav { segment }/>
</header>

<style>
  header {
    display: block;
    height: 50px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
    background: var(--secondary-col);
  }

  h1 {
    color: var(--white-col);
    font-size: var(--fs-xl);
    line-height: 1;
  }
</style>