import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 6rem 2rem;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$left ? 'left: 1rem;' : 'right: 1rem;'}
`;

const Counter = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  z-index: 3;
`;

function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex(current => (current === 0 ? images.length - 1 : current - 1));
    };

    const handleNext = () => {
        setCurrentIndex(current => (current === images.length - 1 ? 0 : current + 1));
    };

    if (!images || images.length === 0) return null;

    return (
        <Container>
            <Button
                $left
                onClick={handlePrevious}
                disabled={images.length <= 1}
                aria-label="Previous image"
            >
                ←
            </Button>

            <ImageWrapper>
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1} of ${images.length}`}
                    loading={currentIndex === 0 ? 'eager' : 'lazy'}
                />
            </ImageWrapper>

            <Button
                onClick={handleNext}
                disabled={images.length <= 1}
                aria-label="Next image"
            >
                →
            </Button>

            <Counter>
                {currentIndex + 1} / {images.length}
            </Counter>
        </Container>
    );
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageCarousel; 