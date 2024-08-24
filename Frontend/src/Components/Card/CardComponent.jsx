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



const truncate = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 'calc(3 * 1.22em)',
    lineHeight: '1.2em',
  };

const CardComponent = ({ instPic, instName, subheader, media, courseTitle, content, actions }) => {



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
                    <CardContent sx={{ cursor: "pointer", height: "110px" }}>
                        <Typography color="primary" sx={{ fontWeight: "900" }}>
                            {courseTitle}
                        </Typography>
                        <Typography variant="body2" color="grey" sx={truncate}>
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
                     
                    </CardActions>
                )}
             
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