function LawyersButton(){
    
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

    const lawyers="Lawyers"
    return <Link to="/Login"><button style={butStyle}>
       {lawyers}
    </button></Link>
}

export default LawyersButton;
