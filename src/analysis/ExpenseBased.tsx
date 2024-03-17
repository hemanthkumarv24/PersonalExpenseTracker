import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import ReactApexChart from 'react-apexcharts';
import '../analysis/cards.css';
import axios from 'axios'; // Import axios for API requests

const ExpenseBased = () => {
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 400);
  const [fontSize, setFontSize] = useState('12px');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
      setFontSize(window.innerWidth < 350 ? '3px' : '12px');
    };
    window.addEventListener('resize', handleResize);

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/totalexpensesbycategory');
        const data = response.data.totalExpensesByCategory;
        console.log(response);
        const categories = data.map(item => item.categoryName);
        console.log(categories);
        const series = data.map(item => item.totalExpense);
        console.log(series);
        setChartData({ categories, series });
        console.log(chartData.series)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = {
    title: {
      text: 'Expense Wise Data',
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 700,
        color: '#07273a',
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return isSmallScreen ? `${total}` : `${total}`;
              },
            },
          },
        },
      },
    },
    labels: chartData.categories,
    legend: {
      position: 'left',
      offsetY: 50,
      fontSize,
      labels: {
        colors: '#333',
        useSeriesColors: false,
      },
    },
  };

  return (
    <Card className="chart" style={{ width: '100%', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#fff', marginBottom: '5px' }}>
     <ReactApexChart
  key={chartData.series.length} // Add this line
  type="donut"
  options={options}
  series={chartData.series}
/>
    </Card>
  );
};

export default ExpenseBased;