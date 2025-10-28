import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [wrestlers, setWrestlers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This IP (192.168.56.1) must match your VM's IP
    fetch('http://192.168.56.1:5000/api/wrestlers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setWrestlers(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>WWE Women Wrestlers</h1>
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        <ul style={{ textAlign: 'left', listStyle: 'none' }}>
          {wrestlers.map(w => (
            <li key={w.id}>
              <h3>{w.name}</h3>
              <p>Brand: {w.brand}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;