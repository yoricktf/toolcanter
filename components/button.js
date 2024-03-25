import React from 'react';

const Button = ({ handleAction, state }) => {
  return (
    <form action={handleAction}>
      <button className='checkButton'>{state ? '🤘' : '👊'}</button>
    </form>
  );
};

export default Button;
