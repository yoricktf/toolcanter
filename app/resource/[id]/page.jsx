import React from 'react';

const Page = async ({ params }) => {
  async function getResource() {
    const res = await fetch(`/api/resource/${params.id}`);
    const specificResource = await res.json();
    return specificResource;
  }
  const resource = await getResource();
  const { title, description, _id, url, image, category, createdAt } = resource;

  return (
    <>
      <h1>{params.id}</h1>
      <p>{title}</p>
      <p>{description}</p>
      <p>{url}</p>
      <p>{image}</p>
      <p>{category}</p>
      <p>{createdAt}</p>
    </>
  );
};

export default Page;
