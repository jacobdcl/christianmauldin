import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { urlFor } from '../lib/sanity';

// Constants
const SCROLL_SPEED = 25;
const FRAME_WIDTH = 125;
const FRAME_WIDTH_MOBILE = 85;
const FILM_STRIP_HEIGHT = 140;
const FILM_STRIP_HEIGHT_MOBILE = 110;
const FILM_EXTENSION = 10000; // How far the film extends beyond viewport

// Film Strip Components
const FilmStripContainer = styled.div`
  width: 100%;
  height: ${FILM_STRIP_HEIGHT}px;
  position: relative;
  overflow: hidden;
  background: #000;

  @media (max-width: 768px) {
    height: ${FILM_STRIP_HEIGHT_MOBILE}px;
  }
`;

const FilmStrip = styled.div`
  position: absolute;
  display: flex;
  width: max-content;
  height: 100%;
  background: #000;
`;

// Film Decorations
const FilmDecoration = styled.div`
  position: absolute;
  top: ${props => props.$top || 0};
  left: -${FILM_EXTENSION / 2}px;
  width: calc(100% + ${FILM_EXTENSION}px);
  height: ${props => props.$height || '100%'};
  pointer-events: none;
`;

const KodakText = styled(FilmDecoration)`
  top: 1px;
  color: #ffd700;
  font-family: "Courier New", monospace;
  font-size: 8px;
  font-weight: bold;
  letter-spacing: 1px;
  z-index: 5;
  white-space: nowrap;
  overflow: visible;

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

const FilmScratchOverlay = styled(FilmDecoration)`
  background-image: url('/film-scratches.jpg');
  background-size: 500px 100%;
  background-repeat: repeat-x;
  mix-blend-mode: screen;
  opacity: .85;
`;

const HolesContainer = styled(FilmDecoration)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
      repeating-linear-gradient(
        to right,
        transparent 0,
        transparent 8px,
        rgba(255, 255, 255, 0.85) 8px,
        rgba(255, 255, 255, 0.85) 13px,
        transparent 13px,
        transparent 25px
      ),
      repeating-linear-gradient(
        70deg,
        transparent 0,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 2px,
        transparent 4px
      ),
      repeating-linear-gradient(
        -70deg,
        transparent 0,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 2px,
        transparent 4px
      );
    background-size: 25px 12px, 3px 3px, 3px 3px;
    background-repeat: repeat-x, repeat, repeat;
    background-position: ${props => props.$isTop ? '0 6px' : '0 8px'}, 0 0, 0 0;
  }

  @media (max-width: 768px) {
    height: 20px;

    &:before {
      background-size: 20px 9px, 2px 2px, 2px 2px;
      background-position: ${props => props.$isTop ? '0 4px' : '0 7px'}, 0 0, 0 0;
    }
  }
`;

// Film Frame Components
const FilmFrameContainer = styled.div`
  position: relative;
  flex: 0 0 ${FRAME_WIDTH}px;
  height: 100%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 35px 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    flex: 0 0 ${FRAME_WIDTH_MOBILE}px;
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

function FilmStripComponent({ images, currentIndex, onFrameClick, userSelected, onIndexChange }) {
    const stripRef = useRef(null);
    const animationRef = useRef(null);
    const scrollRef = useRef({ startTime: null, totalOffset: 0 });

    // Animation effect
    useEffect(() => {
        if (!images.length || !stripRef.current) return;

        const animate = (timestamp) => {
            if (!scrollRef.current.startTime) {
                scrollRef.current.startTime = timestamp;
            }

            const progress = timestamp - scrollRef.current.startTime;
            scrollRef.current.totalOffset += (SCROLL_SPEED / 1000) * 16.67;

            const totalWidth = FRAME_WIDTH * images.length;
            if (scrollRef.current.totalOffset >= totalWidth) {
                scrollRef.current.totalOffset -= totalWidth;
                scrollRef.current.startTime = timestamp;
            }

            stripRef.current.style.transform = `translateX(-${scrollRef.current.totalOffset}px)`;

            if (!userSelected) {
                const viewportCenter = window.innerWidth / 2;
                const scrollPosition = scrollRef.current.totalOffset;
                const adjustedPosition = (scrollPosition + viewportCenter) % (images.length * FRAME_WIDTH);
                const newIndex = Math.floor(adjustedPosition / FRAME_WIDTH) % images.length;

                if (newIndex !== currentIndex) {
                    onIndexChange(newIndex);
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [images.length, currentIndex, userSelected, onIndexChange]);

    const extendedImages = Array(5).fill(images).flat();

    return (
        <FilmStripContainer>
            <FilmStrip ref={stripRef}>
                <FilmScratchOverlay />
                <KodakText>
                    {Array(20).fill('KODAK EPP 5005').map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </KodakText>
                <HolesContainer>
                    <HolesRow $isTop />
                    <HolesRow />
                </HolesContainer>
                {extendedImages.map((image, index) => (
                    <FilmFrameContainer
                        key={`${index}-${image._key || index}`}
                        onClick={() => onFrameClick(index)}
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
    );
}

export default FilmStripComponent; 