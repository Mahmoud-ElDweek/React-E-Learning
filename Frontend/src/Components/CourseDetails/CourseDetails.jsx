import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
export default function CourseDetails() {
  const [course, setCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => {
        console.error("Error ", err);
      });
  }, [id]);

  return (
    <Container maxWidth="md">
      <Card sx={{ 
        maxWidth: "100%", 
        margin: "auto", 
        mt: 5, 
        boxShadow: 3,
        borderRadius: 2,
      }}>
        <CardMedia
          component="img"
          height="400"
          image={course.image}
          alt={course.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
            {course.title}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'medium' }}>
              Price: {course.price_detail?.price_string}
            </Typography>
            <Chip 
              label={`Rating: ${course.rating?.toFixed(2)}`} 
              color="secondary" 
              icon={<StarIcon />} 
              variant="outlined"
              sx={{
                fontWeight: 'bold',
                '& .MuiChip-icon': {
                  color: 'gold',
                },
              }}
            />

          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {course.headline}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
