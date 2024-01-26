
function ProfileIcon({image}){

    const imgStyle={
        height:'30px',
        width:'30px',
        padding:'5px',
        marginLeft:'1.5%',
    }
    return <img style={imgStyle} src={image} alt='profile_image'/>
}

export default ProfileIcon;