import { Link } from 'react-router-dom';

function ProfileIcon({image}){

    const imgStyle={
        height:'30px',
        width:'30px',
        padding:'5px',
        marginLeft:'1.5%',
    }
    return <Link to="/Loginadmin"><img style={imgStyle} src={image} alt='profile_image'/></Link>
}

export default ProfileIcon;