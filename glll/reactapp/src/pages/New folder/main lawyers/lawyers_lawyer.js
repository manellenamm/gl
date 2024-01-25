function LawyersLawyer(props){

    const divStyle={
        width:'33.33%',
        textAlign:'center',
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

    return (
        <div style={divStyle}>       
            <img style={imgStyle} src={props.image} alt='search_image'/>    
            <h3 style={hStyle}>{props.name}</h3>
            <p>{props.description}</p>
        </div>
    )
}
export default LawyersLawyer