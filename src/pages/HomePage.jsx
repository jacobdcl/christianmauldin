import PageTransition from '../components/PageTransition';
import HeroCarousel from '../components/HeroCarousel';
import styled from 'styled-components';

const FullPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

function HomePage() {
    return (
        <PageTransition>
            <FullPageContainer>
                <HeroCarousel />
            </FullPageContainer>
        </PageTransition>
    );
}

export default HomePage; 