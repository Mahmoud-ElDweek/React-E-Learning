import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CardComponent from '../../Components/Card/CardComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

export default function Home() {
  const translate = useSelector((state) => state.Localization.translation);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/courses')
      .then(response => {
        const sortedCourses = response.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setFeaturedCourses(sortedCourses);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
  };

  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            {translate.Schedule}
          </Typography>
          <Typography variant="h5" paragraph>
            {translate.Choose}
          </Typography>
          <Button variant="contained" color="secondary" component={Link} to="/courses" size="large">
            {translate.Explore}
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {translate.FeaturedCourses}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <IconButton 
            onClick={prevSlide} 
            sx={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton 
            onClick={nextSlide} 
            sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Box sx={{ overflow: 'hidden' }}>
            <Grid container spacing={4} sx={{ transform: `translateX(-${currentSlide * 33.33}%)`, transition: 'transform 0.5s ease' }}>
              {featuredCourses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <CardComponent
                    instPic={course.visible_instructors[0].image_50x50}
                    instName={course.visible_instructors[0].display_name}
                    media={course.image}
                    courseTitle={course.title}
                    price={course.price_detail.amount}
                    actions={[
                      { label: "add to favorites", icon: <FavoriteIcon /> },
                      { label: "share", icon: <ShareIcon /> },
                    ]}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>

      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            {translate.StartLearning}
          </Typography>
          <Typography variant="h6" paragraph>
            {translate.Join}
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/signup" size="large">
            {translate.SignUp}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
