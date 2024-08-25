import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CardComponent from "../Card/CardComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

const FilteringByCategory = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    axios
      .get("http://localhost:3001/courses/")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (subcategory) {
      setFilteredCourses(
        courses.filter(
          (course) => course.primary_subcategory.title === subcategory
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [subcategory, courses]);

  const subcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          {translate.Category}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="subcategory-select-label">Category</InputLabel>
          <Select
            labelId="subcategory-select-label"
            id="subcategory-select"
            value={subcategory}
            label="Subcategory"
            onChange={subcategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {Array.from(
              new Set(courses.map((course) => course.primary_subcategory.title))
            ).map((title) => (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {subcategory && (
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
  );
};
export default FilteringByCategory;
