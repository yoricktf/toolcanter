'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <nav>
        <section className='navigationLinks'>
          <Link href='/'> Home </Link>
          <button onClick={() => signOut()} className=''>
            Sign Out
          </button>
          <Link href='/recommend'>Recommend</Link>
          <Link href={`/profile/${session.user.id}`}>profile</Link>
        </section>
        <Image
          className='avatar'
          src={`${session.user.image}`}
          width={50}
          height={50}
          alt='Picture of the author'
        />
      </nav>
    );
  }
  return (
    <nav>
      <Link href='/'> Home </Link>
      <button onClick={() => signIn()} className=''>
        Sign In
      </button>
    </nav>
  );
};

export default SigninButton;
