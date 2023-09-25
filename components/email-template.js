import * as React from 'react';

export const EmailTemplate = ({ title, description, url }) => (
  <div>
    <h1>a new resource has been added</h1>
    <h2>title: {title}</h2>
    <h2>description: {description}</h2>
    <h2>url: {url}</h2>
    <a href='url'>SOURCE</a>
  </div>
);
