import React from 'react';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import User from '@/models/User';
import Image from 'next/image';
import DeleteButton from '@/components/DeleteButton';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const userId = session?.user?.id;
  console.log('------------session: ', session);

  const {
    contributorsPhoto,
    title,
    description,
    _id: resourceId,
    url,
    image,
    categories,
    createdAt,
  } = await Resource.findById(params?.id);

  let similarResources = [];

  const handleDelete = async () => {
    'use server';
    await Resource.findByIdAndDelete(resourceId);
    redirect('/');
  };

  const handleFavorite = async () => {
    'use server';
    console.log('------------session: ', session);
    try {
      let user = await User.findById(userId);
      const isFavorite = user.favorites.includes(resourceId);

      if (isFavorite) {
        user.favorites = user.favorites.filter((id) => id !== resourceId);
      } else {
        user.favorites.push(resourceId);
      }
      user = await user.save();
      console.log('Updated user:', user);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  for (const category of categories) {
    similarResources.push(
      ...(await Resource.find({
        categories: category,
      }))
    );
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
        <p>ADDED ON: {Date(createdAt)}</p>
        <p>CATEGORIES: {categories}</p>
        {session?.user.admin && (
          <form action={handleDelete}>
            <button>delete the resource</button>
          </form>
        )}
        {session && (
          <form action={handleFavorite}>
            <button>favorite</button>
          </form>
        )}
      </article>
      <section>
        <h2>Similar Resources</h2>
        {similarResources.map((resource) => (
          <div key={resource.resourceId}>
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
