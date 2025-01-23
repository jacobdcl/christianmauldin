const theme = {
  colors: {
    primary: '#000000',
    background: '#FFFFFF',
    text: '#000000',
    button: '#000000',
    buttonText: '#FFFFFF'
  },
  spacing: (multiplier = 1) => `${4 * multiplier}px`,
  typography: {
    h1: {
      fontSize: '4rem',
      fontWeight: '700',
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '600',
      letterSpacing: '-0.01em'
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400'
    }
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px'
  }
};

export default theme; 