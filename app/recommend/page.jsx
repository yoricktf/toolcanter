'use client';
import styles from './reccomend.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Recommend = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const resourceCategories = [];

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const categories = await response.json();
    console.log('categories===============', categories);
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategories = (event) => {
    resourceCategories.push(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formattedFormData = Object.fromEntries(formData);
    const newTagsArray = formattedFormData.newTags.split(' ');
    const dataWithContributer = {
      ...formattedFormData,
      contributorsGithubID: session?.user?.githubId,
      categories: [...resourceCategories, ...newTagsArray],
      published: false,
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

  // interface Resource {
  //   title: string;
  //   description: string;
  //   url: string;
  //   image: string;
  //   categories: Array<string>;
  // }

  if (session && session.user) {
    return (
      <main className={styles.main}>
        <h1>Recommend</h1>
        <p>
          Recommend page you think would work here! just fill out the form and I
          will check it out and post it up.
        </p>
        <form id={styles.Forms} onSubmit={handleSubmit}>
          <label htmlFor='title'>title:</label>
          <input name='title' type='text' />
          <label htmlFor='description'>description:</label>
          <input name='description' type='text' />
          <label htmlFor='url'>url:</label>
          <input name='url' type='text' />
          <section className={styles.tags}>
            {categories.map((tag) => {
              return (
                <div className={styles.tag} key={tag}>
                  <input
                    type='checkbox'
                    onChange={(e) => toggleCategories(e)}
                    value={tag}
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              );
            })}
          </section>
          <label id='newTags'>define your own tags:</label>
          <input
            name='newTags'
            type='text'
            id='newTags'
            placeholder='CSS HTML Javascript'
          />
          <p className={styles.details}>enter your tags seperated by a space</p>
          <button>submit</button>
        </form>
      </main>
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
