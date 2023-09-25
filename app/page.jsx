import styles from './page.module.css';
import Link from 'next/link';
import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';

export default async function Home() {
  await dbConnect();
  const foundResources = await Resource.find();

  const filteredResources = foundResources.filter((resource) => {
    return resource.published === true;
  });

  return (
    <main className={styles.main}>
      <h1>Yoz&apos;s Toolbox</h1>
      <p className={styles.description}>
        this is a collection of {filteredResources.length} tools and resources
        that I have put together for myself and anyone else that is interested
        in Web Development
      </p>
      {filteredResources.map((resource) => {
        return (
          <Link
            href={`resource/${resource._id}`}
            key={resource._id}
            className={styles.card}
          >
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            {resource.category}
            {/* {resource.category.map((category: string) => (
              <p key={category}>{category}</p>
            ))} */}
          </Link>
        );
      })}
    </main>
  );
}
