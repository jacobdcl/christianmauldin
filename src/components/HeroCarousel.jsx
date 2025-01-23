import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';

const CarouselContainer = styled.div`
  width: 100%;
  height: calc(100vh - 160px); // Subtract navbar height (80px) and margins (80px)
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 100px 0 60px 0; // Top margin after navbar, bottom margin for spacing
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  object-fit: contain;
`;

function HeroCarousel() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch all work documents and extract their images
                const works = await client.fetch('*[_type == "work"] { images[] }');
                // Flatten the array of image arrays into a single array
                const allImages = works.flatMap(work => work.images || []);
                setImages(allImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex(current => (current + 1) % images.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [images.length]);

    if (!images.length) return null;

    return (
        <CarouselContainer>
            <Image
                src={urlFor(images[currentIndex]).width(1200).url()}
                alt="Featured work"
                loading="eager"
            />
        </CarouselContainer>
    );
}

export default HeroCarousel; 