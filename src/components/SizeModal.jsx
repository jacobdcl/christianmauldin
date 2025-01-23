import { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: transform 0.2s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ModalDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SizeOption = styled.button`
  padding: 1rem;
  border: 1px solid ${props => props.$selected ? '#000' : '#ddd'};
  border-radius: 8px;
  background: ${props => props.$selected ? '#000' : '#fff'};
  color: ${props => props.$selected ? '#fff' : '#000'};
  cursor: ${props => props.$inStock ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.$inStock ? 1 : 0.5};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #000;
    opacity: ${props => props.$inStock ? 1 : 0.5};
  }
`;

const SizeName = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Price = styled.div`
  font-size: 1rem;
  color: ${props => props.$selected ? '#fff' : '#666'};
`;

const PurchaseButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.$enabled ? '#000' : '#ddd'};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.$enabled ? 'pointer' : 'not-allowed'};
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.$enabled ? '#222' : '#ddd'};
  }
`;

function SizeModal({ isOpen, onClose, title, description, image, sizes, onPurchase }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    if (!size.inStock) return;
    setSelectedSize(size);
  };

  const handlePurchase = () => {
    if (selectedSize && onPurchase) {
      onPurchase(selectedSize);
      setSelectedSize(null);
    }
  };

  const formatSize = (size) => `${size.width}" × ${size.height}"`;

  return (
    <Modal $isOpen={isOpen} onClick={onClose}>
      <ModalContent $isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <ModalDescription>{description}</ModalDescription>
        <SizeGrid>
          {sizes.map((size) => (
            <SizeOption
              key={`${size.width}-${size.height}`}
              $selected={selectedSize?.width === size.width && selectedSize?.height === size.height}
              $inStock={size.inStock}
              onClick={() => handleSizeSelect(size)}
              disabled={!size.inStock}
            >
              <SizeName>{formatSize(size)}</SizeName>
              <Price $selected={selectedSize?.width === size.width && selectedSize?.height === size.height}>
                ${size.price}
              </Price>
            </SizeOption>
          ))}
        </SizeGrid>
        <PurchaseButton
          $enabled={!!selectedSize}
          disabled={!selectedSize}
          onClick={handlePurchase}
        >
          {selectedSize ? `PURCHASE ${formatSize(selectedSize)} →` : 'SELECT A SIZE'}
        </PurchaseButton>
      </ModalContent>
    </Modal>
  );
}

export default SizeModal;