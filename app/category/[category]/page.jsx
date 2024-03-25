import dbConnect from '@/utils/dbConnect';
import React from 'react';
import Resource from '@/models/Resource';
import Tags from '@/components/tags';
import ResourcesList from '@/components/resourcesList';
import QuickFavorites from '@/components/quickFavorites';

const Categories = async ({ params }) => {
  const { category } = params;
  await dbConnect();
  const filteredResources = await Resource.find({ categories: category });
  return (
    <>
      <header className='header'>
        <h1>{category} Resources</h1>
        <p className='description'>
          {filteredResources.length === 1
            ? `There Is ${filteredResources.length} item here, why not add some more!`
            : `There Are ${filteredResources.length} items here. `}
        </p>
        <QuickFavorites />
      </header>
      <div className='resourcesBody'>
        <Tags currentCategory={category} />
        <div className='cardSection'>
          <ResourcesList resources={filteredResources} />
        </div>
      </div>
    </>
  );
};

export default Categories;
