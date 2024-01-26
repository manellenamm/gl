function LoginButton(){
    
    const butStyle={
        backgroundColor:'white',
        height:'30px',
        width:'60px',
        padding:'5px',
        marginRight:'1.5%',
        marginLeft:'15px',
        border: 'none', 
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold', 
        
    }

    const login="Login"
    return <button style={butStyle}>
       {login}
    </button>
}

export default LoginButton;
