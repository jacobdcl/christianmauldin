import styled from 'styled-components';

// Define a constant for header height to use across components
export const HEADER_HEIGHT = '80px';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  padding-top: calc(${HEADER_HEIGHT} + 2rem); // Header height plus padding
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Card = styled.div`
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

export const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export const Modal = styled.div`
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

export const ModalHeader = styled.div`
  padding: 1.5rem;
  color: white;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const ModalDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
`;

export const CloseButton = styled.button`
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