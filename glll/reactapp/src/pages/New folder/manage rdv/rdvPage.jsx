
import React from 'react';
import RdvTable from './rdvtable';
import Header from './header/header';
import logo192 from './images/Ellipse.png';

const RdvPage = () => {

  const rows = [
    {
      id: 1,
      firstName: 'John',
      familyName: 'Doe',
      specialty: 'family attorney',
      email: 'john@somemail.com',
      city: 'delhi',
    },
    
  ];

  
  

  const divStyle={
    overflow:'auto',
    margin:'0px',
    padding:'10px',
    boxSizing: 'border-box',
    backgroundColor:'#9B7262',
    minHeight: '100vh',

  }

  return (
    <div style={divStyle}>

      <Header image={logo192}/>



      <h1 style={{color:'white', marginTop:'100px'}}>Manage your appointments</h1>
      <h3 style={{color:'white'}}>Here are all of the appointments currently scheduled:</h3>
      <RdvTable data={rows} />
    </div>
  );
};

export default RdvPage;