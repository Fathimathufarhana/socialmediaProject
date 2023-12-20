import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#3f51b5', // Set your desired background color
    color: '#fff', // Set your desired text color
    padding: '10px',
   marginLeft:"-6rem"
    // marginTop: '120rem',
  
  };

  return (
    <footer style={footerStyle}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © 2023 Your Website. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Crafted with{' '}
          <span role="img" aria-label="heart">
          🤍
          </span>{' '}
          by <Link color="inherit" href="#">
            Your Team
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
