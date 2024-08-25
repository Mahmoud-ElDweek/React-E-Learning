import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function About() {
  const translate = useSelector((state) => state.Localization.translation);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          {translate.about}
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our online learning platform. We are dedicated to providing high-quality courses to learners around the world.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to make education accessible to everyone, regardless of their location or background. We offer a wide range of courses taught by expert instructors in various fields.
        </Typography>
        <Typography variant="body1">
          Join our community of learners today and start your journey towards personal and professional growth!
        </Typography>
      </Box>
    </Container>
  );
}
