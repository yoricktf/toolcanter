import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ResourceCard = ({ resource }) => {
  return (
    <div className='card'>
      <Link href={`/resource/${resource._id}`}>
        <Image
          src={resource.image}
          alt={resource.title}
          height={50}
          width={50}
        />
        <h4>{resource.title}</h4>
      </Link>
      <section className='cardCategories'>
        {resource.categories.map((category) => (
          <>
            <Link key={category} href={`/category/${category}`}>
              {category}
            </Link>
            <p> | </p>
          </>
        ))}
      </section>
    </div>
  );
};

export default ResourceCard;
