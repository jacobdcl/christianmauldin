import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0rem;
  padding: 0 1rem;
  height: 85vh;
  min-height: 600px;
  background-color: transparent;

  @media (max-width: 768px) {
    gap: 0rem;
    padding: 0 0.15rem;
    height: 55vh;
    min-height: 300px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${props => props.$active ? 1 : 0};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  padding: 1rem 0.5rem;
  color: #000;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  height: 100%;
  min-width: 28px;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 25px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const ProgressDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#000' : '#ddd'};
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? '#000' : '#999'};
  }
`;

function CollectionCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused && images.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex(current => (current === images.length - 1 ? 0 : current + 1));
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [images.length, isPaused]);

    const handlePrevious = () => {
        setIsPaused(true);
        setCurrentIndex(current => (current === 0 ? images.length - 1 : current - 1));
    };

    const handleNext = () => {
        setIsPaused(true);
        setCurrentIndex(current => (current === images.length - 1 ? 0 : current + 1));
    };

    const handleDotClick = (index) => {
        setIsPaused(true);
        setCurrentIndex(index);
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    if (!images || images.length === 0) return null;

    return (
        <Container>
            <NavigationButton
                onClick={handlePrevious}
                disabled={images.length <= 1}
                aria-label="Previous image"
            >
                ‹
            </NavigationButton>

            <ImageContainer>
                {images.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Image ${index + 1} of ${images.length}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        onLoad={handleImageLoad}
                        $active={index === currentIndex}
                        style={{
                            zIndex: index === currentIndex ? 1 : 0,
                            opacity: loading && index === 0 ? 0 : undefined
                        }}
                    />
                ))}
            </ImageContainer>

            <NavigationButton
                onClick={handleNext}
                disabled={images.length <= 1}
                aria-label="Next image"
            >
                ›
            </NavigationButton>

            {images.length > 1 && (
                <ProgressBar>
                    {images.map((_, index) => (
                        <ProgressDot
                            key={index}
                            $active={index === currentIndex}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </ProgressBar>
            )}
        </Container>
    );
}

CollectionCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CollectionCarousel;