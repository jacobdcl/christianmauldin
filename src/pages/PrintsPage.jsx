import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, urlFor } from '../lib/sanity';
import PageTransition from '../components/PageTransition';
import PrintCard from '../components/PrintCard';

const Container = styled.div`
  padding: 100px 2rem 2rem 2rem;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingText = styled.div`
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

function PrintsPage() {
    const [prints, setPrints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrints = async () => {
            try {
                const result = await client.fetch('*[_type == "print"] | order(_createdAt desc)');
                setPrints(result);
            } catch (error) {
                console.error('Error fetching prints:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrints();
    }, []);

    const handlePurchase = (print, selectedSize) => {
        // This will be implemented later when we add the purchase flow
        console.log('Purchase:', { print, selectedSize });
    };

    if (loading) {
        return (
            <PageTransition>
                <Container>
                    <LoadingText>Loading prints...</LoadingText>
                </Container>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <Container>
                <Grid>
                    {prints.map((print) => (
                        <PrintCard
                            key={print._id}
                            image={urlFor(print.image).width(600).url()}
                            title={print.title}
                            description={print.description}
                            sizes={print.sizes}
                            onPurchase={(size) => handlePurchase(print, size)}
                        />
                    ))}
                </Grid>
            </Container>
        </PageTransition>
    );
}

export default PrintsPage; 