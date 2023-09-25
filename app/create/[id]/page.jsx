'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

const Create = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [resource, setResource] = useState();

  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch(`/api/resource/${params.id}`);
      const formattedData = await response.json();
      setResource(formattedData);
      // return resource;
    };
    handleFetch();
  }, []);

  const deleteResource = async () => {
    console.log('delete');
    const response = await fetch(`/api/resource/${params.id}`, {
      method: 'DELETE',
    });
    const formattedData = await response.json();
    console.log(formattedData);
    router.push('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataWithContributer = {
      ...resource,
      published: true,
    };
    const response = await fetch(`/api/resource/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(dataWithContributer),
    });
    const data = await response.json();
    router.push(`/resource/${params.id}`);
  };

  if (session && session?.user?.admin) {
    return (
      <>
        <h1>Create a resource</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>title:</label>
          <input
            name='title'
            type='text'
            value={resource?.title}
            onChange={(e) => {
              setResource((resource) => ({
                ...resource,
                title: e.target.value,
              }));
            }}
          />
          <label htmlFor='description'>description:</label>
          <input
            name='description'
            type='text'
            value={resource?.description}
            onChange={(e) => {
              setResource((resource) => ({
                ...resource,
                description: e.target.value,
              }));
            }}
          />
          <label htmlFor='url'>url:</label>
          <input
            name='url'
            type='text'
            value={resource?.url}
            onChange={(e) => {
              setResource((resource) => ({
                ...resource,
                url: e.target.value,
              }));
            }}
          />
          <button>submit</button>
        </form>

        <div>
          <h2 onClick={deleteResource}>Delete Resource</h2>
        </div>
      </>
    );
  } else {
    return <div>Create</div>;
  }
};

export default Create;
