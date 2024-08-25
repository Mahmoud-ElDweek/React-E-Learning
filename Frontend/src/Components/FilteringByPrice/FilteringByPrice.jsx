import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Grid, InputAdornment, Box, Typography, Slider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardComponent from "./../Card/CardComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

const FilteringByPrice = () => {
  const [price, setPrice] = useState(0);
  const [courses, setCourses] = useState([]);
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    axios
      .get("http://localhost:3001/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error :", error));
  }, []);

  const filteredCourses = courses.filter((course) => {
    return course.price_detail.amount <= price;
  });
  

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {translate.filterByPrice}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
        <TextField
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          variant="outlined"
          type="number"
          InputProps={{
            inputProps: { min: 0, max: 1000 },
          }}
          sx={{ width: 100, mr: 2 }}
        />
        <Slider
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          aria-labelledby="price-slider"
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ flexGrow: 1 }}
        />
      {price > 0 && (
        <Box>
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <CardComponent
                  instPic={course.visible_instructors[0].image_50x50}
                  instName={course.visible_instructors[0].display_name}
                  media={course.image}
                  courseTitle={course.title}
                  actions={[
                    { label: "add to favorites", icon: <FavoriteIcon /> },
                    { label: "share", icon: <ShareIcon /> },
                  ]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      </Box>
      </Box>
  );
};

export default FilteringByPrice;
