<style>
  p {
    font-size: var(--fs-l);
    text-align: center;
  }

  a {
    appearance: none;
    border-radius: 10px;
    font: inherit;
    font-size: var(--fs-m);
    color: var(--secondary-light-col);
    background: var(--main-col);
    box-shadow: var(--shadow);
    width: 160px;
    height: 40px;
    margin: 1.333rem auto;
    display: block;
  }

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

  @media (max-width: 400px) {
    a {
      font-size: var(--fs-m);
      height: 30px;
    }

    p {
      font-size: var(--fs-m);
    }
  }
</style>

<div>
  <p>We don't chat with strangers!</p>
  <p>
    Go here
    <span role="img" aria-label="Down-Right Arrow">↘️</span>
    and provide your name.
  </p>
  <a href="/">home</a>
</div>
