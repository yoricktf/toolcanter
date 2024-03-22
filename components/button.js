import React from 'react';

const Button = ({ handleAction, state }) => {
  return (
    <form action={handleAction}>
      <button>{state ? '🤘' : '👊'}</button>
    </form>
  );
};

export default Button;
