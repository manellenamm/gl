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
    return <button style={butStyle}>
       {home}
    </button>
}

export default HomeButton;
