import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

interface Collection {
  id: string;
  name: string;
}

interface CollectionPageProps {
  collection: Collection;
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collection }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Collection Details</h1>
      <p>Collection ID: {collection.id}</p>
      <p>Name: {collection.name}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [
      { params: { gameDomain: 'game1', collectionSlug: 'collection1' } },
      { params: { gameDomain: 'game1', collectionSlug: 'collection2' } },
      // Add more paths as needed
    ],
  };
};

export const getStaticProps: GetStaticProps<CollectionPageProps> = async ({ params }) => {
  const { collectionSlug, gameDomain } = params as any;

  // Fetch collection data based on the gameDomain and collectionSlug
  const collection = { id: `${collectionSlug}-${gameDomain}`, name: collectionSlug };

  if (!collection) {
    return {
      notFound: true, // Return 404 status if the collection is not found
    };
  }

  return {
    props: {
      collection,
    },
    revalidate: 1,
  };
};

export default CollectionPage;
