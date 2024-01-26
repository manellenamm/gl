import React from "react";
import { useNavigate } from "react-router-dom";

function EditProfileButton() {
    const navigate = useNavigate();

    const butStyle = {
        backgroundColor: 'transparent',
        height: '30px',
        width: '150px',
        padding: '5px',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        marginLeft: '10px',
        marginRight: '10px',
    }

    const Edit = "Edit Profile"

    const HandlePageChange = () => {
        // Rediriger vers la page UserProfile
        navigate('/UserProfile/');
    }

    return (
        <button style={butStyle} onClick={HandlePageChange}>
            {Edit}
        </button>
    );
}

export default EditProfileButton;