import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import PageTransition from '../components/PageTransition';
import CollectionCarousel from '../components/CollectionCarousel';
import { HEADER_HEIGHT } from '../styles/SharedComponents';

const Container = styled.div`
  padding: calc(${HEADER_HEIGHT} + 2rem) 0 4rem;
  min-height: 100vh;
  max-width: 100%;
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const Collection = styled.div`
  margin-bottom: 8rem;
  padding: 0 2rem;

  &:last-child {
    margin-bottom: 2rem;
  }

  /* Remove padding for the carousel */
  > *:last-child {
    margin: 0 -2rem;
    width: calc(100% + 4rem);
  }
`;

const CollectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  text-align: center;
`;

const CollectionDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

function PersonalPage() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const result = await client.fetch('*[_type == "personal"] | order(order asc)');
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

export default PersonalPage; 