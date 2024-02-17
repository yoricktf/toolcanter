import React from 'react';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import Image from 'next/image';

const Page = async ({ params }) => {
  await dbConnect();

  const {
    contributorsName,
    contributorsPhoto,
    title,
    description,
    _id,
    url,
    image,
    categories,
    createdAt,
  } = await Resource.findById(params?.id);

  console.log('categories', ...categories);

  let similarResources = [];

  for (const category of categories) {
    console.log('------------category: ', category);
    similarResources.push(
      ...(await Resource.find({
        categories: category,
      }))
    );
    console.log('------------similarResources: ', similarResources);
  }

  return (
    <>
      <article>
        <Image
          src={image}
          height={500}
          width={500}
          alt={`image of the ${title} resource`}
        />
        <Image
          src={contributorsPhoto}
          alt='Picture of the author'
          className='avatar'
          height={50}
          width={50}
        />
        <h1>TITLE: {title}</h1>

        <p>DESCRIPTION: {description}</p>
        <p>URL: {url}</p>

        <p>CATEGORIES: {categories}</p>
      </article>
      <section>
        <h2>Similar Resources</h2>
        {similarResources.map((resource) => (
          <div key={resource._id}>
            <h3>TITLE: {resource.title}</h3>
            <p>DESCRIPTION: {resource.description}</p>
            <p>CATEGORIES: {resource.categories}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Page;
