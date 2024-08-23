import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/material/Unstable_Grid2';






const Dashboard = () => {
  const A = 50;
  const data = [
    { id: 0, value: A, label: `A ${A}%` },
    { id: 1, value: 15, label: `B ${A}%` },
    { id: 2, value: 20, label: `C ${A}%` },
    { id: 3, value: 20, label: `D ${A}%` },
  ];

  return (
    <>
      <Grid container>
        <Grid xs={12} md={12} mdOffset={2} lg={7} lgOffset={0}>
          asdasd
        </Grid>
        <Grid xs={12} md={8} mdOffset={2} lg={5} lgOffset={0}>
          <PieChart sx={{cursor: "pointer"}}
            series={[
              {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={250}
          />
        </Grid>
      </Grid>

    </>
  )
}

export default Dashboard