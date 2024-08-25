import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';



const CourseForm = () => {
  const navigate = useNavigate();

  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);
  const { id } = useParams();
  
  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructorName: '',
    subCategoryName: '',
    image: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${baseApiUrl}/${id}`)
        .then(response => {
          const fetchedCourse = response.data;
          
          setCourse({
            title: fetchedCourse.title || '',
            description: fetchedCourse.description || '',
            instructorName: fetchedCourse.visible_instructors[0]?.display_name || '',
            subCategoryName: fetchedCourse.primary_subcategory?.title || '',
            image: fetchedCourse.image || ''
          });
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch course", error);
          setError("Failed to load course data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, baseApiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const courseData = {
      ...course,
      visible_instructors: [{ display_name: course.instructorName }],
      primary_subcategory: { title: course.subCategoryName }
    };

    if (id) {
      axios.put(`${baseApiUrl}/${id}`, courseData)
        .then(() => {
          console.log("Course updated successfully");
          toast.success('Course updated successfully');
          navigate(`/admin/courses`);
        })
        .catch(error => console.error("Failed to update course", error));
    } else {
      axios.post(`${baseApiUrl}`, courseData)
        .then(() => {
          console.log("Course created successfully");
          toast.success('Course Created successfully');
          navigate(`/admin/courses`);

        })
        .catch(error => console.error("Failed to create course", error));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: '500px',
      margin: '0 auto'
    }}
  >
    <TextField
      label="Course Title"
      name="title"
      value={course.title}
      onChange={handleChange}
      required
      fullWidth
    />
    <TextField
      label="Description"
      name="description"
      value={course.description}
      onChange={handleChange}
      required
      multiline
      rows={7}
      fullWidth
    />
    <TextField
      label="Instructor Name"
      name="instructorName"
      value={course.instructorName}
      onChange={handleChange}
      required
      fullWidth
    />
    <TextField
      label="Sub-Category Name"
      name="subCategoryName"
      value={course.subCategoryName}
      onChange={handleChange}
      required
      fullWidth
    />
    <TextField
      label="Image URL"
      name="image"
      value={course.image}
      onChange={handleChange}
      required
      fullWidth
    />
    <Button variant="contained" color="primary" type="submit">
      {id ? 'Update Course' : 'Create Course'}
    </Button>
  </Box>
  );
};

export default CourseForm;
