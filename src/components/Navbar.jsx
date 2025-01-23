import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.background};
`;

const Logo = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background};
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1.5rem;
    transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  letter-spacing: -0.01em;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  opacity: ${props => props.$isActive ? '1' : '0.8'};
  position: relative;
  padding-bottom: 2px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(${props => props.$isActive ? '1' : '0'});
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 1;
    &:after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.$isOpen ? '600' : '400'};
  opacity: ${props => props.$isOpen ? '1' : '0.8'};
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const getCurrentPageName = (pathname) => {
  switch (pathname) {
    case '/':
      return 'home';
    case '/work':
      return 'work';
    case '/personal':
      return 'personal';
    case '/prints':
      return 'prints';
    case '/about':
      return 'about';
    default:
      return '';
  }
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = getCurrentPageName(location.pathname);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Nav>
      <Logo to="/">christian mauldin</Logo>
      <MobileMenuButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        $isOpen={isMenuOpen}
      >
        {currentPage} {isMenuOpen ? '×' : '↓'}
      </MobileMenuButton>
      <NavLinks $isOpen={isMenuOpen}>
        <NavLink
          to="/work"
          $isActive={location.pathname === '/work'}
          onClick={handleLinkClick}
        >
          work
        </NavLink>
        <NavLink
          to="/personal"
          $isActive={location.pathname === '/personal'}
          onClick={handleLinkClick}
        >
          personal
        </NavLink>
        <NavLink
          to="/prints"
          $isActive={location.pathname === '/prints'}
          onClick={handleLinkClick}
        >
          prints
        </NavLink>
        <NavLink
          to="/about"
          $isActive={location.pathname === '/about'}
          onClick={handleLinkClick}
        >
          about
        </NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar; 