<script>
  import Nav from '../components/Nav.svelte';
  export let segment;
</script>

<header>
  <h1>! gibber</h1>
  <Nav { segment }/>
</header>

<style>
  header {
    height: 50px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
    background: var(--secondary-col);
  }

  h1 {
    color: var(--white-col);
    line-height: 1;
  }
</style>