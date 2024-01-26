import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  position: relative;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 70%;
  position: relative;
`;

const ProfilePhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePhoto = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 0;
`;

const ProfileTitle = styled.h3`
  margin: 10px 0;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  cursor: pointer;
`;

const UserProfile = ({ location }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    langue: '',
    specialite: '',
    Numero_de_telephone: '',
    Adresse: '',
    image: '',
  });

  useEffect(() => {
    if (location?.state?.avocatData) {
      const avocatData = location.state.avocatData;
      setUser({
        username: avocatData.username || '',
        email: avocatData.email || '',
        langue: avocatData.langue || '',
        specialite: avocatData.specialite || '',
        Numero_de_telephone: avocatData.Numero_de_telephone || '',
        Adresse: avocatData.Adresse || '',
        image: avocatData.image || '',
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prevUser) => ({
        ...prevUser,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/update-avocat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Profil mis à jour avec succès!');
        navigate('/LawyerPage/', { state: { avocatData: user } }); // Passer les données mises à jour
      } else {
        console.error('Erreur lors de la mise à jour du profil :', responseData.error);
      }
    } catch (error) {
      console.error('Erreur lors de la requête au backend :', error);
    }
  };

  return (
    <ProfileContainer>
      <FormContainer onSubmit={handleSubmit}>
        <BackButton onClick={() => navigate('/LawyerPage/')}>Back</BackButton>
        <ProfilePhotoContainer>
          <ProfilePhoto src={user.image} alt="Profile" />
          <ProfileTitle>Profile Avocat</ProfileTitle>
        </ProfilePhotoContainer>

        <FormRow>
          <Label>Name:</Label>
          <Input type="text" name="name" value={user.username} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Email:</Label>
          <Input type="email" name="email" value={user.email} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Langue:</Label>
          <Input type="text" name="langue" value={user.langue} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Specialty:</Label>
          <Input type="text" name="specialite" value={user.specialite} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Phone Number:</Label>
          <Input type="tel" name="Numero_de_telephone" value={user.Numero_de_telephone} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Address:</Label>
          <Input type="text" name="Adresse" value={user.Adresse} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Profile Photo:</Label>
          <Input type="file" accept="image/*" onChange={handlePhotoChange} />
        </FormRow>

        <Button type="submit">Update Profile</Button>
      </FormContainer>
    </ProfileContainer>
  );
};

export default UserProfile;