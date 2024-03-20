import styles from './page.module.css';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import Tags from '@/components/tags';
import ResourcesList from '@/components/resourcesList';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';
import User from '@/models/User';
import Image from 'next/image';
import Link from 'next/link';
export default async function Home() {
  const session = await getServerSession(authOptions);

  await dbConnect();
  const publishedResources = await Resource.find({ published: true });
  const latestResources = await Resource.find({ published: true })
    .sort({ createdAt: -1 }) // Sorting by createdAt field in descending order
    .limit(5);

  const { favorites } = await User.findById(session?.user.id, {
    favorites: 1,
    _id: 0,
  }).populate('favorites');

  console.log('------------userFavorites: ', favorites);

  return (
    <>
      <header className='header'>
        <h1>Yoz&apos;s Toolbox</h1>
        <p className='description'>
          this is a collection of <span>{publishedResources.length}</span> tools
          and resources that I have put together for myself and anyone else that
          is interested in Web Development
        </p>
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
      </header>

      <div className='resourcesBody'>
        <Tags />
        <section className='newest'>
          <h2>Latest Resources</h2>
          <ResourcesList resources={latestResources} />
          <h2>All Resources</h2>
          <ResourcesList resources={publishedResources} />
        </section>
      </div>
    </>
  );
}
