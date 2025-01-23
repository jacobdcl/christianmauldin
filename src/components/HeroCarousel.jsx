import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import { HEADER_HEIGHT } from '../styles/SharedComponents';

const SCROLL_SPEED = 25; // Slower speed for smoother scrolling

const CarouselContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${HEADER_HEIGHT} + 2vh) 0 4vh;
  background: #fff;
  position: relative;

  @media (max-width: 768px) {
    padding: calc(${HEADER_HEIGHT} + 4vh) 0 3vh;
  }
`;

const MainImageContainer = styled.div`
  width: 100%;
  height: 65vh; // Percentage of viewport height
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-bottom: 2vh; // Viewport-relative margin

  @media (max-width: 768px) {
    height: 60vh;
    margin-bottom: 2vh;
  }
`;

const MainImage = styled.img`
  max-width: 80%;
  max-height: 100%;
  object-fit: contain;
  
  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 95%;
  }
`;

const FilmStripContainer = styled.div`
  width: 100%;
  height: 140px;
  position: relative;
  overflow: hidden;
  background: #000;

  @media (max-width: 768px) {
    height: 110px;
  }
`;

const KodakText = styled.div`
  position: absolute;
  top: 1px;
  left: -5000px; // Match FilmScratchOverlay
  width: calc(100% + 10000px); // Match FilmScratchOverlay
  color: #ffd700;
  font-family: "Courier New", monospace;
  font-size: 8px;
  font-weight: bold;
  letter-spacing: 1px;
  z-index: 5;
  white-space: nowrap;
  overflow: visible;
  pointer-events: none;

  span {
    margin-right: 350px;
  }

  @media (max-width: 768px) {
    font-size: 7px;
    span {
      margin-right: 200px;
    }
  }
`;

const FilmStrip = styled.div`
  position: absolute;
  display: flex;
  width: max-content;
  height: 100%;
  background: #000;
`;

const FilmScratchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url('/film-scratches.jpg');
  background-size: 500px 100%;
  background-repeat: repeat-x;
  mix-blend-mode: screen;
  opacity: .85;
  width: calc(100% + 10000px); // Extend well beyond viewport
  left: -5000px; // Center the extension
`;

const HolesContainer = styled.div`
  position: absolute;
  top: 0;
  left: -5000px; // Match FilmScratchOverlay
  width: calc(100% + 10000px); // Match FilmScratchOverlay
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
  padding: 12px 0;
`;

const HolesRow = styled.div`
  height: 24px;
  width: 100%;
  background-color: #000;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      /* Main holes */
      repeating-linear-gradient(
        to right,
        transparent 0,
        transparent 8px,
        rgba(255, 255, 255, 0.85) 8px,
        rgba(255, 255, 255, 0.85) 13px,
        transparent 13px,
        transparent 25px
      ),
      /* Scratchy overlay 1 */
      repeating-linear-gradient(
        70deg,
        transparent 0,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 2px,
        transparent 4px
      ),
      /* Scratchy overlay 2 */
      repeating-linear-gradient(
        -70deg,
        transparent 0,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 2px,
        transparent 4px
      );
    background-size: 25px 12px, 3px 3px, 3px 3px;
    background-repeat: repeat-x, repeat, repeat;
  }

  &.top {
    &:before {
      background-position: 0 6px, 0 0, 0 0;
    }
  }

  &.bottom {
    &:before {
      background-position: 0 8px, 0 0, 0 0;
    }
  }

  @media (max-width: 768px) {
    height: 20px;

    &:before {
      background-size: 20px 9px, 2px 2px, 2px 2px;
    }

    &.top {
      &:before {
        background-position: 0 4px, 0 0, 0 0;
      }
    }

    &.bottom {
      &:before {
        background-position: 0 7px, 0 0, 0 0;
      }
    }
  }
`;

const FilmFrameContainer = styled.div`
  position: relative;
  flex: 0 0 125px;
  height: 100%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 35px 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    flex: 0 0 85px;
    margin: 0 6px;
    padding: 28px 0;
  }
`;

const ExposureArea = styled.div`
  flex: 0 0 auto;
  background: #000;
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  align-self: center;
  width: 100%;
`;

const FrameImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const FrameNumber = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffd700;
  font-size: 9px;
  font-family: "Courier New", monospace;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  z-index: 1;

  &:before {
    content: "▶";
    color: #ffd700;
    font-size: 7px;
    transform: scaleX(1.5);
    margin-right: 1px;
  }

  @media (max-width: 768px) {
    bottom: 1px;
    font-size: 12px;
    
    &:before {
      font-size: 5px;
    }
  }
`;

function HeroCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelected, setUserSelected] = useState(false);
  const stripRef = useRef(null);
  const scrollRef = useRef({ startTime: null, totalOffset: 0 });
  const frameWidth = 200;

  const handleFrameClick = (index) => {
    setCurrentIndex(index % images.length);
    setUserSelected(true);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [works, personal] = await Promise.all([
          client.fetch('*[_type == "work"] { images[] }'),
          client.fetch('*[_type == "personal"] { images[] }')
        ]);

        const workImages = works.flatMap(work => work.images || []);
        const personalImages = personal.flatMap(collection => collection.images || []);
        const allImages = [...workImages, ...personalImages];
        const shuffledImages = allImages.sort(() => Math.random() - 0.5);
        setImages(shuffledImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!images.length || !stripRef.current) return;

    let animationFrame;

    const animate = (timestamp) => {
      if (!scrollRef.current.startTime) {
        scrollRef.current.startTime = timestamp;
      }

      const progress = timestamp - scrollRef.current.startTime;
      scrollRef.current.totalOffset += (SCROLL_SPEED / 1000) * 16.67;

      const totalWidth = frameWidth * images.length;

      if (scrollRef.current.totalOffset >= totalWidth) {
        scrollRef.current.totalOffset -= totalWidth;
        scrollRef.current.startTime = timestamp;
      }

      stripRef.current.style.transform = `translateX(-${scrollRef.current.totalOffset}px)`;

      // Only update the current index if user hasn't manually selected an image
      if (!userSelected) {
        const viewportCenter = window.innerWidth / 2;
        const scrollPosition = scrollRef.current.totalOffset;
        const adjustedPosition = (scrollPosition + viewportCenter) % (images.length * frameWidth);
        const newIndex = Math.floor(adjustedPosition / frameWidth) % images.length;

        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [images.length, currentIndex, userSelected]);

  if (!images.length) return null;

  const extendedImages = [...images, ...images, ...images, ...images, ...images];

  return (
    <CarouselContainer>
      <MainImageContainer>
        <MainImage
          src={urlFor(images[currentIndex]).width(1200).url()}
          alt="Featured work"
          loading="eager"
        />
      </MainImageContainer>
      <FilmStripContainer>
        <FilmStrip ref={stripRef}>
          <FilmScratchOverlay />
          <KodakText>
            {/* Repeat KODAK text multiple times */}
            {Array(20).fill('KODAK EPP 5005').map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </KodakText>
          <HolesContainer>
            <HolesRow className="top" />
            <HolesRow className="bottom" />
          </HolesContainer>
          {extendedImages.map((image, index) => (
            <FilmFrameContainer
              key={`${index}-${image._key || index}`}
              onClick={() => handleFrameClick(index)}
            >
              <ExposureArea>
                <FrameImage
                  src={urlFor(image).width(300).url()}
                  alt={`Frame ${(index % images.length) + 1}`}
                  loading="lazy"
                />
              </ExposureArea>
              <FrameNumber>{(index % images.length) + 1}</FrameNumber>
            </FilmFrameContainer>
          ))}
        </FilmStrip>
      </FilmStripContainer>
    </CarouselContainer>
  );
}

export default HeroCarousel; 