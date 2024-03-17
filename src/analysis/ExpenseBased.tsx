import { Card } from 'antd';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../analysis/cards.css';
import React from 'react';

const ExpenseBased = () => {
  // Hardcoded sample data for expenses
  
  const sampleData = {
    food: 200,
    transportation: 100,
    entertainment: 150,
    utilities: 80,
    DiningOut:80,
    Entertainment:80,
    Socializing:80,
    Travel:80,
    Fitness:80,
    Electronics:80,
    HomeDecor:80,
    Events:80,
    Entertainment:80,
    Education:80,
    HomeAppliances:70


  };















  const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities'];
  const series = categories.map(category => sampleData[category.toLowerCase()]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 400);
  const [fontSize, setFontSize] = useState<'12px' | '3px'>('12px');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
      setFontSize(window.innerWidth < 350 ? '3px' : '12px');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = {
    title: {
      text: 'Expense Wise Data',
      align: 'left',
      style: {
        fontSize: "14px",
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
    labels: categories,
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
        type="donut"
        options={options}
        series={series}
      />
    </Card>
  );
};

export default ExpenseBased;
