import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
`;

function CyclingImage({ images, alt, interval = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    if (!images.length) return null;

    return (
        <Image
            src={images[currentIndex]}
            alt={alt}
            loading="lazy"
        />
    );
}

export default CyclingImage; 