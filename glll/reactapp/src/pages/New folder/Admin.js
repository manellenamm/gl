
import React from 'react';
import Table from './table';

const Admin = () => {

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

  const handleLogout= ()=>{
    console.log('loging out...')
  }
  

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

     <button style={{ marginRight:'0px',
                      position: 'absolute',
                      top:'0',
                      right:'0',
                      margin:'10px',
                      width:'100px',
                      height:'30px',
                      borderRadius:'10px',
                      border:'none',
                      cursor: 'pointer',
                    }}
              onClick={handleLogout}>
     Log out</button>

      <h1 style={{color:'white'}}>Hello admin</h1>
      <h3 style={{color:'white'}}>Liste of lawyers:</h3>
      <Table data={rows} />
    </div>
  );
};

export default Admin;