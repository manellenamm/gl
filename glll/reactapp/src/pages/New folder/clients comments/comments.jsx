
function Comments(props){

    const divStyle={
        width:'33.33%',
        textAlign:'left',
    }
    const imgStyle={
        height:'25px',
        width:'25px',
        borderRadius: '50%',
        objectFit: 'cover',
    }
    const hStyle={
        color:'black',
    }
    const pStyle={
        width:'100%'
    }

    return (
        <div style={divStyle}>       
            <div>
                <img style={imgStyle} src={props.image} alt='search_image'/>    
                <h3 style={hStyle}>{props.name} says:</h3>
            </div>

            <p style={pStyle}>{props.comment}</p>
        </div>
    )
}
export default Comments