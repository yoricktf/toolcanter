'use client';
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();

  console.log(session);

  if (session && session?.user?.id === '26628713') {
    return (
      <>
        <h1>hello yoz</h1>
        <img
          className='githubContributions'
          src='https://ghchart.rshah.org/yoricktf'
          alt='Name Your Github chart'
        />
      </>
    );
  } else {
    return <div>Profile</div>;
  }
};

export default Profile;
