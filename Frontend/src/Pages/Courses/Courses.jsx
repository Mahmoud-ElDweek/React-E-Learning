import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import CardComponent from "../../Components/Card/CardComponent";
import { Box, Grid, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Search from "../../Components/Search/Search";
import { useSelector } from "react-redux";
import { stripHtmlTags } from "../../util/HtmlCleaner";
import AddToWishList from "../../Components/Heart-Icon/AddToWishList";
import { Link } from "react-router-dom";
import FilteringByCategory from "./../../Components/FilteringByCategory/FilteringByCategory";
import FilteringByPrice from "./../../Components/FilteringByPrice/FilteringByPrice";

function CourseList() {
  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 15;
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    axios
      .get(`${baseApiUrl}?_page=${page}&_limit=${pageSize}`)
      .then((res) => {
        setCourses(res.data);
        const totalCourses = parseInt(res.headers["x-total-count"], 10);
        setTotalPages(Math.ceil(totalCourses / pageSize));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }, [page, baseApiUrl]);

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
          {courses.map((x) => (
            <Grid item key={x.id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                instPic={x.visible_instructors[0].image_50x50}
                instName={x.visible_instructors[0].display_name}
                // subheader="September 14, 2016"
                media={x.image}
                courseTitle={x.title}
                content={stripHtmlTags(x.description)}
                actions={[
                  {
                    label: "add to favorites" ,  icon: <AddToWishList CourseID={x.id} />
                  },
                  { label: "share", icon: <ShareIcon color="info" /> },
                ]}
                CourseID={x.id}
              />
                <Box mt={2}>
                  <Link
                    to={`/courses/${x.id}`}
                    style={{ textDecoration: "none" }}
                  >

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
        <Grid item xs={12}>
          <FilteringByPrice />
        </Grid>
      </Grid>
    </>
  );
}

export default CourseList;

