import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CourseForm = () => {

  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);
  console.log(baseApiUrl);
  
  const { id } = useParams();
  const [course, setCourse] = useState({ title: '', description: '' }); // Adjust fields as necessary

  useEffect(() => {
    if (id) {
      // Fetch the course details if an ID is present
      axios.get(`${baseApiUrl}/${id}`)
        .then(response => setCourse(response.data))
        .catch(error => console.error("Failed to fetch course", error));
    }
  }, [id,baseApiUrl]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      // Update existing course
      axios.put(`${baseApiUrl}/${id}`, course)
        .then(response => {
          console.log("Course updated successfully");
          // Redirect or handle success
        })
        .catch(error => console.error("Failed to update course", error));
    } else {
      // Create a new course
      axios.post(`${baseApiUrl}`, course)
        .then(response => {
          console.log("Course created successfully");
          // Redirect or handle success
        })
        .catch(error => console.error("Failed to create course", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </label>
      <button type="submit">{id ? 'Update Course' : 'Create Course'}</button>
    </form>
  );
};

export default CourseForm;
