import styles from './page.module.css';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import ResourceCard from '@/components/resourceCard';
import Tags from '@/components/tags';
import ResourcesList from '@/components/resourcesList';

export default async function Home() {
  await dbConnect();
  const publishedResources = await Resource.find({ published: true });
  const latestResources = await Resource.find({ published: true })
    .sort({ createdAt: -1 }) // Sorting by createdAt field in descending order
    .limit(5);

  return (
    <>
      <header className='header'>
        <h1>Yoz&apos;s Toolbox</h1>
        <p className='description'>
          this is a collection of <span>{publishedResources.length}</span> tools
          and resources that I have put together for myself and anyone else that
          is interested in Web Development
        </p>
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
