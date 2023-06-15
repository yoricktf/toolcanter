import styles from './page.module.css';
import Link from 'next/link';

export default async function Home() {
  interface Resource {
    _id: string;
    title: string;
    description: string;
    url: string;
    image: string;
    category: string[];
    published: boolean;
  }

  async function getData() {
    const res = await fetch('http://localhost:3000/api');
    const data = await res.json();
    console.log(data);
    return data;
  }

  async function sendData(data: object) {
    const res = await fetch('http://localhost:3000/api', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  }

  const resources = await getData();

  // const testSend = sendData({
  //   title: 'test1',
  //   description: 'testdescription',
  //   url: 'testurl',
  //   image: 'testimage',
  //   category: ['testcategory'],
  // });

  return (
    <main className={styles.main}>
      <h1>Yoz&apos;s Toolbox</h1>
      <p className={styles.description}>
        this is a collection of tools and resources that I have put together for
        myself and anyone else that is interested in Web Development
      </p>
      {resources.map((resource: Resource) => {
        return (
          <div key={resource._id} className={styles.card}>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            {resource.category.map((category: string) => (
              <p key={category}>{category}</p>
            ))}
            <Link href={`resource/${resource._id}`}>{resource.title}</Link>
          </div>
        );
      })}
    </main>
  );
}
