import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import CardComponent from "../../Components/Card/CardComponent";
import { Box, Grid, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Search from "../../Components/Search/Search";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FilteringByCategory from "./../../Components/FilteringByCategory/FilteringByCategory";
import FilteringByPrice from "./../../Components/FilteringByPrice/FilteringByPrice";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 15;
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses?_page=${page}&_limit=${pageSize}`)
      .then((res) => {
        setCourses(res.data);
        const totalCourses = parseInt(res.headers["x-total-count"], 10);
        setTotalPages(Math.ceil(totalCourses / pageSize));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }, [page]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  return (
    <>
      <Search />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <FilteringByCategory />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {translate.coursesHeading}
          </Typography>
          <Grid container spacing={2}>
            {courses.map((course) => (
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
                <Box mt={2}>
                  <Link
                    to={`/courses/${course.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained" fullWidth>
                      Learn More
                    </Button>
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <FilteringByPrice />
        </Grid>
      </Grid>
    </>
  );
}

export default CourseList;
