import { Paper } from '@mui/material';
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Category 1', value: 400 },
  { name: 'Category 2', value: 300 },
  { name: 'Category 3', value: 300 },
  { name: 'Category 4', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart = () => {
  return (
    <Paper>
      <RechartsPieChart width={400} height={300}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </RechartsPieChart>
    </Paper>
  );
};

export default PieChart;
