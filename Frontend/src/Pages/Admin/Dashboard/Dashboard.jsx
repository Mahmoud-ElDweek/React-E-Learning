import React from 'react';
import Grid from '@mui/material/Grid';
import { PieChart, Pie, Cell, Tooltip, Legend, AreaChart, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const pieData = [
    { name: 'A', value: 50 },
    { name: 'B', value: 15 },
    { name: 'C', value: 20 },
    { name: 'D', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  const lineData = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]
  return (
    <>
    <div className='content-holder'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={5}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae itaque exercitationem explicabo necessitatibus delectus ad, harum in neque esse ipsum consequatur pariatur minus consectetur eligendi incidunt, sed reprehenderit. Nihil, nobis.</p>
        </Grid>
        <Grid item xs={12} md={12} lg={7} >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={lineData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>


        <Grid item xs={12} md={12} lg={7} >
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum mollitia eaque, suscipit blanditiis quos vero recusandae aspernatur atque itaque quasi culpa a quae praesentium adipisci quo iste iure quibusdam quia?</p>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
      </div>
    </>
  )
}

export default Dashboard;
