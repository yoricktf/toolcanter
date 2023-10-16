'use client';
import React from 'react';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Categories = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // console.log(searchParams);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return <div>categories</div>;
};

export default Categories;
