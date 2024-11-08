  import React from 'react';
  import LineBarChart from './lineBarChart';

  const mockData = [
    { name: 'Product A', value: 120 },
    { name: 'Product B', value: 200 },
    { name: 'Product C', value: 150 },
    { name: 'Product D', value: 80 },
    { name: 'Product E', value: 70 },
  ];

  const App: React.FC = () => (
    <div>
      <h1>Simple Bar Chart</h1>
      <LineBarChart data={mockData} title="Sales Data" />
    </div>
  );

  export default App;
