import { Link } from 'react-router-dom';

function HomeButton(){
    
    const butStyle={
        backgroundColor:'transparent',
        height:'30px',
        width:'70px',
        padding:'5px',
        border: 'none', 
        cursor: 'pointer',
        color:'white',
        marginLeft:'10px',
        marginRight:'10px',
        
    }

    const home="Home"
    return <Link to="/Accueil"><button style={butStyle}>
       {home}
    </button></Link>
}

export default HomeButton;
