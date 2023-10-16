import React from 'react';
import Link from 'next/link';
import '@/styles/card.css';
import Image from 'next/image';

const ResourceCard = ({ resource }) => {
  return (
    <Link href={`resource/${resource._id}`} className='card'>
      <h2>{resource.title}</h2>
      <p>{resource.description}</p>
      <Image
        src={resource.image}
        alt={resource.title}
        height={200}
        width={200}
      ></Image>
      {resource.categories.map((category) => (
        <p key={category}>{category}</p>
      ))}
    </Link>
  );
};

export default ResourceCard;
