import { Card } from 'antd';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../analysis/cards.css';
import React from 'react';

const IncomeBased = () => {
  // Hardcoded sample data
  const sampleData = {
    salary: 250,
    business: 150,
    investments: 100,
    other: 50
  };

  const categories = ['Salary', 'Business', 'Investments', 'Other'];
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
      text: 'Income Wise Data',
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

export default IncomeBased;
