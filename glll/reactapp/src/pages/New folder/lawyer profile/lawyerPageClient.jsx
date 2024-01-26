import Header from "../search section/header/header"
import LawyerProfile from "./lawyerProfile"
import logo from './images/Ellipse.png'
import ClientComments from "./ClientComments"

function LawyerPageClient(){

    const divStyle={
        overflow:'auto',
        margin:'0px',
        padding:'20px',
        boxSizing: 'border-box',
        backgroundColor:'#9B7262',
        minHeight: '100vh', 
    }

    const hStyle={
        color:'white',
        fontWeight: 'bold',
        marginTop:'100px',
    }

    return (
        <div style={divStyle}>
            <Header image={logo}/>
            <h1 style={hStyle}>Welcome Back!</h1>
            <LawyerProfile image={logo}/>
            <ClientComments />
        </div>
    )
}

export default LawyerPageClient