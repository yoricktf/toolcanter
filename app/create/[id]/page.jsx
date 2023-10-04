'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

const Create = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [resource, setResource] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleUploadSuccess = (response) => {
    if (response.event === 'success') {
      const imageUrl = response.info.secure_url;
      setImageUrl(imageUrl);
      // Do something with the imageUrl, such as storing it in state or displaying it to the user
      console.log('Uploaded image URL:', imageUrl);
    }
  };

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
      image: imageUrl,
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

        <CldUploadWidget
          uploadPreset='xnvins2n'
          onSuccess={handleUploadSuccess} // Set the onSuccess callback
        >
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button className='button' onClick={handleOnClick}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>

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
