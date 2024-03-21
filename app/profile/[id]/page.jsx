import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import { CldOgImage } from 'next-cloudinary';
import ResourcesList from '@/components/resourcesList';

const Profile = async ({ params }) => {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const unpublishedResources = await Resource.find({ published: false });

  const getGithubDetails = async () => {
    const response = await fetch(
      `https://api.github.com/user/${session?.user?.githubId}}`
    );
    const UserGitubDetails = await response.json();
    return UserGitubDetails;
  };

  const githubUserDetails = await getGithubDetails();
  const userFavorites = await User.findById(params?.id, {
    favorites: 1,
    _id: 0,
  }).populate('favorites');

  const userContributions = await Resource.find({
    githubId: session?.user?.gitHubId,
  });

  const handleAdmin = async (e) => {
    'use server';
    try {
      const userId = params?.id;
      if (!userId) {
        console.log('User ID is missing');
        return;
      }

      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return;
      }

      user.admin = !user.admin;

      const updatedUser = await user.save();
      console.log(
        `Admin status toggled for user ${userId}: ${updatedUser.admin}`
      );
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  if (session) {
    return (
      <>
        <h1>hello {githubUserDetails?.name}</h1>
        <img
          // width={663}
          // height={104}
          className='githubContributions'
          src={`https://ghchart.rshah.org/${githubUserDetails?.login}`}
          alt='Name Your Github chart'
        />
        <h2>Your Favorites</h2>
        {session.user.favorites.length === 0 && <p>no favorites</p>}
        <ResourcesList resources={userFavorites.favorites} />
        <h2>
          {githubUserDetails.name} has {userContributions.length} contributions
        </h2>
        <ResourcesList resources={userContributions} />
        {session.user.admin && (
          <form action={handleAdmin}>
            <button>Make Admin</button>
          </form>
        )}
      </>
    );
  } else {
    return <div>please login</div>;
  }
};

export default Profile;
