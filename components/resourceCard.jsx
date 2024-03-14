import React from 'react';
import Link from 'next/link';
import '@/styles/card.css';
import Image from 'next/image';
import { link } from 'fs';

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
      <section className='categories'>
        {resource.categories.map((category) => (
          <Link key={category} href={`/category/${category}`}>
            {category}
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ResourceCard;
