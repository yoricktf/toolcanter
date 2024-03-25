import styles from './page.module.css';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import Tags from '@/components/tags';
import ResourcesList from '@/components/ResourcesList';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import User from '@/models/User';
import Image from 'next/image';
import Link from 'next/link';
import QuickFavorites from '@/components/quickFavorites';
export default async function Home() {
  const session = await getServerSession(authOptions);

  await dbConnect();
  const numberOfPublishedResources = await Resource.countDocuments();
  const randomResources = await Resource.aggregate([
    { $match: { published: true } }, // Match only published resources
    { $sample: { size: 20 } },
  ]);
  const latestResources = await Resource.find({ published: true })
    .sort({ createdAt: -1 }) // Sorting by createdAt field in descending order
    .limit(5);
  const { favorites } = await User.findById(session?.user.id, {
    favorites: 1,
    _id: 0,
  }).populate('favorites');

  return (
    <>
      <header className='header'>
        <h1>Yoz&apos;s Toolbox</h1>
        <p className='description'>
          this is a collection of <span>{numberOfPublishedResources}</span>{' '}
          tools and resources that I have put together for myself and anyone
          else that is interested in Web Development
        </p>
        <QuickFavorites />
      </header>

      <div className='resourcesBody'>
        <Tags />
        <section className='newest'>
          <div className='cardSection'>
            <h2>Latest Resources</h2>
            <ResourcesList resources={latestResources} />
          </div>
          <div className='cardSection'>
            <h2>Featured Resources</h2>
            <ResourcesList resources={randomResources} />
          </div>
        </section>
      </div>
    </>
  );
}
