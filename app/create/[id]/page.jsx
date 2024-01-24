'use client';
import styles from './create.module.css';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import useSWR from 'swr';
import Image from 'next/image';

const Create = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  // const [resource, setResource] = useState();
  const [imageUrl, setImageUrl] = useState();
  // const [categories, setCategories] = useState([]);
  const resourceCategories = [];

  const handleUploadSuccess = (response) => {
    if (response.event === 'success') {
      const imageUrl = response.info.secure_url;
      setImageUrl(imageUrl);
    }
  };

  const {
    data: categories,
    error: categoryError,
    isLoading: loadingCategories,
  } = useSWR('/api/categories', fetcher);

  const {
    data: resource,
    error: resourceError,
    isLoading: loadingResources,
  } = useSWR(`/api/resource/${params.id}`, fetcher);

  if (categoryError || resourceError) return <div>failed to load</div>;
  if (loadingCategories || loadingResources) return <div>loading...</div>;

  const toggleCategories = (event) => {
    resourceCategories.push(event.target.value);
  };

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
      <main className={`${styles.main} main`}>
        <h1>Create a resource</h1>
        <form className='Forms' onSubmit={handleSubmit}>
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
                <button
                  className='button imageUploadButton'
                  onClick={handleOnClick}
                >
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
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
          {categories.map((tag) => {
            return (
              <div key={tag}>
                <label htmlFor={tag}>{tag}</label>
                <input
                  // name={tag}
                  type='checkbox'
                  checked={resource?.categories.includes(tag) ? true : false}
                  onChange={(e) => toggleCategories(e)}
                  value={tag}
                />
              </div>
            );
          })}
          <button className='button submitButton'>
            <h2>submit</h2>
          </button>
        </form>

        {imageUrl && (
          <>
            <h1>hello there is something here</h1>
            <Image
              src={imageUrl}
              alt='image of new resource user has uploaded'
              width={500}
              height={250}
            ></Image>
          </>
        )}

        <button className='button deleteButton' onClick={deleteResource}>
          Delete Resource
        </button>
      </main>
    );
  } else {
    return <div>Create</div>;
  }
};

export default Create;
