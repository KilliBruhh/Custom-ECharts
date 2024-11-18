  import React from 'react';
  import LineBarChart from './LineBarChart';

  const mockData = [
    { name: '2022', value1: 150, value2: 30, value3: 200 },
    { name: '2023', value1: 50, value2: 70, value3: 30 },
    { name: '2024', value1: 100, value2: 130, value3: 300 },
  ];

  const App: React.FC = () => (
    <div>
      <h1>Bar x Line Chart</h1>
      <LineBarChart data={mockData} title="Sales Data" />
    </div>
  );

  export default App;
