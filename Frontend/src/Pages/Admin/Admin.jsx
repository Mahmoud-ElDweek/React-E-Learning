import { Box, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'
import './admin.css'

const Admin = () => {
  const theme = useTheme();
  const translate = useSelector((state) => state.Localization.translation);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          <Grid xs={12} sm={4} md={3} lg={2} >
            <div style={{ padding: "32px 0"}} className='Aside-container'>
              <ul className='Aside' style={{listStyle: "none" , margin : "0",padding: "0"}}>
              <li>
                <NavLink to="dashboard" style={{ textDecoration: 'none', color: theme.palette.background.contentText }}>{translate.dashboard}</NavLink>
              </li>
              <li>
                <NavLink to="courses" style={{ textDecoration: 'none', color: theme.palette.background.contentText }}>{translate.adminCourses}</NavLink>
              </li>
              <li>
                <NavLink to="users" style={{ textDecoration: 'none', color: theme.palette.background.contentText }}>{translate.adminUsers}</NavLink>
              </li>
              <li>
                <NavLink to="instructors" style={{ textDecoration: 'none', color: theme.palette.background.contentText }}>{translate.adminInstructors}</NavLink>
              </li>
              </ul>
            </div>
          </Grid>
          <Grid xs={12} sm={8} md={9} lg={10} sx={{padding: "32px 24px"}}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Admin