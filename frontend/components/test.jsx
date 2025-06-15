import React, { useState, useEffect } from 'react';

const Test = () => {
  const [data, setData] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    fetch('https://api.restful-api.dev/objects')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleToggleColor = (id) => {
    setColorMap((prev) => ({
      ...prev,
      [id]: prev[id] === 'green' ? 'white' : 'green'
    }));
  };

  return (
    <div>
      {data.length > 0 ? data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleToggleColor(item.id)}
          className='p-4 border rounded shadow mb-4 cursor-pointer transition-colors duration-300'
          style={{ backgroundColor: colorMap[item.id] || 'white' }}
        >
          <h3>{item.name}</h3>
          <p>{JSON.stringify(item.data)}</p>
        </div>
      )) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test;
