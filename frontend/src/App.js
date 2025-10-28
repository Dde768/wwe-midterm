import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [wrestlers, setWrestlers] = useState([]);
  const API_URL = 'http://192.168.56.1:5000/api/wrestlers';

  useEffect(() => {
    fetchWrestlers();
  }, []);

  const fetchWrestlers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWrestlers(data);
    } catch (error) {
      console.error('Error fetching wrestlers:', error);
    }
  };

  // 2. CREATE: Add a new wrestler
  const handleAddWrestler = async () => {
    // Use prompt for a simple form
    const name = prompt('Enter name:');
    if (!name) return;
    const brand = prompt('Enter brand (Raw/SmackDown):');
    const description = prompt('Enter description:');
    const image_url = prompt('Enter image URL:');

    const newWrestler = { name, brand, description, image_url };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWrestler),
      });
      const data = await response.json();
      // Add the new wrestler to the state to update UI
      setWrestlers([...wrestlers, data]);
    } catch (error) {
      console.error('Error adding wrestler:', error);
    }
  };

  // 3. UPDATE: Edit an existing wrestler
  const handleEditWrestler = async (wrestler) => {
    const name = prompt('Enter new name:', wrestler.name);
    if (!name) return;
    const brand = prompt('Enter new brand:', wrestler.brand);
    const description = prompt('Enter new description:', wrestler.description);
    const image_url = prompt('Enter new image URL:', wrestler.image_url);

    const updatedWrestler = { name, brand, description, image_url };

    try {
      await fetch(`${API_URL}/${wrestler.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWrestler),
      });
      // Fetch all wrestlers again to show the update
      fetchWrestlers();
    } catch (error) {
      console.error('Error editing wrestler:', error);
    }
  };

  // 4. DELETE: Remove a wrestler
  const handleDeleteWrestler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this wrestler?')) {
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      // Remove the wrestler from the state to update UI
      setWrestlers(wrestlers.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error deleting wrestler:', error);
    }
  };

  // --- Render the UI ---
  return (
    <div className="App">
      <NavBar />
      <Hero />

      <button className="add-wrestler-btn" onClick={handleAddWrestler}>
        + Add New Wrestler
      </button>

      <WrestlerGrid 
        wrestlers={wrestlers} 
        onEdit={handleEditWrestler} 
        onDelete={handleDeleteWrestler} 
      />
    </div>
  );
}

// --- UI Components ---

const NavBar = () => (
  <nav className="navbar">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/WWE_Logo.svg/1024px-WWE_Logo.svg.png" alt="WWE Logo" className="wwe-logo" />
    <div className="nav-links">
      <a href="#home">Home</a>
      <a href="#superstars" className="active">Superstars</a>
      <a href="#shows">Shows</a>
      <a href="#news">News</a>
      <a href="#shop">Shop</a>
    </div>
  </nav>
);

const Hero = () => (
  <div className="hero">
    <div className="hero-text">
      <span>Welcome to the Universe</span>
      <h1>UNLEASH THE BEAST</h1>
      <p>Experience the electrifying action, drama, and unforgettable moments of World Wrestling Entertainment.</p>
      <button className="explore-btn">Explore Shows</button>
    </div>
    <div className="hero-image">
      <img src="/images/ronda.jpg" alt="Ronda Rousey" /> 
      {/* Using a placeholder for Ronda, update with a real one! */}
    </div>
  </div>
);

const WrestlerGrid = ({ wrestlers, onEdit, onDelete }) => (
  <div className="wrestler-grid">
    {wrestlers.map(wrestler => (
      <WrestlerCard 
        key={wrestler.id} 
        wrestler={wrestler} 
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);

const WrestlerCard = ({ wrestler, onEdit, onDelete }) => {
  const brandColors = {
    Raw: '#e10a0a',
    SmackDown: '#003366',
    NXT: '#ffc400'
  };

  return (
    <div className="wrestler-card" style={{ borderBottomColor: brandColors[wrestler.brand] || '#333' }}>
      <img src={wrestler.image_url || 'https://i.imgur.com/default-placeholder.png'} alt={wrestler.name} />
      <div className="card-content">
        <h3>{wrestler.name}</h3>
        <span>{wrestler.brand}</span>
        <p>{wrestler.description}</p>
        <div className="card-actions">
          <button className="edit-btn" onClick={() => onEdit(wrestler)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(wrestler.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default App;