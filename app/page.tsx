import styles from './page.module.css';

async function getData() {
  const res = await fetch('http://localhost:3000/api');
  const data = await res.json();
  // console.log(data);
  return data;
}

// async function sendData(data: object) {
//   const res = await fetch('http://localhost:3000/api', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

export default async function Home() {
  const resources = await getData();
  console.log('=================', resources[0]);
  // const testSend = sendData({
  //   title: 'test1',
  //   description: 'testdescription',
  //   url: 'testurl',
  //   image: 'testimage',
  //   category: ['testcategory'],
  // });

  // console.log('--------00000000000000-------------', resources.length);
  return (
    <main className={styles.main}>
      <h1>fuck</h1>
      <h1>{resources[0].title}</h1>
      <h1>{resources[7].title}</h1>
      {/* map over the resource to diaplay their titles */}
    </main>
  );
}
