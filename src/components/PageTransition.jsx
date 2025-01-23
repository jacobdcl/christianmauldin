import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageWrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: 'easeIn'
        }
    }
};

function PageTransition({ children }) {
    return (
        <PageWrapper
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </PageWrapper>
    );
}

PageTransition.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageTransition; 