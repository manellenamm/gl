function QnaButton(){
    
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

    const qna="Q&A"
    return <button style={butStyle}>
       {qna}
    </button>
}

export default QnaButton;
