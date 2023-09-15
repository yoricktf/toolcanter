'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Profile = () => {
  const { data: session } = useSession();
  const [githubUserDetails, setGithubUserDetails] = useState();
  const [unpublishedResources, setUnpublishedResources] = useState();

  async function getData() {
    const res = await fetch('${process.env.ROOT_LOCATION}/api/resource');
    const data = await res.json();
    const filteredResources = data.filter((resource) => {
      return resource.published !== true;
    });
    setUnpublishedResources(filteredResources);
  }

  useEffect(() => {
    getData();
  }, []);

  // console.log('session-------++------', session);

  useEffect(() => {
    const getGithubDetails = async () => {
      const response = await fetch(
        `https://api.github.com/user/${session?.user?.githubId}}`
      );
      const UserGitubDetails = await response.json();
      setGithubUserDetails(UserGitubDetails);
    };
    getGithubDetails();
  }, [session]);

  if (session) {
    return (
      <>
        <h1>hello {githubUserDetails?.name}</h1>
        <img
          className='githubContributions'
          src={`https://ghchart.rshah.org/${githubUserDetails?.login}`}
          alt='Name Your Github chart'
        />
        {session.user.admin && (
          <>
            <h2>unpublished resources</h2>
            {unpublishedResources?.map((resource) => {
              return (
                <Link
                  key={resource._id}
                  href={`http://localhost:3000/create/${resource._id}`}
                >
                  <h2>{resource.title}</h2>
                </Link>
              );
            })}
          </>
        )}
      </>
    );
  } else {
    return <div>please login</div>;
  }
};

export default Profile;
