'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Recommend = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // const [resource, setResource] = useState();
  const resourceCategories = [];

  const categories = [
    'photo',
    'illustration',
    'cheatsheet',
    'game',
    'HTML',
    'CSS',
    'Reddit',
    'youtube',
    'icon',
    'font',
  ];

  const toggleCategories = (event) => {
    resourceCategories.push(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formattedFormData = Object.fromEntries(formData);
    const dataWithContributer = {
      ...formattedFormData,
      contributorsGithubID: session?.user?.githubId,
      published: false,
      categories: resourceCategories,
    };

    console.log('dataWithContributer>>>>>>>>>>>>>>>', dataWithContributer);
    const response = await fetch(`/api/resource`, {
      method: 'POST',
      body: JSON.stringify(dataWithContributer),
    });

    // const emailConfirmation = await fetch(`/api/send`, {
    //   method: 'POST',
    //   body: JSON.stringify(dataWithContributer),
    // });

    const data = await response.json();
    router.push(`/resource/${data._id}`);
    console.log('response>>>>>>>', data);
  };

  // console.log('session', session);

  // interface Resource {
  //   title: string;
  //   description: string;
  //   url: string;
  //   image: string;
  //   categories: Array<string>;
  // }

  if (session && session.user) {
    return (
      <>
        <h1>Recommend</h1>
        <p>
          Recommend page you think would work here! just fill out the form and I
          will check it out and post it up.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>title:</label>
          <input name='title' type='text' />
          <label htmlFor='description'>description:</label>
          <input name='description' type='text' />
          <label htmlFor='url'>url:</label>
          <input name='url' type='text' />
          {categories.map((tag) => {
            return (
              <div key={tag}>
                <label htmlFor={tag}>{tag}</label>
                <input
                  // name={tag}
                  type='checkbox'
                  onChange={(e) => toggleCategories(e)}
                  value={tag}
                />
              </div>
            );
          })}

          <button>submit</button>
        </form>
      </>
    );
  }
  return (
    <>
      <Link href='/'> Home </Link>
      <h1>Login to access this page</h1>
    </>
  );
};

export default Recommend;
