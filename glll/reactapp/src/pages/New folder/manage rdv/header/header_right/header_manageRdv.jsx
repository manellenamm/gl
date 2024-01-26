function ManageRdvButton(){
    
    const butStyle={
        backgroundColor:'transparent',
        height:'30px',
        width:'150px',
        padding:'5px',
        border: 'none', 
        cursor: 'pointer',
        color:'white',
        marginLeft:'10px',
        marginRight:'10px',
        
    }

    const manageRdv="Manage appointments"

    const HandlePageChange= () =>{

    }
    
    return <button style={butStyle} onClick={HandlePageChange}>
       {manageRdv}
    </button>
}

export default ManageRdvButton;
