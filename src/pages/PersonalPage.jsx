import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import PageTransition from '../components/PageTransition';
import ImageCarousel from '../components/ImageCarousel';
import CyclingImage from '../components/CyclingImage';

const Container = styled.div`
  padding: 100px 2rem 2rem 2rem;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 
              0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 
                0 8px 16px rgba(0, 0, 0, 0.08);
  }
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  color: white;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ModalDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 2;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CarouselContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

function PersonalPage() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
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
                <Grid>
                    {collections.map((collection) => (
                        <Card
                            key={collection._id}
                            onClick={() => setSelectedCollection(collection)}
                        >
                            <CardImage>
                                <CyclingImage
                                    images={collection.images.map(image =>
                                        urlFor(image).width(600).url()
                                    )}
                                    alt={collection.title}
                                />
                            </CardImage>
                            <CardContent>
                                <CardTitle>{collection.title}</CardTitle>
                                <CardDescription>{collection.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                {selectedCollection && (
                    <Modal
                        $isOpen={!!selectedCollection}
                        onClick={() => setSelectedCollection(null)}
                    >
                        <CloseButton onClick={() => setSelectedCollection(null)}>
                            ×
                        </CloseButton>
                        <ModalHeader>
                            <ModalTitle>{selectedCollection.title}</ModalTitle>
                            <ModalDescription>{selectedCollection.description}</ModalDescription>
                        </ModalHeader>
                        <CarouselContainer onClick={e => e.stopPropagation()}>
                            <ImageCarousel
                                images={selectedCollection.images.map(image =>
                                    urlFor(image).width(1200).url()
                                )}
                            />
                        </CarouselContainer>
                    </Modal>
                )}
            </Container>
        </PageTransition>
    );
}

export default PersonalPage; 