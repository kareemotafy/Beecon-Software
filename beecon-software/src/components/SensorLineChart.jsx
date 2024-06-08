import React, { useState, useEffect } from "react";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../util/firebase";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const now = Timestamp.now();
const lastMonth = new Date();
const yesterday = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
yesterday.setDate(yesterday.getDate() - 1);
const lastMonthTimestamp = Timestamp.fromDate(lastMonth);

const SensorLineChart = ({
  sensorLabel,
  sensorVariable,
  sensorPostFix,
  lineBackgroundColor = "#FFB800",
  lineBorderColor,
  dynamicTickStepSize = false,
}) => {
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [day, setDay] = useState(yesterday);
  const [filter, setFilter] = useState("day");

  const fetchData = async () => {
    const tempRef = collection(db, "sensors", sensorVariable, "data");

    const q = query(
      tempRef,
      where(
        "timestamp",
        ">=",
        filter === "month" ? lastMonthTimestamp : Timestamp.fromDate(day)
      ),
      where("timestamp", "<=", now)
    );

    const xData = [];
    const yData = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      xData.push(data.timestamp.toDate());
      yData.push(data.value);
    });

    const xValues = [];
    const yValues = [];

    if (filter === "month") {
      for (let i = 0; i < xData.length; i += 24) {
        const dayData = yData.slice(i, i + 24);
        const sum = dayData.reduce((acc, val) => acc + val, 0);
        const average = sum / dayData.length;
        const date = xData[i].toISOString().split("T")[0]; // Use the first timestamp in the chunk
        xValues.push(date);
        yValues.push(average);
      }
    }

    setXAxisData(filter === "month" ? xValues : xData);
    setYAxisData(filter === "month" ? yValues : yData);
  };

  useEffect(() => {
    fetchData();
  }, [filter, day]);

  const data = {
    labels: xAxisData,
    datasets: [
      {
        label: sensorLabel,
        data: yAxisData,
        backgroundColor: lineBackgroundColor,
        borderColor: lineBorderColor,
        tension: 0.4,
      },
    ],
  };

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: sensorLabel,
          color: "white",
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += `${context.parsed.y} ${sensorPostFix}`;
              }
              return label;
            },
          },
        },
        legend: {
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white",
          },
          type: "time",
          time: {
            unit: filter === "day" ? "hour" : "day",
          },
          grid: {
            color: "gray",
          },
        },
        y: {
          beginAtZero: true,
          min: yAxisData.length > 0 ? Math.min(...yAxisData) - 1 : 0,
          max: yAxisData.length > 0 ? Math.max(...yAxisData) + 1 : 1,
          grid: {
            color: "gray",
          },
          ticks: {
            color: "white",
            stepSize: dynamicTickStepSize
              ? Math.ceil(
                  (Math.max(...yAxisData) - Math.min(...yAxisData)) / 10
                )
              : 1,
          },
        },
      },
    }),
    [xAxisData, yAxisData]
  );

  return (
    <Grid container>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={(_, filter) => {
          setFilter(filter);
        }}
        style={{ marginBottom: 10 }}
        aria-label="Filter"
      >
        <ToggleButton value="month">Month</ToggleButton>
        <ToggleButton value="day">day</ToggleButton>
        {filter === "day" && (
          <DatePicker
            label="Peek at"
            value={day}
            onChange={(newValue) => setDay(newValue)}
          />
        )}
      </ToggleButtonGroup>

      <Grid container justifyContent="center">
        <Line data={data} options={options} style={{ minHeight: 320 }} />
      </Grid>
    </Grid>
  );
};
export default SensorLineChart;
