import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LawyersLawyer({ clientId }) {
    console.log("Client ID in LawyersLawyer:", clientId);

    const navigate = useNavigate();
    const [lawyers, setLawyers] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/lawyers/');
                const data = await response.json();
                setLawyers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setDataFetched(true);
            }
        };

        // Fetch lawyers only if clientId is defined and not already fetched
        if (clientId  && !dataFetched) {
            fetchLawyers();
        }
    }, [clientId, dataFetched]);

    const handleRedirect = (lawyerId) => {
        navigate(`/LawyerPageClient/${lawyerId}/${clientId}/`);
    };


    return (
        <div>
            {lawyers.map(lawyer => (
                <div key={lawyer.avocat_id} style={{ marginBottom: '20px', width: '20%' }} onClick={() => handleRedirect(lawyer.avocat_id)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3>{lawyer.username}</h3>
                        <img
                            src={lawyer.image ? lawyer.image.toString() : ''}
                            alt={`Image de ${lawyer.username}`}
                            style={{ width: '50px', height: '50px', borderRadius: '50px' }}
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