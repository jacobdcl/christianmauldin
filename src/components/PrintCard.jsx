import { useState } from 'react';
import styled from 'styled-components';
import SizeModal from './SizeModal';

const Card = styled.div`
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

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;

function PrintCard({ image, title, description, sizes, onPurchase }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card onClick={() => setIsModalOpen(true)}>
        <CardImage>
          <Image src={image} alt={title} loading="lazy" />
        </CardImage>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>

      <SizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        image={image}
        sizes={sizes}
        onPurchase={(size) => {
          onPurchase(size);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

export default PrintCard; 