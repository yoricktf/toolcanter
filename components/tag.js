import Link from 'next/link';

const Tag = ({ categoryTitle }) => {
  return (
    <li key={categoryTitle}>
      <Link href={`category/${categoryTitle}`}>{categoryTitle}</Link>
    </li>
  );
};

export default Tag;
