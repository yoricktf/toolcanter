'use client';
import { useState } from 'react';
import React from 'react';
// import dbConnect from '@/utils/dbConnect';
import Image from 'next/image';
// import User from '@/models/User';
import Link from 'next/link';

// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/lib/auth';

const QuickFavorites = () => {
  // const session = await getServerSession(authOptions);
  // await dbConnect();
  const [hover, setHover] = useState(false);
  const [hoverProperties, setHoverProperties] = useState('');
  // const { favorites } = await User.findById(session?.user.id, {
  //   favorites: 1,
  //   _id: 0,
  // }).populate('favorites');
  const favorites = [
    { image: '', title: 'two', id: 3 },
    { image: '', title: 'one', id: 2 },
  ];

  return (
    <section className='quickFavorites'>
      {favorites &&
        favorites.map((resource) => (
          <Link href={`/resource/${resource.id}`} key={resource.title}>
            {hover && <p style={{ position: 'absolute' }}>{hoverProperties}</p>}
            <Image
              onMouseEnter={() => {
                setHover(true);
                setHoverProperties(resource.title);
              }}
              onMouseLeave={() => {
                setHover(false);
                setHoverProperties('');
              }}
              className='quickFavoriteImage'
              src={resource.image}
              key={resource.title}
              width={55}
              height={55}
              alt='test'
            />
          </Link>
        ))}
    </section>
  );
};

export default QuickFavorites;
