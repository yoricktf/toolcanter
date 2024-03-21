import React from 'react';
import dbConnect from '@/utils/dbConnect';
import Image from 'next/image';
import User from '@/models/User';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

const QuickFavorites = async () => {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const { favorites } = await User.findById(session?.user.id, {
    favorites: 1,
    _id: 0,
  }).populate('favorites');

  return (
    <section className='quickFavorites'>
      {favorites &&
        favorites.map((resource) => (
          <Link href={`/resource/${resource.id}`} key={resource.title}>
            <Image
              src={resource.image}
              key={resource.title}
              width={25}
              height={25}
              alt='test'
            />
          </Link>
        ))}
    </section>
  );
};

export default QuickFavorites;
