import dbConnect from '@/utils/dbConnect';
import React from 'react';
import Resource from '@/models/Resource';
import ResourceCard from '@/components/resourceCard';

const Categories = async ({ params }) => {
  const { category } = params;
  await dbConnect();
  const filteredResources = await Resource.find({ categories: category });
  console.log('filteredResources---------------:', filteredResources);
  return (
    <div>
      {filteredResources.map((resource) => {
        return <ResourceCard key={resource._id} resource={resource} />;
      })}
    </div>
  );
};

export default Categories;
