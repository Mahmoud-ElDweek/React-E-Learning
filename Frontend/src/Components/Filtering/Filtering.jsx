import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Card, CardContent } from "@mui/material";

export default function Filtering() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/courses")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => console.error("Error", err));
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (category) {
      filtered = filtered.filter((course) => course.primary_category === category);
    }
    if (subcategory) {
      filtered = filtered.filter((course) => course.primary_subcategory === subcategory);
    }
    setFilteredCourses(filtered);
  }, [category, subcategory, courses]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(""); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const categories = [...new Set(courses.map((course) => course.primary_category))];
  const subcategories = [...new Set(courses.filter((course) => course.primary_category === category).map((course) => course.primary_subcategory))];

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange} label="Category">
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!category}>
            <InputLabel>Subcategory</InputLabel>
            <Select value={subcategory} onChange={handleSubcategoryChange} label="Subcategory">
              <MenuItem value="">All Subcategories</MenuItem>
              {subcategories.map((subcat) => (
                <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {course.primary_category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subcategory: {course.primary_subcategory}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Box, Drawer, List, ListItem, ListItemText, Slider, Typography, Divider } from "@mui/material";
// import Search from "./Search";
// import CourseList from "./CourseList";

// function Filtering() {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/courses")
//       .then((response) => {
//         setCourses(response.data);
//         setFilteredCourses(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching courses:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedSubcategory) {
//       setFilteredCourses(
//         courses.filter(
//           (course) => course.primary_subcategory === selectedSubcategory
//         )
//       );
//     } else {
//       setFilteredCourses(courses);
//     }
//   }, [selectedSubcategory, courses]);

//   const handleSubcategoryChange = (event) => {
//     setSelectedSubcategory(event.target.value);
//   };

//   return (
//     <div>
//       <Search onSubcategoryChange={handleSubcategoryChange} />
//       <CourseList courses={filteredCourses} />
//     </div>
//   );
// }

// export default App;
