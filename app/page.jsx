import styles from './page.module.css';
import Link from 'next/link';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import ResourceCard from '@/components/resourceCard';

export default async function Home() {
  await dbConnect();
  const publishedResources = await Resource.find({ published: true });

  return (
    <main className={styles.main}>
      <h1>Yoz&apos;s Toolbox</h1>
      <p className={styles.description}>
        this is a collection of {publishedResources.length} tools and resources
        that I have put together for myself and anyone else that is interested
        in Web Development
      </p>
      <div className='cards'>
        {publishedResources.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    </main>
  );
}
