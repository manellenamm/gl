import qna from './images/qna.png';
function QnaButton(){


    const divStyle={
        width:'25%',
        textAlign:'center',
    }

    const butStyle={
        backgroundColor:'#9B7262',
        border:'none'
    }

    const imgStyle={
        height:'100px',
        width:'100px',
        borderRadius: '50%',
        objectFit: 'cover',
    }

    const hStyle={
        color:'black',
    }

    return <div style={divStyle}>
        <button style={butStyle}>
            <img style={imgStyle} src={qna} alt='qna_image'/>
        </button>
        <h3 style={hStyle}>Q & A</h3>
    </div>
}
export default QnaButton