import ResourceCard from './ResourceCard';
import styles from '../app/page.module.css';

const ResourcesList = ({ resources }) => {
  return (
    <section className={`${styles.cards} cards`}>
      {resources.map((resource) => {
        return <ResourceCard key={resource._id} resource={resource} />;
      })}
    </section>
  );
};

export default ResourcesList;
