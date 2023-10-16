import styles from './page.module.css';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import ResourceCard from '@/components/resourceCard';
import Tag from '@/components/tag';

export default async function Home() {
  await dbConnect();
  const publishedResources = await Resource.find({ published: true });
  const categories = await Resource.distinct('categories');

  return (
    <main className={styles.main}>
      <h1>Yoz&apos;s Toolbox</h1>
      <p className={styles.description}>
        this is a collection of {publishedResources.length} tools and resources
        that I have put together for myself and anyone else that is interested
        in Web Development
      </p>
      <div className='resourcesBody'>
        <menu className='categories'>
          {categories.map((categoryTitle) => (
            <Tag key={categoryTitle} categoryTitle={categoryTitle} />
          ))}
        </menu>
        <section className='cards'>
          {publishedResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </section>
      </div>
    </main>
  );
}
