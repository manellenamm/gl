import LogoutButton from './header_logoutButton';
import HomeButton from './header_home';
import ManageRdvButton from './header_manageRdv';

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
        <LogoutButton/>
        <ManageRdvButton/>
        <HomeButton/>
        
        </div>
}
export default HeaderRight