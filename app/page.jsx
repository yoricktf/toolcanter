import styles from './page.module.css';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
import ResourceCard from '@/components/resourceCard';
import Tag from '@/components/tag';

const contentful = require('contentful');

export default async function Home() {
  await dbConnect();
  const publishedResources = await Resource.find({ published: true });
  const categories = await Resource.distinct('categories', { published: true });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Yoz&apos;s Toolbox</h1>
        <p className={styles.description}>
          this is a collection of <span>{publishedResources.length}</span> tools
          and resources that I have put together for myself and anyone else that
          is interested in Web Development
        </p>
      </header>
      <div className={styles.resourcesBody}>
        <div>
          <menu className={styles.categories}>
            {categories.map((categoryTitle) => (
              <Tag key={categoryTitle} categoryTitle={categoryTitle} />
            ))}
          </menu>
        </div>
        <section className={`${styles.cards} cards`}>
          {publishedResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </section>
      </div>
    </main>
  );
}
