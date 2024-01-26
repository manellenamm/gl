import LoginButton from './header_loginButton';
import SigninButton from './header_signinButton';
import AboutusButton from './header_aboutus';
import LawyersButton from './header_lawyers';
import HomeButton from './header_home';

function HeaderRight(){

    const divStyle={
        position: 'fixed',
        top: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'row-reverse',
        margin: '5px',

    }
    
    return <div style={divStyle}>
        <LoginButton/>
        <SigninButton/>
        <LawyersButton/>
        <AboutusButton/>
        <HomeButton/>
        
        </div>
}
export default HeaderRight