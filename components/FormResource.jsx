import React from 'react';

const FormResource = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>title:</label>
      <input name='title' type='text' />
      <label htmlFor='description'>description:</label>
      <input name='description' type='text' />
      <label htmlFor='url'>url:</label>
      <input name='url' type='text' />
      <button>submit</button>
    </form>
  );
};

export default FormResource;
