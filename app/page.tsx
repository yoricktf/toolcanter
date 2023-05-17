import styles from './page.module.css';

async function getData() {
  const res = await fetch('http://localhost:3000/api');
  return res.json();
}

async function sendData(data: object) {
  const res = await fetch('http://localhost:3000/api', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function Home() {
  const test = getData();
  const testSend = sendData({
    title: 'test1',
    description: 'testdescription',
    url: 'testurl',
    image: 'testimage',
    category: ['testcategory'],
  });
  return (
    <main className={styles.main}>
      <h1>fuck</h1>
    </main>
  );
}
