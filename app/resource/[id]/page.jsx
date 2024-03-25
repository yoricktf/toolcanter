import React from 'react';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import User from '@/models/User';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import ResourcesList from '@/components/ResourcesList';
import Link from 'next/link';
import Button from '@/components/button';
import { revalidatePath } from 'next/cache';
import Badge from '@/components/badge';

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const userId = session?.user?.id;

  const {
    contributorsPhoto,
    title,
    description,
    _id: resourceId,
    url,
    image,
    categories,
    createdAt,
    contributorsName,
    author,
  } = await Resource.findById(params?.id).populate('author', '_id');

  let similarResources = [];

  const checkingFavorites = async () => {
    'use server';
    const user = await User.findById(userId);
    return user.favorites.includes(resourceId);
  };
  let isFavorite = await checkingFavorites();

  const handleDelete = async () => {
    'use server';
    await Resource.findByIdAndDelete(resourceId);
    redirect('/');
  };

  const handleFavorite = async () => {
    'use server';
    try {
      let user = await User.findById(userId);
      const isFavorite = user.favorites.includes(resourceId);

      if (isFavorite) {
        user.favorites = user.favorites.filter(
          (id) => id.toString() !== resourceId
        );
      } else {
        user.favorites.push(resourceId);
      }
      user = await user.save();
      session.user.favorites = user.favorites;
      console.log('Updated user:::::', user);
      checkingFavorites();
    } catch (error) {
      console.error('Error toggling favorite:::::', error);
      throw error;
    }
    revalidatePath(`/resource/${resourceId}`);
  };

  // getting all the resources that are similar and collapsing them into a single array
  for (const category of categories) {
    similarResources.push(
      ...(await Resource.find({
        _id: { $ne: resourceId },
        categories: category,
      }))
    );
  }

  return (
    <>
      <article className='mainFacts'>
        <div className='resourceDetails'>
          <div>
            <Image
              src={image}
              height={90}
              width={90}
              alt={`image of the ${title} resource`}
            />
            <Image
              src={contributorsPhoto}
              alt='Picture of the author'
              className='avatar resourceAvatar'
              height={30}
              width={30}
            />
            <p>
              added by{' '}
              <Link href={`/profile/${author?.id}`}>{contributorsName}</Link>{' '}
            </p>
            <h1>{title}</h1>
            <p>Added On: {new Date(createdAt).toDateString()}</p>
            <Link href={url}>
              <p className='checkButton'>Check it out</p>
            </Link>
            {session?.user.admin && (
              <form action={handleDelete}>
                <button className='checkButton'>delete the resource</button>
              </form>
            )}
            {session && (
              <Button handleAction={handleFavorite} state={isFavorite} />
            )}
          </div>
          <p className='resourceDescription'>Description: {description}</p>
        </div>
        <div className='tags'>
          {categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
      </article>
      <section className='cardSection'>
        <h2>Similar Resources</h2>
        <ResourcesList resources={similarResources} />
      </section>
    </>
  );
};

export default Page;
