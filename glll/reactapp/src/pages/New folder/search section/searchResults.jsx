
function SearchResults(props){


  const imgStyle={
      height:'30px',
      width:'30px',
      padding:'5px',
      marginLeft:'1.5%',
  }

  return <div>
      <img style={imgStyle} src={props.image} alt='profile_image'/>
      <h5>{props.name}</h5>

  </div>
}

export default SearchResults