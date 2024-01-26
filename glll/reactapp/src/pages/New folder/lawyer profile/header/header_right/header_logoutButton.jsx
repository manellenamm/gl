function LogoutButton(){
    
    const butStyle={
        padding:'5px',
        fontWeight: 'bold', 
        margin:'10px',
        marginTop: '0px',
        width:'100px',
        height:'30px',
        borderRadius:'10px',
        border:'none',
        cursor: 'pointer',
        
    }

    const handleLogout= ()=>{
        console.log('loging out...')
    }


    const login="Log out"
    return <button style={butStyle} onClick={handleLogout}>
       {login}
    </button>
}

export default LogoutButton;
