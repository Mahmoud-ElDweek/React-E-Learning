import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

const CardComponent = ({ instPic, instName, subheader, media, courseTitle, content, actions }) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <>
            <Card sx={{ width: "100%" }}>
                {(instPic || instName || subheader) && (
                    <CardHeader sx={{ height: "80px" }}
                        avatar={instPic &&
                            <img src={instPic} alt="Avatar" style={{ borderRadius: "50%" }} />
                        }
                        title={instName || ''}
                    // subheader={subheader || ''}
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
                    <CardContent sx={{ cursor: "pointer", height: "80px" }}>
                        <Typography color="primary" sx={{ fontWeight: "900" }}>
                            {courseTitle}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            {content}
                        </Typography>
                    </CardContent>
                )}
                {actions && (
                    <CardActions disableSpacing sx={{ justifyContent: "space-evenly"}}>
                        {actions.map((action, index) => (
                            <IconButton  key={index} aria-label={action.label} onClick={action.handleFunction}>
                                {action.icon}
                            </IconButton>
                        ))}
                        {/* <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore> */}
                    </CardActions>
                )}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Additional content can go here.
                        </Typography>
                    </CardContent>
                </Collapse>
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
};

export default CardComponent;