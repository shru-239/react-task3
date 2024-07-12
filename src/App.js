import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Strawberry' },
    { id: 6, name: 'Fig' },
    { id: 7, name: 'Grape' },
    { id: 8, name: 'Guava' }
  ];

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Filter Feature</h1>
      </header>
      <section className="section">
        <h2>Search Filter</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for a fruit"
        />
        <ul>
          {filteredFruits.map(fruit => (
            <li key={fruit.id}>{fruit.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
