import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function generateTimestampsForLastMonth() {
  const timestamps = [];
  const currentDate = new Date(); // Current date and time
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1); // Set to last month

  // Loop through each hour of the last month
  for (
    let date = lastMonth;
    date <= currentDate;
    date.setHours(date.getHours() + 1)
  ) {
    timestamps.push(date.getTime()); // Add timestamp to the array
  }

  return timestamps;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const xAxisData = generateTimestampsForLastMonth();

const yAxisData = Array.from({ length: xAxisData.length }, () =>
  generateRandomNumber(20, 34)
);

const Temperature = () => {
  const data = {
    labels: xAxisData,
    datasets: [
      {
        label: "Temperature °C",
        data: yAxisData,
        backgroundColor: "#FFB800",
        borderColor: "#1565C0",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Historical Hive Temperature",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        type: "time",
        time: {
          unit: "day",
        },
        grid: {
          color: "gray",
        },
      },
      y: {
        beginAtZero: true,
        min: 19,
        max: 35,
        grid: {
          color: "gray",
        },
        ticks: {
          color: "white",
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Grid container justifyContent="center">
      <Line data={data} options={options} style={{ minHeight: 450 }} />
    </Grid>
  );
};
export default Temperature;
