import React from 'react';
import Link from 'next/link';
import '@/styles/card.css';
import Image from 'next/image';
import { link } from 'fs';

const ResourceCard = ({ resource }) => {
  return (
    <div className='card'>
      <Link href={`resource/${resource._id}`}>
        <Image
          src={resource.image}
          alt={resource.title}
          height={300}
          width={300}
        ></Image>
        <h2>{resource.title}</h2>
      </Link>
      {resource.categories.map((category) => (
        <Link key={category} href={`category/${category}`}>
          <p>{category}</p>
        </Link>
      ))}
    </div>
  );
};

export default ResourceCard;
