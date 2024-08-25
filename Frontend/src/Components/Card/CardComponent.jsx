import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

const CardComponent = ({ instPic, instName, subheader, media, courseTitle, content, actions, price }) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <>
            <Card sx={{ width: "100%" }}>
            {(instPic || instName || subheader) && (
                <CardHeader sx={{height:"80px"}}
                    avatar={instPic &&
                        <img src={instPic} alt="Avatar" style={{borderRadius: "50%"}} />
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
            {(content || courseTitle || price) && (
                <CardContent sx={{cursor: "pointer", height: "80px"}}>
                    <Typography variant="body2" color="primary">
                        <h4>{courseTitle}</h4>
                        <p>{content}</p>
                        {price && <p>Price: ${price}</p>}
                    </Typography>
                </CardContent>
            )}
            {actions && (
                <CardActions disableSpacing>
                    {actions.map((action, index) => (
                        <IconButton key={index} aria-label={action.label}>
                            {action.icon}
                        </IconButton>
                    ))}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
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
    actions: PropTypes.node,
    price: PropTypes.number,
};

export default CardComponent;