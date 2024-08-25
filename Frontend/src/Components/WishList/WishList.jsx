import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CardMedia, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Confirm from '../Confirm/Confirm';

const WishList = () => {
    const favoriteCount = useSelector((state)=> state.wishListSlice.count);

    const [courses, setCourses] = useState([]);
    const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl)
    console.log(courses);

    useEffect(() => {
        const fetchCourses = async () => {
            const storedIds = JSON.parse(localStorage.getItem('wishlist')) || [];
            try {
                const coursePromises = storedIds.map((id) =>
                    axios.get(`${baseApiUrl}/${id}`)
                );
                const courseResponses = await Promise.all(coursePromises);
                const fetchedCourses = courseResponses.map(res => res.data);
                setCourses(fetchedCourses);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses();
    }, [baseApiUrl]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const handleOpenDialog = (courseID) => {
        setCourseToDelete(courseID);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCourseToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (courseToDelete !== null) {
            const coursesWished = JSON.parse(localStorage.getItem('wishlist')) || [];
            const updatedWishList = coursesWished.filter(x => x !== courseToDelete);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
            setCourses(courses.filter(course => course.id !== courseToDelete));
            setCourseToDelete(null);
        }
        handleCloseDialog();
    };
    return (
        <>
            <h1 className="text-center py-3 text-white" style={{ backgroundColor: "#343a40" }}>Your Wishing List</h1>
            <div className="mycontainer my-5">
                <div className="row">
                    {courses && courses.map((x, index) => (
                        <div
                            className="col-12 my-1"
                            key={x.id}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#343a40' : '#454d55',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <div className="row">
                                <div className="col-lg-4 col-md-5">
                                    <CardMedia
                                        component="img"
                                        sx={{ width: "80%", margin: "0 auto" }}
                                        image={x.image}
                                        alt="Course media"
                                    />
                                </div>
                                <div className="col-lg-8 col-md-7 align-content-center">
                                    <ListItem sx={{ padding: '30px 0' }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ width: 80, height: 80 }}
                                                alt={x.visible_instructors[0].display_name} src={x.visible_instructors[0].image_100x100} />
                                        </ListItemAvatar>
                                        <ListItemText sx={{ textAlign: "center" }}
                                            primary={x.visible_instructors[0].display_name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="white"
                                                    >
                                                        {x.title}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemIcon onClick={() => handleOpenDialog(x.id)}>
                                            <DeleteIcon color="error" sx={{ cursor: "pointer" , ":hover": {
                                                scale: 1.3
                                            }}} />
                                        </ListItemIcon>
                                    </ListItem>
                                </div>
                            </div>
                            <Divider variant="inset" sx={{ backgroundColor: "#555", height: ".1rem" }} />
                        </div>
                    ))}
                </div>
            </div>
            <Confirm
                open={dialogOpen}
                handleClose={handleCloseDialog}
                handleConfirm={handleConfirmDelete}
                courseName={courses.find(course => course.id === courseToDelete)?.title || "Unknown Course"}
            />
        </>
    );
};

export default WishList;
