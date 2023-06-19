'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

const Create = () => {
  const params = useParams();
  const { data: session } = useSession();

  console.log(params.id);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formattedFormData = Object.fromEntries(formData);
    const dataWithContributer = {
      ...formattedFormData,
      published: true,
    };
    const response = await fetch(
      `http://localhost:3000/api/resource/${params.id}`,
      {
        method: 'PATCH',
      }
    );
    const data = await response.json();

    console.log('response>>>>>>>', data);
  };

  if (session && session?.user?.id === '26628713') {
    return (
      <>
        <h1>Create a resource</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>title:</label>
          <input name='title' type='text' />
          <label htmlFor='description'>description:</label>
          <input name='description' type='text' />
          <label htmlFor='url'>url:</label>
          <input name='url' type='text' />
          <button>submit</button>
        </form>
      </>
    );
  } else {
    return <div>Create</div>;
  }
};

export default Create;
