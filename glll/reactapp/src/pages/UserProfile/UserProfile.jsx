
import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  position: relative; /* Ajout de la position relative pour positionner le bouton Back */
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
  position: relative; /* Ajout de la position relative pour positionner le bouton Back */
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

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    experience: '5 years',
    specialty: 'Family Law',
    phoneNumber: '+1234567890',
    address: '123 Main St, City',
    photo: 'https://example.com/default-profile.jpg',
  });

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
        photo: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User updated:', user);
    // Ajouter la logique pour mettre à jour côté serveur si nécessaire
  };

  return (
    <ProfileContainer>
      <FormContainer onSubmit={handleSubmit}>
        <BackButton onClick={() => console.log("Back clicked")}>Back</BackButton>
        <ProfilePhotoContainer>
          <ProfilePhoto src={user.photo} alt="Profile" />
          <ProfileTitle>Profile Avocat</ProfileTitle>
        </ProfilePhotoContainer>

        <FormRow>
          <Label>Name:</Label>
          <Input type="text" name="name" value={user.name} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Email:</Label>
          <Input type="email" name="email" value={user.email} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Experience:</Label>
          <Input type="text" name="experience" value={user.experience} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Specialty:</Label>
          <Input type="text" name="specialty" value={user.specialty} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Phone Number:</Label>
          <Input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
        </FormRow>

        <FormRow>
          <Label>Address:</Label>
          <Input type="text" name="address" value={user.address} onChange={handleChange} />
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
