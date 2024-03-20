import React from 'react';

const Button = ({ handleAction, state }) => {
  return (
    <form action={handleAction}>
      <button>{state ? '---Remove---' : '+++Add+++'}</button>
    </form>
  );
};

export default Button;
