

  import React, { useEffect, useRef } from 'react';
  import Chart from 'chart.js/auto';
  
  const LineChart = ({ pricing, change }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      const myChartRef = chartRef.current.getContext("2d");
  
      chartInstance.current = new Chart(myChartRef, {
        type: "line",
        data: {
          labels: Array.from({ length: pricing.length }, (_, i) => i + 1),
          datasets: [
            {
              label: "",
              data: pricing,
              backgroundColor: "#007bff33",
              
              borderColor: (change>=0? 'green':'red'),
              tension: 0.5, 
              pointRadius: 0, 
              pointHoverRadius: 0,
            },
          ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Hide legend
                },
            },
          scales: {
            x: {
              display: false, // Hide x-axis labels
            },
            y: {
              display: false, // Hide y-axis labels
            }
          }
        }
      });
  
      // Cleanup function to destroy the chart when the component unmounts
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [change]);
  
    return (
      <canvas ref={chartRef} width={100} height={50}/>
    );
  };
  
  export default LineChart;
  