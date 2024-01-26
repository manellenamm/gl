function AboutusButton(){
    
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

    const aboutus="About us"
    return <button style={butStyle}>
       {aboutus}
    </button>
}

export default AboutusButton;
