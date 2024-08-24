import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import CardComponent from "../../Components/Card/CardComponent";
import { Box, Grid, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Search from "../../Components/Search/Search";
import { useSelector } from "react-redux";
import Filtering from "../../Components/Filtering/FilteringByCategory";
 import { Link } from "react-router-dom";
import { stripHtmlTags } from "../../util/HtmlCleaner";

function CourseList() {
  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);
  
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  // const [hasMore , setHasMore] = useState(true)  //flag
  const pageSize = 15;
  const translate = useSelector((state) => state.Localization.translation);
  useEffect(() => {
    axios
      .get(`${baseApiUrl}?_page=${page}&_limit=${pageSize}`)
      .then((res) => {
        setCourses(res.data);
        const totalCourses = parseInt(res.headers["x-total-count"], 10);
        setTotalPages(Math.ceil(totalCourses / pageSize));
        
        // setCourses(prevCourses =>  [...prevCourses , res.data]);
        // setHasMore(res.data.length > 0)
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }, [page,baseApiUrl]);

  const handlePageChange = (event, page) => {
    // console.log(page)
    setPage(page);
  };

  const addToFavorite = () => {
    
  }

  return (
    <div className="mycontainer">
      <Search />
      {/* <Filtering /> */}
      <h4>{translate.coursesHeading}</h4>
      <Box>
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                instPic={course.visible_instructors[0].image_50x50}
                instName={course.visible_instructors[0].display_name}
                // subheader="September 14, 2016"
                media={course.image}
                courseTitle={course.title}
                content={stripHtmlTags(course.description)}
                actions={[
                  { label: "add to favorites", icon: <FavoriteIcon color="error" /> , handleFunction: addToFavorite },
                  { label: "share", icon: <ShareIcon color="info" /> },
                ]}
                CourseID={course.id}
              />
              
            </Grid>
          ))}
        </Grid>
        <Box mt={5} mb={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </div>
  );
}

export default CourseList;
