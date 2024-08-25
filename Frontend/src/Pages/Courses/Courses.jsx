import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import CardComponent from "../../Components/Card/CardComponent";
import { Box, Grid } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Search from "../../Components/Search/Search";
import { useSelector } from "react-redux";
import { stripHtmlTags } from "../../util/HtmlCleaner";
import AddToWishList from "../../Components/Heart-Icon/AddToWishList";

function CourseList() {
  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);

  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 15;
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    axios
      .get(`${baseApiUrl}`)
      .then((res) => {
        setCourses(res.data);
        setTotalPages(Math.ceil(res.data.length / pageSize));
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  }, [baseApiUrl]);

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCourses(courses.slice(startIndex, endIndex));
  }, [page, courses]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  return (
    <div className="mycontainer">
      <Search />
      <h4>{translate.coursesHeading}</h4>
      <Box>
        <Grid container spacing={2}>
          {displayedCourses.map((x) => (
            <Grid item key={x.id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                instPic={x.visible_instructors[0].image_50x50}
                instName={x.visible_instructors[0].display_name}
                media={x.image}
                courseTitle={x.title}
                content={stripHtmlTags(x.description)}
                actions={[
                  {
                    label: "add to favorites" , icon: <AddToWishList CourseID={x.id} />
                  },
                  { label: "share", icon: <ShareIcon color="info" /> },
                ]}
                CourseID={x.id}
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
