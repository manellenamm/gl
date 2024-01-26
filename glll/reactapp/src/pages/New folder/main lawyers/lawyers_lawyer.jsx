import React, { useState, useEffect } from 'react';

function LawyersLawyer() {
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/lawyers/')
            .then(response => response.json())
            .then(data => setLawyers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {lawyers.map(lawyer => (
                <div key={lawyer.avocat_id} style={{ marginBottom: '20px', width: '20%' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3>{lawyer.username}</h3>
                        <img
                            src={lawyer.image ? lawyer.image.toString() : ''}
                            alt={`Image de ${lawyer.username}`}
                            style={{ Width: '50px', height: '50px', borderRadius:'50px'}}
                        />
                        <div style={{ fontSize: '14px' }}>
                            <p>{`Spécialité: ${lawyer.specialite}`}</p>
                            <p>{`Langue: ${lawyer.langue}`}</p>
                            <p>{`Adresse: ${lawyer.Adresse}`}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LawyersLawyer;