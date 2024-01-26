import bookmark from './images/bookmark.png';
function BookButton(){


    const divStyle={
        width:'33.33%',
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
            <img style={imgStyle} src={bookmark} alt='book_image'/>
        </button>
        <h3 style={hStyle}>Book a lawyer</h3>
    </div>
}
export default BookButton