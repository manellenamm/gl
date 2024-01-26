import ProfileIcon from './header_profileIcon';
import HeaderRight from './header_right/header_right';


function Header({image}){

    const divStyle={
        margin: '0px',
        width: '100%',
        height: '40px',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius:'10px',
        shadowColor:'black',
        boxShadow: '0 4px 2px -1px rgba(0,0,0,0.4)',
        position: 'fixed',
        top: '0',
        right: '0',
        
 }
    return <div style={divStyle}>
        <ProfileIcon image={image}/>
        <HeaderRight/>
        </div>
}
export default Header