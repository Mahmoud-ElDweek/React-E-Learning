import React, { useEffect, useState } from 'react';
import CardComponent from '../../../Components/Card/CardComponent';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { Box, Button, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CourseList from '../../../Components/Search/Search';
import { stripHtmlTags } from '../../../util/HtmlCleaner';
import Confirm from '../../../Components/Confirm/Confirm';

const CoursesManagement = () => {
    const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);
    const [courses, setCourses] = useState([]);
    const [displayedCourses, setDisplayedCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

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

    const navigate = useNavigate();

    const addNewCourse = () => {
        navigate(`/admin/courses/addcourse`);
    };

    const editCourse = (id) => {
        navigate(`/admin/courses/edit/${id}`);
    };

    const handleOpenDialog = (courseID) => {
        setCourseToDelete(courseID);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCourseToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (courseToDelete !== null) {
            try {
                await axios.delete(`${baseApiUrl}/${courseToDelete}`);
                setCourses((prevCourses) => prevCourses.filter(course => course.id !== courseToDelete));
                setTotalPages(Math.ceil((courses.length - 1) / pageSize)); // Recalculate totalPages
            } catch (err) {
                console.error("Error deleting course:", err);
            } finally {
                setCourseToDelete(null);
                handleCloseDialog();
            }
        }
    };

    return (
        <>
            <Button sx={{ fontSize: "20px", fontWeight: "900", border: "1px solid #1976d2" }} onClick={addNewCourse}>
                Add New Course
            </Button>
            <CourseList />

            <Grid container spacing={2}>
                {displayedCourses.map((course) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={course.id}>
                        <CardComponent
                            instPic={course.visible_instructors[0].image_50x50}
                            instName={course.visible_instructors[0].display_name}
                            media={course.image}
                            courseTitle={course.title}
                            content={stripHtmlTags(course.description)}
                            actions={[
                                { label: 'Edit', icon: <EditIcon color='info' />, handleFunction: () => editCourse(course.id) },
                                { label: 'Delete', icon: <DeleteIcon color='error' />, handleFunction: () => handleOpenDialog(course.id) },
                            ]}
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

            <Confirm
                open={dialogOpen}
                handleClose={handleCloseDialog}
                handleConfirm={handleConfirmDelete}
                courseName={courses.find(course => course.id === courseToDelete)?.title || "Unknown Course"}
            />
        </>
    );
};

export default CoursesManagement;
