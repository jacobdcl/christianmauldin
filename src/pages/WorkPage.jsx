import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import PageTransition from '../components/PageTransition';
import CollectionCarousel from '../components/CollectionCarousel';
import { HEADER_HEIGHT } from '../styles/SharedComponents';

const Container = styled.div`
  padding: calc(${HEADER_HEIGHT} + 2rem) 2rem 2rem;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
`;

const Collection = styled.div`
  margin-bottom: 8rem;

  &:last-child {
    margin-bottom: 2rem;
  }
`;

const CollectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const CollectionDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

function WorkPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const result = await client.fetch('*[_type == "work"] | order(order asc)');
        setCollections(result);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <PageTransition>
        <Container>
          <LoadingText>Loading collections...</LoadingText>
        </Container>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Container>
        {collections.map((collection) => (
          <Collection key={collection._id}>
            <CollectionTitle>{collection.title}</CollectionTitle>
            {collection.description && (
              <CollectionDescription>{collection.description}</CollectionDescription>
            )}
            <CollectionCarousel
              images={collection.images.map(image =>
                urlFor(image).width(1600).url()
              )}
            />
          </Collection>
        ))}
      </Container>
    </PageTransition>
  );
}

export default WorkPage; 