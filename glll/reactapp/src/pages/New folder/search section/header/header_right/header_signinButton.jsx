import { Link } from 'react-router-dom';

function SigninButton(){
    
    const butStyle={
        backgroundColor:'transparent',
        height:'30px',
        width:'60px',
        padding:'5px',
        marginRight:'15px',
        marginLeft:'15px',
        border: '2px solid white',
        borderRadius: '20px',
        cursor: 'pointer',
        color:'white',

        
    }

    const login="Sign up"
    return <Link to="/form"><button style={butStyle}>
       {login}
    </button></Link>
}

export default SigninButton;
