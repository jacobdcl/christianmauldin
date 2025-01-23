import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import PageTransition from '../components/PageTransition';
import HomeCarousel from '../components/HomeCarousel';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function HomePage() {
    const [carouselImages, setCarouselImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.fetch('*[_type == "homeCarousel"]');
                const processedImages = result.map(item => ({
                    url: urlFor(item.image).url(),
                    alt: item.alt
                }));
                setCarouselImages(processedImages);
            } catch (error) {
                console.error('Error fetching carousel images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return null;

    return (
        <PageTransition>
            <Container>
                <HomeCarousel images={carouselImages} />
            </Container>
        </PageTransition>
    );
}

export default HomePage; 