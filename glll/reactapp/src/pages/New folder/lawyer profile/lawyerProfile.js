
function LawyerProfile({image}){

    const divStyle={
        width:'100%',
        backgroundColor:'#FDECEC',
        borderRadius:'10px',
        paddingBottom:'30px'
    }

    const imgStyle={
        position:'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width:'250px',
        height:'250px',
        borderRadius:'10px',
        border: '2px solid #000',
        marginTop:'50px',

    }

    const infoItemStyle = {
        border: '2px solid #000',
        borderRadius: '10px',
        boxSizing: 'border-box',
        padding: '5px 10px',
        marginBottom: '10px',

      };

    return (
        <div style={divStyle}>
            <img src={image} alt="profile_image" style={imgStyle}/>

            <div style={{textAlign:'left', margin:'50px'}}>
                <p style={infoItemStyle}>Your ID number:</p>
                <p style={infoItemStyle}>Your first name:</p>
                <p style={infoItemStyle}>Your last name:</p>
                <p style={infoItemStyle}>Your specialty:</p>
                <p style={infoItemStyle}>Your Email adress:</p>
                <p style={infoItemStyle}>Your city:</p>
            </div>
        </div>
    )
}


export default LawyerProfile