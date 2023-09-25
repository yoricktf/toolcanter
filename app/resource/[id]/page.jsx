import React from 'react';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';

const Page = async ({ params }) => {
  await dbConnect();
  const resource = await Resource.findById(params?.id);
  const { title, description, _id, url, image, category, createdAt } = resource;

  return (
    <>
      <h1>{params.id}</h1>
      <p>{title}</p>
      <p>{description}</p>
      <p>{url}</p>
      <p>{image}</p>
      <p>{category}</p>
    </>
  );
};

export default Page;
