import React from "react";
import { useLocation } from "react-router-dom";

function LawyerProfile() {
  const location = useLocation();
  const { state } = location;
  const avocatData = state && state.avocatData;
  console.log('avocatData:', avocatData);
  if (!avocatData) {
    return <div>Loading...</div>;
  }

  const divStyle = {
    width: '100%',
    backgroundColor: '#FDECEC',
    borderRadius: '10px',
    paddingBottom: '30px'
  };

  const imgStyle = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '250px',
    height: '250px',
    borderRadius: '10px',
    border: '2px solid #000',
    marginTop: '50px',
  };

  const infoItemStyle = {
    border: '2px solid #000',
    borderRadius: '10px',
    boxSizing: 'border-box',
    padding: '5px 10px',
    marginBottom: '10px',
  };

  return (
    <div style={divStyle}>
       {avocatData.image ? (
      <img
        src={`http://127.0.0.1:8000${avocatData.image}`}
        alt="profile_image"
        style={imgStyle}
        onError={(e) => console.error("Erreur de chargement de l'image", e)}
      />
    ) : null}


      <div style={{ textAlign: 'left', margin: '50px' }}>
        <p style={infoItemStyle}>Your ID number: {avocatData.avocat_id}</p>
        <p style={infoItemStyle}>Your first name : {avocatData.username}</p>
        <p style={infoItemStyle}>Your Langue: {avocatData.langue}</p>
        <p style={infoItemStyle}>Your specialty: {avocatData.specialite} </p>
        <p style={infoItemStyle}>Your Email address: {avocatData.email} </p>
        <p style={infoItemStyle}>Your city: {avocatData.Adresse}</p>
      </div>
    </div>
  );
}

export default LawyerProfile;