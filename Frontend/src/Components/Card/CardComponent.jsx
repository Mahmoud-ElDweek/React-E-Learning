import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';



const truncate = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 'calc(3 * 1.22em)',
    lineHeight: '1.2em',
};

const CardComponent = ({ instPic, instName, subheader, media, courseTitle, content, actions, CourseID }) => {



    return (
        <>
            <Card sx={{ width: "100%" }}>
                {(instPic || instName || subheader) && (
                    <CardHeader sx={{ height: "80px" }}
                        avatar={instPic &&
                            <img src={instPic} alt="Avatar" style={{ borderRadius: "50%", marginLeft: "16px" }} />
                        }
                        title={instName || ''}
                    />
                )}
                {media && (
                    <CardMedia
                        component="img"
                        height="194"
                        image={media}
                        alt="Card media"
                    />
                )}
                {(content || courseTitle) && (
                    <CardContent sx={{ cursor: "pointer", height: "120px" }}>
                        <Typography color="primary" sx={{ fontWeight: "900" ,lineHeight: 1.2, padding: "8px 0" }}>
                            <Link to={`/courses/${CourseID}`} style={{ textDecoration: "none" }}>
                                {courseTitle}
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="grey" sx={truncate}>
                            {content}
                        </Typography>
                    </CardContent>
                )}
                {actions && (
                    <CardActions disableSpacing sx={{ justifyContent: "space-evenly" }}>
                        {actions.map((action, index) => (
                            <IconButton key={index} aria-label={action.label} onClick={action.handleFunction}>
                                {action.icon}
                            </IconButton>
                        ))}
                    </CardActions>
                )}
                {CourseID &&
                    <Box mt={1}>
                        <Link to={`/courses/${CourseID}`} style={{ textDecoration: "none" }}>
                            <Button variant="contained" fullWidth>Learn More</Button>
                        </Link>
                    </Box>
                }

            </Card>
        </>
    )
}
CardComponent.propTypes = {
    instPic: PropTypes.string,
    instName: PropTypes.string,
    subheader: PropTypes.string,
    media: PropTypes.string,
    courseTitle: PropTypes.string,
    content: PropTypes.string,
    actions: PropTypes.array,
    iconColor: PropTypes.string,
    CourseID: PropTypes.string,
};

export default CardComponent;