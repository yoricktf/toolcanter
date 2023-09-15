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
    // console.log('=====-------=======------', process.env.ROOT);
    // const res = await fetch('http://localhost:3000/api');
    const res = await fetch(`${process.env.ROOT_LOCATION}/api/resource`);
    const data = await res.json();
    return data;
  }

  // async function sendData(data: object) {
  //   const res = await fetch('http://localhost:3000/api', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  //   return res.json();
  // }

  const resources = await getData();
  console.log('RESOURCES+++++++++++=', resources);

  const filteredResources = resources.filter((resource: Resource) => {
    return resource.published === true;
  });

  // console.log(resources);

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
        this is a collection of {filteredResources.length} tools and resources
        that I have put together for myself and anyone else that is interested
        in Web Development
      </p>
      {filteredResources.map((resource: Resource) => {
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
