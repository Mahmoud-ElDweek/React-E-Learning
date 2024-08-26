import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Grid, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardComponent from './../Card/CardComponent';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
  

export default function Search() {
  const baseApiUrl = useSelector((state) => state.Localization.baseApiUrl);
  const [word, setWord] = useState("");
  const [courses, setCourses] = useState([]);
  const translate = useSelector((state) => state.Localization.translation);

  useEffect(() => {
    if (word.length > 0) {
      axios
        .get(`${baseApiUrl}?title_like=${word}`)
        .then((res) => setCourses(res.data))
        .catch((err) => console.error(err));
    } else {
      setCourses([]);
    }
  }, [word, baseApiUrl]);

  return (
    <Box sx={{ padding: "20px" }}>
      <TextField
        label={translate.search}
        value={word}
        onChange={(e) => {
          setWord(e.target.value);
          if (e.target.value.length === 0) {
            setCourses([]);
          }
        }}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "primary.main",
          },
          marginBottom: "30px",
        }}
      />
      <Grid container spacing={2}>
        {courses.filter((course) => {
          return word.toLowerCase() === '' ? course : course.title.toLowerCase().includes(word)
        }).map((course) => (
          <Grid item key={course.id} xs={12} sm={12} md={6} lg={4}>
            <CardComponent
              instPic={course.visible_instructors[0].image_50x50}
              instName={course.visible_instructors[0].display_name}

              media={course.image}
              courseTitle={course.title}
              // content   --> description
              actions={[
                { label: "add to favorites", icon: <FavoriteIcon /> },
                { label: "share", icon: <ShareIcon /> },
              ]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
