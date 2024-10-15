import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const EChartPathEditor: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const options = {
        tooltip: {
            trigger: 'item',
            formatter: function (p: any) {
                console.log(p)
                    return `${p.name}: ${p.value} ${p.percent*2}%`;
                }
        },
        legend: {
            orient: 'vertical',
            left: 10,
        },
        series: [
            {  
                startAngle: 180,
                endAngle: 360, 
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1, name: 'data-a'},
                    {value: 1, name: 'data-b'},
                    {value: 3, name: 'data-c'},
                    {value: 5, name: 'data-d'},
                    {
                        value: 10,
                        name: null,
                        itemStyle:{opacity:0},
                        tooltip:{show:false } 
                    }
                ]
            }
      ],
    };

    chart.setOption(options);

    const updateCoordinates = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      setCoordinates({ x: offsetX, y: offsetY });
    };

    chartRef.current!.addEventListener('mousemove', updateCoordinates);

    return () => {
      chart.dispose();
      chartRef.current!.removeEventListener('mousemove', updateCoordinates);
    };
  }, []);

  return (
    <div>
      <h2>ECharts Path Editor</h2>
      <div>
        <p>Current Coordinates: X: {coordinates.x}, Y: {coordinates.y}</p>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '400px', border: '1px solid black' }} />
    </div>
  );
};

export default EChartPathEditor;
