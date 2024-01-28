import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from './table';

const Admin = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        // Make a GET request to your Django backend API
        const response = await fetch('http://localhost:8000/lawyers/');
        if (response.ok) {
          const data = await response.json();
          setLawyers(data);
        } else {
          console.error('Failed to fetch lawyers');
        }
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  const handleLogout = () => {
    console.log('logging out...');
    // Implement your logout logic here
  };

  const divStyle = {
    overflow: 'auto',
    margin: '0px',
    padding: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#9B7262',
    minHeight: '100vh',
  };

  return (
    <div style={divStyle}>
      <Link to="/Accueil"><button
        style={{
          marginRight: '0px',
          position: 'absolute',
          top: '0',
          right: '0',
          margin: '10px',
          width: '100px',
          height: '30px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
      >
        Log out
      </button></Link>

      <h1 style={{ color: 'white' }}>Hello admin</h1>
      <h3 style={{ color: 'white' }}>List of lawyers:</h3>
      <Table data={lawyers} />
    </div>
  );
};

export default Admin;
