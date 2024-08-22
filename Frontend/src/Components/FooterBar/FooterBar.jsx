import { useTheme } from '@mui/material/styles';
import React from 'react'

const FooterBar = () => {
  const theme = useTheme();

  return (
    <>
    <div style={{ backgroundColor: theme.palette.background.bg, color: theme.palette.background.navText ,textAlign: "center", padding: "8px", borderTop: "1px solid #999" }}>
      Footer
    </div>
    </>
  )
}

export default FooterBar