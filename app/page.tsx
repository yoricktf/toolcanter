import styles from './page.module.css';

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
      <h1>Resources</h1>
      {resources.map((resource: Resource) => {
        return <h1 key={resource?._id}>{resource?.title}</h1>;
      })}
    </main>
  );
}
