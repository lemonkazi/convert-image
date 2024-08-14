import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const data = {
  labels,
  datasets: [
    {
      label: "screen 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "screen 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const generateRandomData = () => {
  const jsonData = [];

  for (let i = 1; i <= 2; i++) {
    const screenName = `screen ${Math.floor(Math.random() * 2) + 1}`;
    const country = `Country ${Math.floor(Math.random() * 2) + 1}`;
    const visitorCount = Array.from({ length: 12 }, () =>
      faker.datatype.number({ min: -1000, max: 1000 }),
    );
    const createdDate = faker.date
      .between("2022-01-01", "2023-12-31")
      .toISOString();

    jsonData.push({
      screen_name: `screen ${i}`,
      country: `Country ${i}`,
      visitor_count: visitorCount,
      created_date: createdDate,
    });
    //console.log(jsonData);
  }

  return jsonData;
};

export const jsonData = generateRandomData();

console.log(JSON.stringify(jsonData, null, 2));


const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState({
    filter: "weekly",
    country: "",
    screenName: "",
  });
  
  
  let filteredDataWeekly =[
      {
        "screen_name": "home",
        "country": "bd",
        "visitor_count": 2,
        "week_start": "2024-01-04",
        "week_end": "2024-01-10"
      },
      {
        "screen_name": "home",
        "country": "bd",
        "visitor_count": 1,
        "week_start": "2024-01-08",
        "week_end": "2024-01-14"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2023-11-20",
        "week_end": "2023-11-26"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2023-11-27",
        "week_end": "2023-12-03"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2023-12-04",
        "week_end": "2023-12-10"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2023-12-11",
        "week_end": "2023-12-17"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2023-12-18",
        "week_end": "2023-12-24"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2023-12-25",
        "week_end": "2023-12-31"
      },
      {
        "screen_name": "all",
        "country": "all",
        "visitor_count": 0,
        "week_start": "2024-01-01",
        "week_end": "2024-01-07"
      }
    ];
  filteredDataWeekly = filteredDataWeekly.sort((a, b) => {
    const dateA = new Date(a.week_start);
    const dateB = new Date(b.week_start);
    return dateA - dateB;
  });
  let filteredDataMonthly =[
    {
      "screen_name": "home",
      "country": "bd",
      "visitor_count": 3,
      "month": "January"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "February"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "March"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "April"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "May"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "June"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "July"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "August"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "September"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "October"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "November"
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "month": "December"
    }
  ];
  filteredDataMonthly = filteredDataMonthly.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA - dateB;
  });
  let filteredDataYearly =[
    {
      "screen_name": "home",
      "country": "bd",
      "visitor_count": 3,
      "year": 2024
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2023
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2022
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2021
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2020
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2019
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2018
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2017
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2016
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2015
    },
    {
      "screen_name": "all",
      "country": "all",
      "visitor_count": 0,
      "year": 2014
    }
  ];
  filteredDataYearly = filteredDataYearly.sort((a, b) => {
    const dateA = new Date(a.year);
    const dateB = new Date(b.year);
    return dateA - dateB;
  });


  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

const generateData = (filter) => {
      let labels = [];
      let datasets = [];
      if (filter.filter === "weekly") {
        labels = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        
        // Extract unique screen names and countries from the dataset
        const uniqueScreens = Array.from(new Set(filteredDataWeekly.map((entry) => entry.screen_name)));
        const uniqueCountries = Array.from(new Set(filteredDataWeekly.map((entry) => entry.country)));
        
        // Generate datasets for each screen and country combination
        datasets = uniqueScreens.flatMap((screen) =>
          uniqueCountries.map((country) => {
            const dataPoints = filteredDataWeekly
              .filter((entry) => entry.screen_name === screen && entry.country === country)
              .map((entry) => ({
                x: entry.week_start, // Assuming 'week_start' is a valid date string
                y: entry.visitor_count,
              }));
      
            if (dataPoints.length > 0) {
              return {
                label: `${screen}`,
                data: dataPoints,
                country: `${country}`,
                borderColor: getRandomColor(),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              };
            }
          })
        );
       
        

        // Extract unique weeks as labels
        labels = Array.from(new Set(filteredDataWeekly.map((entry) => entry.week_start)));
      } else if (filter.filter === "monthly") {
        labels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        
        // Extract unique screen names and countries from the dataset
        const uniqueScreens = Array.from(new Set(filteredDataMonthly.map((entry) => entry.screen_name)));
        const uniqueCountries = Array.from(new Set(filteredDataMonthly.map((entry) => entry.country)));

        // Generate datasets for each screen and country combination
        datasets = uniqueScreens.flatMap((screen) =>
          uniqueCountries.map((country) => {
            const dataPoints = filteredDataMonthly
              .filter((entry) => entry.screen_name === screen && entry.country === country)
              .map((entry) => ({
                x: entry.month, // Assuming 'week_start' is a valid date string
                y: entry.visitor_count,
              }));

            if (dataPoints.length > 0) {
              return {
                label: `${screen}`,
                data: dataPoints,
                country: `${country}`,
                borderColor: getRandomColor(),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              };
            }
          })
        );

        // Extract unique weeks as labels
        labels = Array.from(new Set(filteredDataMonthly.map((entry) => entry.month)));
        
      } else if (filter.filter === "yearly") {
        // Extract unique screen names and countries from the dataset
        const uniqueScreens = Array.from(new Set(filteredDataYearly.map((entry) => entry.screen_name)));
        const uniqueCountries = Array.from(new Set(filteredDataYearly.map((entry) => entry.country)));

        // Generate datasets for each screen and country combination
        datasets = uniqueScreens.flatMap((screen) =>
          uniqueCountries.map((country) => {
            const dataPoints = filteredDataYearly
              .filter((entry) => entry.screen_name === screen && entry.country === country)
              .map((entry) => ({
                x: entry.year, // Assuming 'week_start' is a valid date string
                y: entry.visitor_count,
              }));

              if (dataPoints.length > 0) {
                return {
                  label: `${screen}`,
                  data: dataPoints,
                  country: `${country}`,
                  borderColor: getRandomColor(),
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                };
              }
          })
        );
        // Extract unique weeks as labels
        labels = Array.from(new Set(filteredDataYearly.map((entry) => entry.year)));
      
      }
      
      
      // Remove null and undefined entries from datasets
      datasets = datasets.filter((dataset) => dataset !== null && dataset !== undefined);
      // Filter data based on country and screen name
      const filteredData = datasets.filter((entry) => {
        return (
          (filter.country === "" || entry.country === filter.country) &&
          (filter.screenName === "" ||
            entry.screen_name === filter.screenName)
        );
      });

      setChartData({ labels, datasets:filteredData, mainData:datasets });
    };
  useEffect(() => {
    generateData(filter);
  }, [filter]);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };
  
  const uniqueCountriesOptions = chartData ? Array.from(new Set(chartData.mainData.map((entry) => entry.country))) : [];
  const uniqueScreenNamesOptions = chartData ? Array.from(new Set(chartData.mainData.map((entry) => entry.label))) : [];
  
  console.log("============");
  console.log(chartData);
  return (
    <div>
      <div>
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          name="filter"
          value={filter.filter}
          onChange={handleFilterChange}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={filter.country}
          onChange={handleFilterChange}
        >
          <option value="">select</option>
          {uniqueCountriesOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {/* <div>
        <label htmlFor="screenName">Screen Name:</label>
        <select
          id="screenName"
          name="screenName"
          value={filter.screenName}
          onChange={handleFilterChange}
        >
          <option value="">select</option>
          {uniqueScreenNamesOptions.map((screenName) => (
            <option key={screenName} value={screenName}>
              {screenName}
            </option>
          ))}
        </select>
      </div> */}
      <div>
      {chartData && (
        <Line options={options} data={chartData} />
      )}
      </div>
    </div>
  );
};

export default ChartComponent;
