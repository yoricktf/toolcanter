import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

const Profile = async () => {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const foundResources = await Resource.find();
  const filteredResources = foundResources.filter((resource) => {
    return resource.published !== true;
  });

  const getGithubDetails = async () => {
    const response = await fetch(
      `https://api.github.com/user/${session?.user?.githubId}}`
    );
    const UserGitubDetails = await response.json();
    return UserGitubDetails;
  };
  const githubUserDetails = await getGithubDetails();

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
            {filteredResources?.map((resource) => {
              return (
                <Link key={resource._id} href={`/create/${resource._id}`}>
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
