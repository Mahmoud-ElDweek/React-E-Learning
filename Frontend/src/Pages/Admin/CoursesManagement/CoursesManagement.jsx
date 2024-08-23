import React, { useEffect, useState } from 'react'
import CardComponent from '../../../Components/Card/CardComponent'
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Grid';


const CoursesManagement = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(`http://localhost:3001/courses`)
      const CoursesData = res.data
      console.log(CoursesData);

      setCourses(CoursesData)
    }
    fetchCourses()
  }, [])

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
                { label: 'add to favorites', icon: <FavoriteIcon /> },
                { label: 'share', icon: <ShareIcon /> }
              ]}
            />

          </Grid>
        ))
        }
      </Grid>
    </>
  )
}

export default CoursesManagement