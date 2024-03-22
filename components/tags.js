import Link from 'next/link';
import Resource from '@/models/Resource';
import styles from '../app/page.module.css';

const Tags = async ({ currentCategory = 'all' }) => {
  const categories = await Resource.distinct('categories', { published: true });

  console.log('------------currentCategory: ', currentCategory);

  return (
    <menu className='categories'>
      <Link href={`/`}>
        <li className={currentCategory === 'all' ? 'active' : null}>Home</li>
      </Link>
      {categories.map((categoryTitle) => (
        <Link key={categoryTitle} href={`/category/${categoryTitle}`}>
          <li className={categoryTitle === currentCategory ? 'active' : null}>
            {categoryTitle}
          </li>
        </Link>
      ))}
    </menu>
  );
};

export default Tags;
