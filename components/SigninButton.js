'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SigninButton = () => {
  const { data: session } = useSession();
  // console.log('======================', session);

  if (session && session.user) {
    return (
      <div className='flex gap-4 ml-auto'>
        <Link href='/'> Home </Link>
        <p className='text-sky-600'>{session.user.name}</p>
        {/* <p className='text-sky-600'>{session?.user?.image}</p> */}
        <Image
          src={`${session.user.image}`}
          width={50}
          height={50}
          alt='Picture of the author'
        />
        <button onClick={() => signOut()} className='text-red-600'>
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <>
      <Link href='/'> Home </Link>
      <button onClick={() => signIn()} className='text-green-600 ml-auto'>
        Sign In
      </button>
    </>
  );
};

export default SigninButton;
