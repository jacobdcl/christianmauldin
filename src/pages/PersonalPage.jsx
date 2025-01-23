import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import PageTransition from '../components/PageTransition';
import ImageCarousel from '../components/ImageCarousel';
import CyclingImage from '../components/CyclingImage';
import {
    PageContainer,
    Grid,
    Card,
    CardImage,
    CardContent,
    CardTitle,
    CardDescription,
    LoadingText,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    CloseButton
} from '../styles/SharedComponents';

const CarouselContainer = styled.div`
    flex: 1;
    padding: 2rem;
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
                <PageContainer>
                    <LoadingText>Loading collections...</LoadingText>
                </PageContainer>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <PageContainer>
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
            </PageContainer>
        </PageTransition>
    );
}

export default PersonalPage; 