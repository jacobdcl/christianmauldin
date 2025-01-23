import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 1s ease;
`;

function HomeCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    if (!images.length) return null;

    return (
        <Container>
            {images.map((image, index) => (
                <Image
                    key={image.url}
                    src={image.url}
                    alt={image.alt || 'Featured photograph'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    $active={index === currentIndex}
                />
            ))}
        </Container>
    );
}

export default HomeCarousel;