import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ClientComments from "./ClientComments";
import Header from "../search section/header/header";
import logo from './images/Ellipse.png';

const hStyle = {
  color: 'white',
  fontWeight: 'bold',
  marginTop: '100px',
};

const divStyle = {
  width: '100%',
  backgroundColor: '#FDECEC',
  borderRadius: '10px',
  paddingBottom: '30px',
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

function LawyerPageClient() {
  const { pk, clientId } = useParams();
  const [lawyerData, setLawyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/lawyers/${pk}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch lawyer data');
        }
        return response.json();
      })
      .then(data => {
        setLawyerData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching lawyer data:', error);
        setError(error);
        setLoading(false);
      });
  }, [pk]);

  if (loading) {
    return <p>Loading lawyer data...</p>;
  }

  if (error) {
    return <p>Error loading lawyer data: {error.message}</p>;
  }

  console.log("Lawyer Data:", lawyerData);

  return (
    <div style={divStyle}>
      <>
        <h1 style={hStyle}>Welcome Back!</h1>
        <img src={lawyerData.image} alt="profile_image" style={imgStyle} />

        <div style={{ textAlign: 'left', margin: '50px' }}>
          <p style={infoItemStyle}>{`Your ID number: ${lawyerData.avocat_id}`}</p>
          <p style={infoItemStyle}>{`Your first name: ${lawyerData.username}`}</p>
          <p style={infoItemStyle}>{`Your Langue: ${lawyerData.langue}`}</p>
          <p style={infoItemStyle}>{`Your specialty: ${lawyerData.specialite}`}</p>
          <p style={infoItemStyle}>{`Your Email address: ${lawyerData.email}`}</p>
          <p style={infoItemStyle}>{`Your city: ${lawyerData.Adresse}`}</p>
          <Header image={logo} />
        </div>

        {/* Use Link instead of link */}
        <Link to={`/appointment/id_client=${encodeURIComponent(clientId)}/id_avocat=${encodeURIComponent(lawyerData.avocat_id)}/`}>
          <button>Take an appointment</button>
        </Link>

        {/* Pass necessary information as props to ClientComments */}
        <ClientComments clientId={clientId} avocatId={lawyerData.avocat_id} />
      </>
    </div>
  );
}

export default LawyerPageClient;