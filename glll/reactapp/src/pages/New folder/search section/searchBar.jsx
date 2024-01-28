import React, { useState } from 'react';
import StarRating from './starRating';

const SearchBar = () => {

  //objects

  const initialSearchResultsStructure = [
    { image: '', 
    name: 'Lawyer 1', 
    notation: 3.1,
    description: 'this is a description describing the very describable lawyer at hand in order to better describe the hardly describable functionalities of this positively decribable feature',

    },
    
    { image: '', 
    name: 'Lawyer 2', 
    notation: 4.9,
    description: 'this is a description describing the very describable lawyer at hand in order to better describe the hardly describable functionalities of this positively decribable feature',

    },

    { image: '', 
    name: 'dwayn "the rock" jhonson', 
    notation: 1.7,
    description: 'this is a description describing the very describable lawyer at hand in order to better describe the hardly describable functionalities of this positively decribable feature',

    }
  ];




    //Styles


    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: '999',
      textAlign: 'left',
    };


    const resultsModalStyle={
      position: 'fixed',
      top: '0%',
      bottom: '0%',
      right:'25%',
      left:'25%',
      padding: '20px',
      backgroundColor:'white',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: '1000',
      overflowY: 'auto',
    }


    const detailsModalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: '999',
      textAlign: 'left',
    };


    const resultsStyle={
      border: '3px solid #000',
      display:'flex',
      alignItems:'center',
      borderRadius:'10px',
    }


    const backdropStyle1 = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '998',
    };

    const backdropStyle2 = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '999',
    };


    const backdropStyle3 = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '997',
    };


    const divStyle={
      display: 'flex',
      alignItems: 'center',
      margin: '10%',
      marginTop: '12%',

    }

    const inputStyle={
      width: '45%',
      height: '40px',
      borderRadius: '15px',
      border: 'none',
    }

    const butStyle={
      height: '40px',
      width: '6%',
      marginLeft: '3%',
      borderRadius: '15px',
      border: 'none',
      backgroundColor: 'white',
    }



    //Search and filters logic

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedLanguage, setSelctedLanguage] = useState('arabic');
    const [selectedCity, setSelctedCity] = useState('Bejaia');
    const [selectedSpecialty, setSelectedSpecialty] = useState('divorce')
    const [rating, setRating] = useState(3);
    
    
    const emailAddress = 'example@example.com';


    //const handleSearch = (e) => {

      //console.log(`Searching for: ${searchTerm}`);
      //setSearchTerm('');
      //const results=initialSearchResultsStructure
      //setSearchResults(results)
      //setShowModal(false);
      //setShowResultsModal(true);
    //};

    // const handleSearch = async () => {
    //   try {
    //     // Build the API endpoint with query parameters
    //     const apiUrl = `http://127.0.0.1:8000/api/recherche/?specialite=${selectedSpecialty}&langue=${selectedLanguage}&Adresse=${selectedCity}`;
        
    //     // Make the API request
    //     const response = await fetch(apiUrl);
        
    //     // Check if the request was successful (status code 2xx)
    //     if (response.ok) {
    //       const data = await response.json();
    //       setSearchResults(data);
    //       setShowModal(false);
    //       setShowResultsModal(true);
    //     } else {
    //       // Handle error cases here
    //       console.error('Error fetching data:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };
 

    const handleSearch = async () => {
      try{
        const respons = await fetch(`http://127.0.0.1:8000/api/recherche/?specialite=${selectedSpecialty}&langue=${selectedLanguage}&Adresse=${selectedCity}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},

        })
        if (respons.ok)
        {const results = await respons.json()
        setSearchResults(results)}
        else {
          console.error('Error fetching data:', respons.statusText);
        }
      }catch(error){
        console.error('Error:', error);
      }

    };
 


    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };


    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleFilterClick = () => {

      setShowModal(!showModal);
    };

    // const handleResultClick = (index) => {
    //   setSelectedResult(searchResults[index]);
    //   setShowResultsModal(false)
    //   setShowDetailsModal(true);
    // };

    const handleResultClick = async (index) => {
      setSelectedResult(searchResults[index]);
      setShowResultsModal(false)
      setShowDetailsModal(true);

      try{
        const respons = await fetch(`http://127.0.0.1:8000/api/avocat-rating/${selectedResult.email}/`,{
          method:'Post',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (respons.ok){
          const rating = await respons.json()
          setRating(rating)
        }else{
          console.error('Error fetching data:', respons.statusText);
        }
      }catch(error){
        console.error('Error:', error)

      }

    };


    const handleSelectedLanguage=(event) =>{
      setSelctedLanguage(event.target.value);
    }

    const handleSelectedCity=(event) =>{
      setSelctedCity(event.target.value);
    }

    const handleSelectedSpecialty=(event) =>{
      setSelectedSpecialty(event.target.value);
    }
    
    

    // const handleSelectRating = (e) => {
    //   const value = parseInt(e.target.value, 10);
    //   if (!isNaN(value) && value >= 1 && value <= 5) {
    //     setSelectedRating(value);
    //   }
    // };


    // const handleSubmitRating = (e) => {
    //   e.preventDefault();
    //   console.log('Submitted value:', selectedRating);
    //   // You can perform any action with the stored value here
    // };
  

    return (
      <div style={divStyle}>
        <input
          type="text"
          placeholder="Search for a lawyer!"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          style={inputStyle}
        />
        <button
        onClick={handleFilterClick}
        style={butStyle}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#dbdbdb'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = 'white'; }}
        >
          Filters
        </button>

        {showModal && (
        <div className="modal" >
          <div style={backdropStyle1} onClick={() => setShowModal(false)}></div>
          <div style={modalStyle}>
           
            <h4 style={{color:'black'}}>Filter options:</h4>
            
            <label style={{color:'black'}}>
                Language:
                <select name="language" value={selectedLanguage} onChange={handleSelectedLanguage}>
                  <option value="english">English</option>
                  <option value="french">French</option>
                  <option value="arabic">Arabic</option>
                </select>
            </label>

            <label style={{color:'black'}}>
                city:
                <select name="city" menuPlacement="bottom" value={selectedCity} onChange={handleSelectedCity}>

                  <option value="Adrar">Adrar </option>
                  <option value="Chlef">Chlef</option>
                  <option value="Laghouat">Laghouat</option>
                  <option value="Oum El Bouaghi">Oum El Bouaghi</option>
                  <option value="Batna">Batna</option>
                  <option value="Béjaïa">Béjaïa</option>
                  <option value="Biskra">Biskra</option>
                  <option value="Béchar ">Béchar </option>
                  <option value="Blida">Blida</option>
                  <option value="Bouira">Bouira</option>
                  <option value="Tamanrasset">Tamanrasset </option>
                  <option value="Tébessa">Tébessa</option>
                  <option value="Tlemcen">Tlemcen</option>
                  <option value="Tiaret">Tiaret</option>
                  <option value="Tizi Ouzou">Tizi Ouzou</option>
                  <option value="Alger">Alger</option>
                  <option value="Djelfa">Djelfa</option>
                  <option value="Jijel">Jijel</option>
                  <option value="Sétif">Sétif</option>
                  <option value="Saïda">Saïda</option>
                  <option value="Skikda">Skikda</option>
                  <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
                  <option value="Annaba">Annaba</option>
                  <option value="Guelma">Guelma</option>
                  <option value="Constantine">Constantine</option>
                  <option value="Médéa">Médéa</option>
                  <option value="Mostaganem">Mostaganem</option>
                  <option value="M'Sila">M'Sila</option>
                  <option value="Mascara">Mascara</option>
                  <option value="Ouargla">Ouargla</option>
                  <option value="Oran">Oran</option>
                  <option value="El Bayadh">El Bayadh</option>
                  <option value="Illizi">Illizi </option>
                  <option value="Bordj Bou Arreridj">Bordj Bou Arreridj</option>
                  <option value="Boumerdès">Boumerdès</option>
                  <option value="El Tarf">El Tarf</option>
                  <option value="Tindouf">Tindouf</option>
                  <option value="Tissemsilt">Tissemsilt</option>
                  <option value="El Oued">El Oued </option>
                  <option value="Khenchela">Khenchela</option>
                  <option value="Souk Ahras">Souk Ahras</option>
                  <option value="Tipaza">Tipaza</option>
                  <option value="Mila">Mila</option>
                  <option value="Aïn Defla">Aïn Defla</option>
                  <option value="Naâma">Naâma</option>
                  <option value="Aïn Témouchent">Aïn Témouchent</option>
                  <option value="Ghardaïa">Ghardaïa</option>
                  <option value="Relizane">Relizane</option>
                  <option value="Timimoun">Timimoun</option>
                  <option value="Bordj Badji Mokhtar">Bordj Badji Mokhtar</option>
                  <option value="Ouled Djellal">Ouled Djellal </option>
                  <option value="Béni Abbès">Béni Abbès</option>
                  <option value="In Salah">In Salah</option>
                  <option value="In Guezzam">In Guezzam</option>
                  <option value="Touggourt">Touggourt</option>
                  <option value="Djanet">Djanet</option>
                  <option value="El M'Ghair">El M'Ghair</option>
                  <option value="El Meniaa">El Meniaa</option>  
                </select>
            </label>

            <label style={{color:'black'}}>
                Specialty:
                <select name="Specialty" value={selectedSpecialty} onChange={handleSelectedSpecialty}>

                </select>
            </label>
            
          </div>
        </div>
      )}


      {showResultsModal && (
        <>
        <div style={backdropStyle2} onClick={() => setShowResultsModal(false)}></div>
        
        <div className="results-modal" style={resultsModalStyle}>
          <button style={{position:'absolute', top:'10px', right:'10px'}} onClick={() => setShowResultsModal(false)}>Close</button>
          <h4>Search Results:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {searchResults.map((result, index) => (
              <li key={index} style={resultsStyle} onClick={() => handleResultClick(index)}>
                <img src={result.image} alt="Lawyer" style={{ width: '30px', height: '30px', marginRight: '20px',marginLeft:'20px', display:'inline-block', border: '2px solid #000', borderRadius:'50%', }} />
                <p style={{display:'inline-block', marginRight: '20px',marginLeft:'20px',}}>{result.name}</p>

                {/*<p style={{display:'inline-block', marginRight: '20px',marginLeft:'20px',}}>{result.notation}</p>*/}

              </li>
            ))}
          </ul>
        </div>
        </>
      )}

      {showDetailsModal && selectedResult && (
        <>
          <div style={backdropStyle3} onClick={() => setShowDetailsModal(false)}></div>

            <div className="details-modal" style={detailsModalStyle}>
              <h3>Details:</h3>
              <button style={{position:'absolute', top:'10px', right:'10px'}} onClick={() => setShowDetailsModal(false)}>Close</button>
              <div style={{textAlign:'center'}}>
                <img src={selectedResult.image} alt="Profile_image" style={{ width: '100px', height: '100px',border: '2px solid #000', borderRadius:'10px', }} />
                <h3>{selectedResult.username}</h3>
                <StarRating notation={rating} />
                <p>{selectedResult.email}</p>
                <p>{selectedResult.specialite}</p>
                <p>{selectedResult.Numero_de_telephone}</p>
                
              </div>
              <link to={`/LawyerPageClient?email=${encodeURIComponent(selectedResult.email)}`}><button style={{position:'absolute', bottom:'10px', left:'10px'}} onClick={() => {setShowDetailsModal(false);}}>Consult lawyer's page</button></link>
              <link to={`/appointment?email=${encodeURIComponent(selectedResult.email)}`}><button style={{position:'absolute', bottom:'10px', right:'10px'}} onClick={() => {setShowDetailsModal(false);}}>Take an appointment</button></link>
            </div>
        </>
      )}

      </div>
    );
};

export default SearchBar;