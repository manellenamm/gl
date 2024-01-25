function EditProfileButton(){
    
    const butStyle={
        backgroundColor:'transparent',
        height:'30px',
        width:'150px',
        padding:'5px',
        border: 'none', 
        cursor: 'pointer',
        color:'white',
        marginLeft:'10px',
        marginRight:'10px',
        
    }

    const Edit="Edit Profile"

    const HandlePageChange= () =>{

    }
    
    return <button style={butStyle} onClick={HandlePageChange}>
       {Edit}
    </button>
}

export default EditProfileButton;
