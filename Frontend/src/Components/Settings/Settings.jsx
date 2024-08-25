
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';

const Settings = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [originalEmail, setOriginalEmail] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
     
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => {
          setUser(response.data);
          setOriginalEmail(response.data.email); //save first email
        })
        .catch(error => {
          toast.error('Failed to fetch user data.');
          console.error("Failed to fetch user", error);
        });
    } else {
      // navigate('/login'); 
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userId) {
      try {
       // verify email in login
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        const currentUser = response.data;

        if (user.email !== originalEmail) {
        // verify new email founded in json or not
          const emailCheck = await axios.get('http://localhost:3001/users', {
            params: { email: user.email }
          });
          
          const emailExists = emailCheck.data.length > 0;

          if (emailExists) {
            toast.error('Email is already in use.');
            return;
          }
        }

// update date
        await axios.put(`http://localhost:3001/users/${userId}`, user);
        toast.success('User data updated successfully.');
      } catch (error) {
        toast.error('Failed to update user data.');
        console.error("Failed to update user", error);
      }
    }
  };


  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setSelectedCourse(JSON.parse(storedCourse));
    }
  }, []);

 

  return (
          <>
    <div className="container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
    {selectedCourse &&
    <Box>
    <Typography variant="h4">Selected Course</Typography>
    <Typography variant="h6">{selectedCourse.title}</Typography>
    <Typography variant="body1">{selectedCourse.description}</Typography>
    {/* Render more course details as needed */}
  </Box>
    }
</>  
);
};

export default Settings;
