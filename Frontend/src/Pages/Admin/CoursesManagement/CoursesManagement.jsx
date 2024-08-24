import React, { useEffect, useState } from 'react'
import CardComponent from '../../../Components/Card/CardComponent'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Box, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';


const CoursesManagement = () => {
  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15;

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
  }, [page,baseApiUrl]);

  const handlePageChange = (event, page) => {
    // console.log(page)
    setPage(page);
  };


  const editCourse = (CourseID) => {

  }

  const deleteCourse = (CourseID) => {
    const deletingCourse = async () => {
      const res = await axios.delete(`http://localhost:3001/courses/${CourseID}`)
              setCourses((prevCourses) => prevCourses.filter(course => course.id !== CourseID));
      console.log(CourseID);
      
    }
    deletingCourse()
  }
  return (
    <>
      <Grid container spacing={2}>


        {courses && courses.map((course) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={course.id}>
            <CardComponent
              instPic={course.visible_instructors[0].image_50x50}
              instName={course.visible_instructors[0].display_name}
              // subheader="September 14, 2016"
              media={course.image}
              courseTitle={course.title}
              // content={course.description}
              actions={[
                { label: 'Edit', icon: <EditIcon color='info' />, handleFunction: () => editCourse(course.id)},
                { label: 'Delete', icon: <DeleteIcon color='error' />, handleFunction: () => deleteCourse(course.id) },
              ]}
            />

          </Grid>
        ))
        }
      </Grid>
      <Box mt={5} mb={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
    </>
  )
}

export default CoursesManagement